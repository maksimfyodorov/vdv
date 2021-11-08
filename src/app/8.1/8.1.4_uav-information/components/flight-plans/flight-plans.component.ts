import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef, Host,
  OnDestroy, ViewChild,
} from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { FlightPlanService } from './services/flight-plan.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Plan } from './types/plan';
import { Period, PeriodsOverTheYears } from './types/period';
import { SelectionTreeService } from '../uav-node-folder/services/selection-tree.service';
import { catchError, distinctUntilChanged, filter, map, mergeMap, skip, tap } from 'rxjs/operators';
import { combineLatest, forkJoin, Observable, of, Subscription } from 'rxjs';
import { Task } from './types/tasks';
import { MapService } from './components/map/services/map.service';
import {
  TASKS_COMPONENTS_FOR_CREATE,
  TASKS_COMPONENTS_FOR_EDIT,
  TASKS_COMPONENTS_FOR_PLANNED,
  TASKS_COMPONENTS_FOR_VIEW,
} from './services/flight-plans-dialog.service';
import { saveAs } from 'file-saver-es';
import { LoaderService } from '@app/shared/components/loader/loader.service';
import { STATUS_INFO } from '../../modals/task-modal/components/plan-modal-tabs/plan-modal-track-points/plan-modal-track-points.component';
import { OlApiService } from '@app/shared/services/ol-api.service';
import { AuthService } from '@app/shared/services/auth.service';
import { Document } from '@app/shared/components/ospo/documents/attach-document-dialog/attach-document-dialog.types';
import { TaskMode, TaskModeGroup } from '../../modals/task-modal/types/task-modal';
import Polygon from 'ol/geom/Polygon';
import { ActivatedRoute, Router } from '@angular/router';
import { tapOnce } from '@app/8.1/8.1.4_uav-information/shared-functions';
import { TASK_STATUS_TEXT } from '@app/8.1/8.1.4_uav-information/consts';
import { SearchSideBarComponent } from '@app/8.1/8.1.4_uav-information/components/flight-plans/components/search-side-bar/search-side-bar.component';
import { PlanComponent } from '@app/8.1/8.1.4_uav-information/components/flight-plans/components/plan/plan.component';

@Component({
             selector: 'app-flight-plans',
             templateUrl: './flight-plans.component.html',
             styleUrls: ['./flight-plans.component.scss'],
             providers: [DialogService, FlightPlanService, LoaderService],
           })
export class FlightPlansComponent implements AfterViewInit, OnDestroy {
  public statusesTexts = TASK_STATUS_TEXT;
  public isFilterModeSelected = false;
  public tasks: Task[];
  public inputText: string;
  public selectedTask: Task;
  private totalOfTasks: number;
  private count = 0;
  private subscriptions: Subscription[] = [];
  private searchSideBar: SearchSideBarComponent;
  @ViewChild('plan') planComponent: PlanComponent;

  constructor(
    public authService: AuthService,
    public olService: OlApiService,
    public selectionTreeService: SelectionTreeService,
    public planService: FlightPlanService,
    @Host() public loader: LoaderService,
    private mapService: MapService,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  private static printTask(responseValue: any): void {
    saveAs(responseValue, 'Отчет полетного задания.odt');
  }

  public ngAfterViewInit(): void {
    this.checkSelectionTreeChanges();
    this.checkPeriodQueryParamChanges();
    this.checkYearQueryParamChanges();
    this.checkTaskChanges();
    this.changeDetectorRef.detectChanges();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private checkPeriodQueryParamChanges(): void {
    const route$ = combineLatest([this.route.params, this.route.queryParams]).pipe(
      map(params => ({param: params[0], queryParams: params[1]})),
      tapOnce(params => {
        if (params.queryParams.task) {
          const contentParams = {militaryUnitId: params.param.military_unit_id, period: params.queryParams.period, year: params.queryParams.year};
          this.getContent(contentParams);
        }
      }),
      tap(params => this.planComponent.periodForm.get('period').setValue(params.queryParams.period)),
      filter(param => !param.queryParams.task && param.queryParams.period),
      map(params => ({militaryUnitId: params.param.military_unit_id, period: params.queryParams.period, year: params.queryParams.year})),
      tap(params => this.getContent(params)),
    ).subscribe();

    this.subscriptions.push(route$);
  }

  private getContent(params): void {
    this.loader.startLoading(this.planService.getContentByPeriod(params.period)).pipe(
      mergeMap(res => {
        this.planComponent.planData = res;
        const taskParams = { page: this.count = 0, page_size: 10 };

        return this.loader.startLoading(forkJoin({
                                                   tasks: this.planService.getMilitaryUnitTasksByPlan(res.uuid, taskParams),
                                                   documents: this.planService.getPlanDocuments(this.planComponent.planData.uuid),
                                                 }));
      }),
      catchError(err => this.errorHandler(err)),
      filter(res => Boolean(res))).subscribe(res => {
      this.totalOfTasks = res.tasks.count;
      this.tasks = res.tasks.result;
      this.planComponent.documents = res.documents;
      this.selectTask();
    });
  }

  public changeMode(): void {
    this.isFilterModeSelected = !this.isFilterModeSelected;
  }

  public applyFilter(filterValue: any): void {
    this.isFilterModeSelected = false;
    this.tasks = [];

    !this.planComponent.planData ? this.getTasks(filterValue) : this.getFilteredTasks(filterValue);
  }

  public routeByTask(task: Task): void {
    this.router.navigate([], { relativeTo: this.route, queryParams: { task: task.uuid }, queryParamsHandling: 'merge', }).catch();

  }

  public openTaskModalByMode(mode: TaskModeGroup, uuid?: string): void {
    let actionResult;
    const actionMode = {
      create: () => this.planService.openTaskModalForCreate(mode, this.planComponent.planData.uuid, TASKS_COMPONENTS_FOR_CREATE),
      new: () => this.planService.openTaskModalWithTaskData(mode, uuid, TASKS_COMPONENTS_FOR_EDIT),
      planned: () => this.planService.openTaskModalWithTaskData(mode, uuid, TASKS_COMPONENTS_FOR_PLANNED),
      not_completed: () => this.planService.openTaskModalWithTaskData(mode, uuid, TASKS_COMPONENTS_FOR_VIEW),
      completed: () => this.planService.openTaskModalWithTaskData(mode, uuid, TASKS_COMPONENTS_FOR_VIEW),
      subordinates: () => this.planService.openTaskModalWithTaskData(mode, uuid, TASKS_COMPONENTS_FOR_VIEW),
    };

    if (mode.subordinate) {
      actionResult = actionMode.subordinates;
    } else {
      actionResult = actionMode[mode.mode];
    }

    actionResult?.().subscribe(res => {
      const action = {
        new: () => this.reformatTask(res.responseValue),
        create: () => this.createTask(res.responseValue),
        delete: () => this.deleteTask(res.taskUuid),
        completed: () => this.changeCompletedStatus(res.responseValue, res.actionType),
        not_completed: () => this.changeCompletedStatus(res.responseValue, res.actionType),
        print: () => FlightPlansComponent.printTask(res.responseValue),
      };

      action[res.actionType]?.();
    });
  }

  public getTasks(params: any): void {
    this.loader.startLoading(this.planService.getMilitaryUnitTasks(params))
        .subscribe(res => {
          this.planComponent.planData = null;
          this.totalOfTasks = res.count;
          this.tasks ? this.tasks.push(...res.result) : this.tasks = res.result;

          if (this.route.snapshot.queryParams.task) { this.selectTask(); }
        });
  }

  private errorHandler(err: any): Observable<null> {
    if (err.status === 404) {
      this.planComponent.planData = ({status: 'not_created'} as Plan);
      this.tasks = [];
    }

    return of(null);
  }

  private reformatTask(responseValue: Task): void {
    const taskIndex = this.tasks.findIndex(task => task.uuid === responseValue.uuid);
    this.tasks.splice(taskIndex, 1, responseValue);
  }

  private createTask(responseValue: Task): void {
    this.tasks.unshift(responseValue);
  }

  private deleteTask(uuid: string): void {
    const taskIndex = this.tasks.findIndex(task => task.uuid === uuid);
    this.tasks.splice(taskIndex, 1);
  }

  private changeCompletedStatus(responseValue: Task, status: TaskMode): void {
    const task = this.tasks.find(taskItem => taskItem.uuid === responseValue.uuid);
    task.status_name = status;
  }

  public filterTasks(searchText: string): void {
    const params = { general_search: searchText.trim(), page: this.count = 0, page_size: 10 };

    if (this.planComponent.planData) {
      this.getFilteredTasks(params);
    } else {
      this.tasks = [];
      this.getTasks({ year: this.planComponent.periodForm.value.year, ...params });
    }
  }

  private getFilteredTasks(params: any): void {
    this.loader.startLoading(this.planService.getFilteredTasks(this.planComponent.planData.uuid, params))
        .subscribe(res => {
          this.totalOfTasks = res.count;
          this.tasks = res.result;
        });
  }

  public clearText(): void {
    this.inputText = '';
    this.renderTasks();
  }

  private renderTasks(): void {
    this.totalOfTasks = 0;
    const params = { page: this.count = 0, page_size: 10 };
    if (this.planComponent.planData) {
      this.loader.startLoading(this.planService.getMilitaryUnitTasksByPlan(this.planComponent.planData.uuid, params))
          .subscribe(res => {
            this.totalOfTasks = res.count;
            this.tasks = res.result;
          });
    } else {
      this.tasks = [];
      this.getTasks({ year: this.planComponent.periodForm.value.year, ...params });
    }
  }

  public scroll(event: Event): void {
    const target = event.target as HTMLElement;
    const yOffset = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const limit = scrollHeight - target.offsetHeight - 1;

    if (yOffset > limit) {
      this.count++;
      const paginationParams = { page: this.count, page_size: 10 };
      const params = this.inputText ? { general_search: this.inputText, ...paginationParams } : paginationParams;

      if (this.totalOfTasks > this.tasks.length) {
        if (this.planComponent.planData) {
          this.loader.startLoading(this.planService.getMilitaryUnitTasksByPlan(this.planComponent.planData.uuid, params))
              .subscribe(res => this.tasks.push(...res.result));
        } else {
          this.getTasks({ year: this.planComponent.periodForm.value.year, ...params });
        }
      }
    }
  }

  public getPrintTrackPointTitle(status: string): string {
    return STATUS_INFO?.[status]?.text;
  }

  private setMapCenter(coordinates: Array<Array<number>>): void {
    const view = this.olService.map.getView();
    const polygon = new Polygon([coordinates]);
    if (coordinates.length) {
      view.fit(polygon);
    }
  }

  private getPointsCoordinates(task: Task): Array<Array<number>> {
    const pointKeys = ['coordinates_landing', 'coordinates_nsu_location', 'coordinates_start'];
    const coordinates = [];

    pointKeys.forEach(key => {
      if (task[key]?.x && task[key]?.y) {
        coordinates.push([task[key]?.x, task[key]?.y]);
      }
    });
    task.coordinates_track_points.forEach(point => {
      if (point?.x && point?.y) {
        coordinates.push([point?.x, point?.y]);
      }
    });

    return coordinates;
  }

  private checkSelectionTreeChanges(): void {
    const selectedId$ = this.selectionTreeService.selectionTreeSelectItemSubject.pipe(
      tap(id => this.planService.militaryUnitId = id.uuid),
      skip(1),
    ).subscribe(_ => {
      const currentId = this.route?.snapshot.params['military_unit_id'];
      const params = { year: this.planComponent.periodForm.value.year, page: 0, page_size: 10 };
      const newUrlWithoutParams = this.router.url.replace(currentId, this.planService.militaryUnitId.toString()).split('?')[0];
      const queryParams = {
        year: this.route?.snapshot.queryParams.year,
      };

      this.selectedTask = null;
      this.tasks = [];
      this.planComponent.planData = null;

      this.router.navigate([newUrlWithoutParams], { queryParams, replaceUrl: true }).then(() => {
        this.getTasks(params);
      });
    });

    this.subscriptions.push(selectedId$);
  }

  private checkTaskChanges(): void {
    this.route.queryParams.pipe(filter(param => param.task)).subscribe(_ => this.selectTask());
  }

  private selectTask(): void {
    const id = this.route.snapshot.queryParams.task;
    const selectedTask: Task = this.tasks?.find(task => task.uuid === id);

    if (selectedTask) {
      this.mapService.selectedTask.next(selectedTask);
      this.selectedTask = selectedTask;
      this.setMapCenter(this.getPointsCoordinates(selectedTask));
    }
  }

  private checkYearQueryParamChanges(): void {
    const yearChanges$ = this.route.queryParams.pipe(
      map(param => param.year),
      filter(year => year),
      distinctUntilChanged(),
    ).subscribe(_ => {
      const params = this.route.snapshot.queryParams;
      const taskParams = { year: params.year, page: 0, page_size: 10 };

      if (!params.hasOwnProperty('period')) {
        this.getTasks(taskParams);
      }
    });

    this.subscriptions.push(yearChanges$);
  }

  public onInput(event: Event): void {
    this.inputText = (event.target as HTMLInputElement).value;
  }

  public filterTemplateLoaded(event: {element: ElementRef, component: SearchSideBarComponent}): void {
    this.searchSideBar = event.component;
  }
}
