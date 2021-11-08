import { Component, Host, OnDestroy, OnInit, SkipSelf } from '@angular/core';
import { map, mergeMap, switchMap, takeWhile, tap } from 'rxjs/operators';
import { UavStateService } from './services/uav-state.service';
import { LoaderService } from '@app/shared/components/loader/loader.service';
import { DialogService } from 'primeng/dynamicdialog';
import { SecurityService } from '../../../8.1.6_communication-nodes/tabs/communication-center/tabs/security/services/security.service';
import { SecurityHierarchyService } from '../../../8.1.6_communication-nodes/tabs/communication-center/tabs/security/services/security-hierarchy.service';
import {
  SecurityHierarchy,
  SecurityTech,
  SecurityTechStatus,
  SecurityTotal,
  TechSecurityItem,
} from '@app/shared/components/ospo/ospo-security/types/security.types';
import { combineLatest, forkJoin, Subscription } from 'rxjs';
import { AddTechComponent } from '../../../8.1.6_communication-nodes/tabs/communication-center/tabs/security/dialogs/add-tech/add-tech.component';
import { EditTechComponent } from '../../../8.1.6_communication-nodes/tabs/communication-center/tabs/security/dialogs/edit-tech/edit-tech.component';
import { SelectionTreeService } from '../uav-node-folder/services/selection-tree.service';
import { NotificationLinkOpenerService } from '@app/shared/components/ospo/notification/services/notification-link-opener.service';
import { NotificationLink } from '@app/shared/components/ospo/notification/services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { createDate } from '@app/8.1/8.1.4_uav-information/shared-functions';

export const COLS = [
  { field: 'node', header: 'Группа техники', template: 'nodeTemplate' },
  { field: 'summary', header: '', template: 'summaryTemplate' },
  { field: 'state', header: 'По штату', template: 'stateTemplate' },
  { field: 'stock', header: 'В наличии', template: 'stockTemplate' },
  { field: 'excess', header: 'Излишек', template: 'excessTemplate' },
  { field: 'lack', header: 'Недостаток', template: 'lackTemplate' },
  { field: 'broken', header: 'Неисправно', template: 'brokenTemplate' },
  { field: 'flight_summary', header: 'Полет', template: 'flightSummaryTemplate' },
  { field: 'total', header: 'Всего', template: 'flightTotalTemplate' },
  { field: 'completed', header: 'Выполнено', template: 'completedTemplate' },
  { field: 'not_completed', header: 'Не выполнено', template: 'notCompletedTemplate' },
  { field: 'controls', header: '', template: 'controlsTemplate' },
];

@Component({
  selector: 'app-uav-state',
  templateUrl: './uav-state.component.html',
  styleUrls: ['./uav-state.component.scss'],
  providers: [UavStateService, LoaderService],
})
export class UavStateComponent implements OnInit, OnDestroy {
  public cols = COLS;
  public subscriptions: Subscription;
  public tableDataSource: SecurityHierarchy;
  public maxDate: Date = new Date();
  public disabledTable: boolean;
  public hasReport: boolean;
  public infoForHeader: any;
  public filteredDate: Date = this.setCurrentDate();
  public techMode: boolean = !!+this.route.snapshot.queryParams.tech_mode;
  private treeSubscription: Subscription;


  constructor(
    public selectionTreeService: SelectionTreeService,
    @Host() public loader: LoaderService,
    private dialog: DialogService,
    private securityService: SecurityService,
    private hierarchy: SecurityHierarchyService,
    private uavStateService: UavStateService,
    private notificationOpenerService: NotificationLinkOpenerService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.checkSelectionTreeChanges();
    this.getSecurityHierarchy();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.treeSubscription.unsubscribe()
  }

  public updateStatus(data: { item: TechSecurityItem; updatedStatus: SecurityTechStatus }): void {
    this.loader
      .startLoading(this.securityService.updateTechStatus(data.updatedStatus, data.item.uuid))
      .subscribe((res) => this.getSecurityHierarchy());
  }

  public addTech($event): void {
    this.dialog
      .open(AddTechComponent, { header: 'Добавить технику' })
      .onClose.pipe(
      takeWhile((res) => res),
      switchMap((res) =>
        this.securityService.addTech(
          res,
          $event.division?.id || $event.military_unit?.id || $event.cn_military_unit?.id || $event?.id,
        ),
      ),
    )
      .subscribe((res) => {
        this.getSecurityHierarchy();
      });
  }

  public editTech($event: TechSecurityItem): void {
    this.dialog
      .open(EditTechComponent, { header: 'Редактировать технику', data: $event })
      .onClose.pipe(
      takeWhile((res) => res),
      map((res) => ({ ...res, documents: res.documents.map((doc) => ({ uuid: doc.uuid, name: doc.name })) })),
      switchMap((res) => this.securityService.editTech(res, $event.uuid)),
    )
      .subscribe((res) => this.getSecurityHierarchy());
  }

  public deleteTech($event: TechSecurityItem): void {
    this.securityService.deleteTech($event).subscribe(() => this.getSecurityHierarchy());
  }

  public getSecurityHierarchy(): void {
    this.subscriptions?.unsubscribe();
    this.subscriptions = combineLatest([
      this.route.paramMap,
      this.route.queryParamMap,
    ]).pipe(
      mergeMap(params => this.loader.startLoading(this.uavStateService.getBplaCondition(
        +params[0].get('military_unit_id'),
        params[1].get('date'),
        !!Number(params[1].get('tech_mode')),
      ))),
    ).pipe(
      tap((res) => {
        res.total = {
          ...res.total,
          ...res.flight_info,
        };

        this.infoForHeader = { label: res.hierarchy.label };
        this.tableDataSource = this.techMode
          ? { ...res, hierarchy: this.techMode ? this.flatHierarchy([res.hierarchy]) : [res.hierarchy] }
          : this.treeHierarchWithoutTechnic(res);
      }),
    ).subscribe(_ => this.disabledTable = this.getEditableTableStatus());
  }

  private treeHierarchWithoutTechnic(tree): any {
    return {
      total: tree.total,
      hierarchy: [tree.hierarchy],
    };
  }

  private getEditableTableStatus(): boolean {
    return !this.checkDate();
  }

  public generateReport(): void {
    // Todo: Необходимо доделать, после выяснения, как должен выглядеть доклад
    // this.securityService.generateSecurityReport().subscribe(() => {
    //   this.hasReport = false;
    //   this.disabledTable = this.getEditableTableStatus();
    // });
  }

  private flatHierarchy(
    hierarchy: Array<{ total: SecurityTotal; children: SecurityTech[] & any } & any>,
  ): Array<{ total: SecurityTotal; children: SecurityTech[] & any } & any> {

    const newHierarchy = [];

    newHierarchy.push({
      ...hierarchy[0],
      children: hierarchy[0].children.filter((child) => child.point === 'security' || child.point === 'security_item'),
      expanded: true,
    });

    hierarchy[0].children.forEach((child) => {
      if (child.point === 'mu') {
        newHierarchy.push({
          ...child,
          children: child.children.filter((child) => child.point === 'security' || child.point === 'security_item'),
          expanded: true,
        });
      }
    });

    return newHierarchy;
  }

  private checkDate(): boolean {
    const filteredYear = this.filteredDate.getFullYear();
    const filteredMonth = this.filteredDate.getMonth() + 1;
    const filteredDay = this.filteredDate.getDate();

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();

    return filteredYear === currentYear && filteredMonth === currentMonth && filteredDay === currentDay;
  }

  public routeByDate(event: Date): void {
    const queryParams = { date: createDate(event) };
    this.router.navigate([], { relativeTo: this.route, queryParams, queryParamsHandling: 'merge' }).catch();
  }

  public routeByTechMode(event: any): void {
    const queryParams = { ...this.route.snapshot.queryParams };
    event.checked ? queryParams.tech_mode = +event.checked : delete queryParams.tech_mode;
    this.router.navigate([], { relativeTo: this.route, queryParams }).catch();
  }

  private setCurrentDate(): Date {
    return new Date(this.route.snapshot.queryParams.date);
  }

  private checkSelectionTreeChanges(): void {
    this.treeSubscription = this.selectionTreeService.selectionTreeSelectItemSubject.subscribe(res => {
      this.selectionTreeService.militaryUnitId = res.uuid;
      const currentId = this.route?.snapshot.params['military_unit_id'];
      const newUrlWithoutParams = this.router.url.replace(currentId, res.uuid.toString()).split('?')[0];
      const queryParams = {...this.route?.snapshot.queryParams};
      this.router.navigate([newUrlWithoutParams], {queryParams}).catch();
    });
  }
}
