import { Injectable } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { HttpApiService } from '../../../services/api.service';
import { SelectionTreeService } from '../../uav-node-folder/services/selection-tree.service';
import { Period, PeriodsOverTheYears } from '../types/period';
import { Plan } from '../types/plan';
import { map, mergeMap, pluck, switchMap, takeWhile, tap } from 'rxjs/operators';
import { AttachDocumentDialogComponent } from '../../../../../shared/components/ospo/documents/attach-document-dialog/attach-document-dialog.component';
import { PlanHistoryChangesComponent } from '../../../../8.1.5_check-combat-readiness/components/dialogs/plan-history-changes/plan-history-changes.component';
import { Bpla, FullTask, Operator, Task, TaskPreview } from '../types/tasks';
import { FlightPlansDialogService } from './flight-plans-dialog.service';
import { cloneDeep } from 'lodash';
import { Document } from '../../../../../shared/components/ospo/documents/attach-document-dialog/attach-document-dialog.types';
import { TaskModeGroup } from '../../../modals/task-modal/types/task-modal';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../../../../shared/components/loader/loader.service';

@Injectable()
export class FlightPlanService {
  public task: FullTask;
  public militaryUnitId: number = this.route.snapshot.params['military_unit_id'];

  constructor(
    private dialogService: DialogService,
    private apiService: HttpApiService,
    private selectionTreeService: SelectionTreeService,
    private flightPlansDialogService: FlightPlansDialogService,
    private route: ActivatedRoute,
    private loader: LoaderService
  ) {
  }

  public getFlightPlanPeriods(): Observable<PeriodsOverTheYears[]> {
    return this.loader.startLoading(this.apiService.getFlightPlanPeriods()).pipe(
      map(result => this.createMappedPeriods(result.data))
    );
  }

  private createMappedPeriods(periods: Period[]): PeriodsOverTheYears[] {
    const years = new Set();
    const periodResult: PeriodsOverTheYears[] = [];

    periods.forEach(period => years.add(period.year));

    years.forEach((year: number) => {
      const filteredPeriods = periods.filter(period => period.year === year);
      periodResult.push({ year, period: filteredPeriods });
    });

    return periodResult;
  }

  public getContentByPeriod(period: string): Observable<Plan> {
    return this.apiService.getFlightPlanContentByPeriod(period, this.militaryUnitId);
  }

  public createPlan(periodUuid: string): Observable<Plan> {
    return this.apiService.createPlan(periodUuid, this.militaryUnitId);
  }

  public getMilitaryUnitTasks(params: unknown): Observable<TaskPreview> {
    return this.apiService.getMilitaryUnitTasks(this.militaryUnitId, params);
  }

  public openDocumentationModalForAttach(uuid: string, documents: Document[]): Observable<{ documents: Document[] }> {
    return this.dialogService.open(AttachDocumentDialogComponent, { data: { selectedDocuments: documents } }).onClose.pipe(
      takeWhile(res => res),
      mergeMap(res => {
        const ids = res.map(item => item.uuid);

        return this.apiService.attachDocumentsToPlan(uuid, { documents_uuid: ids });
      }),
    );
  }

  public savePlan(uuid: string): Observable<Plan> {
    return this.apiService.changePlanStatusOnSave(uuid);
  }

  public getMilitaryUnitTasksByPlan(planId: string, params: any): Observable<TaskPreview> {
    return this.apiService.getMilitaryUnitTasksByPlan(planId, params);
  }

  public openHistoryModal(uuid: string): void {
    this.dialogService.open(PlanHistoryChangesComponent, {
      data: {
        key: 'plan',
        uuid
      }
    });
  }

  public getTaskData(uuid): Observable<any> {
    return this.apiService.getTaskData(uuid).pipe(
      tap(res => this.task = cloneDeep(res)),
    );
  }

  public openTaskModalForCreate(mode: TaskModeGroup, uuid: string, components: unknown): Observable<Task> {
    return this.flightPlansDialogService.openTaskModal(mode, components, ({ plan_uuid: uuid } as Task)).pipe(
      takeWhile(res => Boolean(res)),
    );
  }

  public openTaskModalWithTaskData(mode: TaskModeGroup, uuid: string, components: unknown): Observable<Task> {
    return this.loader.startLoading(this.getTaskData(uuid)).pipe(
      mergeMap(res => this.flightPlansDialogService.openTaskModal(mode, components, res)),
      takeWhile(res => Boolean(res)),
    );
  }

  public getFilteredTasks(planId: string, params: unknown): Observable<any> {
    return this.apiService.getFilteredTasksByPlan(planId, params);
  }

  public getOperators(): Observable<Operator[]> {
    return this.apiService.getOperators().pipe(
      pluck('data')
    );
  }

  public getUav(): Observable<Bpla[]> {
    return this.selectionTreeService.selectionTreeSelectItemSubject.pipe(
      switchMap(res => this.apiService.getUav(res.uuid)),
      pluck('bpla'),
      map(uav => uav.map(item => {
        item.vvst_sample_name = `${item.vvst_sample_name} ${item.number}`;
        return item;
      }))
    );
  }

  public openConfirmModalForCreatePlan(periodForm: any): Observable<Plan> {
    return this.flightPlansDialogService.openConfirmModal({
      header: 'Подтвердите создание',
      data: {
        message: 'Вы действительно хотите создать план?',
      },
    }).pipe(
      takeWhile(res => res),
      mergeMap(_ => this.loader.startLoading(this.createPlan(periodForm.period))),
    );
  }

  public openConfirmModalForSavePlan(planUuid: string): Observable<Plan> {
    return this.flightPlansDialogService.openConfirmModal({
      header: 'Подтвердите сохранение',
      data: {
        message: 'Вы действительно хотите сохранить план?',
      },
    }).pipe(
      takeWhile(res => res),
      mergeMap(_ => this.loader.startLoading(this.savePlan(planUuid))),
    );
  }

  public openConfirmModalForDeletePlan(uuid: string): Observable<Plan> {
    return this.flightPlansDialogService.openConfirmModal({
      header: 'Подтвердите удаление',
      data: {
        message: 'Вы действительно хотите удалить план?',
      },
    }).pipe(
      takeWhile(res => res),
      mergeMap(_ => this.loader.startLoading(this.apiService.deletePlan(uuid))));
  }

  public openConfirmModalForChangePlanStatusOnDelete(uuid: string): Observable<Plan> {
    return this.flightPlansDialogService.openConfirmModal({
      header: 'Подтвердите удаление',
      data: {
        message: 'Вы действительно хотите удалить план?',
      },
    }).pipe(
      takeWhile(res => res),
      mergeMap(_ => this.loader.startLoading(this.apiService.changePlanStatusOnDelete(uuid))));
  }

  public getPlanDocuments(uuid: string): Observable<{ documents: Document[] }> {
    return this.apiService.getPlanDocuments(uuid);
  }
}
