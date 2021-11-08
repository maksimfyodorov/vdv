import { AfterViewInit, ChangeDetectorRef, Component, DoCheck, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  InspectionBody,
  InspectionSchedule,
  SCHEDULE_STATUS_ICONS,
  ScheduleStatusCode,
} from '../types/check-combat-readiness.types';
import { RangeDate } from '../../../shared/components/range-data-picker/date-picker.types';
import { DialogService } from 'primeng/dynamicdialog';
import { CheckCombatReadinessService } from '../services/check-combat-readiness.service';
import { EventStatus, SchedulerEvent } from '../components/scheduler-table/scheduler-table.types';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { filter, pluck, takeWhile } from 'rxjs/operators';
import { LoaderService } from '../../../shared/components/loader/loader.service';
import { CreateScheduleComponent } from '../components/dialogs/schedule/create-schedule/create-schedule.component';
import { PlanHistoryChangesComponent } from '../components/dialogs/plan-history-changes/plan-history-changes.component';
import { SaveScheduleDialogComponent } from '../components/dialogs/schedule/save-schedule-dialog/save-schedule-dialog.component';
import { CheckData } from '../../../shared/interfaces/check-combat-readiness-model';
import { InspectionDialogComponent } from '../components/dialogs/inspection/inspection-dialog/inspection-dialog.component';
import { NotificationService } from '../../../shared/components/ospo/notification/services/notification.service';
import { CheckCombatReadinessDataService } from '../services/check-combat-readiness-data.service';
import { RoleModelService } from '../../../shared/services/role-model.service';
import { DutyShiftInspectionDialogComponent } from '../components/dialogs/inspection/duty-shift-mode/duty-shift-inspection-dialog/duty-shift-inspection-dialog.component';
import { TimeChartScheduleService } from '../components/time-chart-schedule/time-chart-schedule.service';
import { BehaviorSubject, SubscriptionLike } from 'rxjs';
import { NotificationLinkOpenerService } from '../../../shared/components/ospo/notification/services/notification-link-opener.service';
import { DocumentsFormalizedService } from '@app/shared/components/ospo/documents-formalized/services/documents-formalized.service';
import { ScheduleDateForPrintConverter } from '@app/8.1/8.1.5_check-combat-readiness/classes/scheduleDateForPrintConverter';


@Component({
  selector: 'app-check-combat-readiness',
  templateUrl: './check-combat-readiness.component.html',
  styleUrls: ['./check-combat-readiness.component.scss'],
  providers: [DialogService, LoaderService],
})
export class CheckCombatReadinessComponent implements OnInit, DoCheck, OnDestroy, AfterViewInit {

  public readonly breadcrumbsLabels = [
    { label: 'Главная', url: '/' },
    {
      label: 'График проверки плана',
    },
  ];

  @ViewChild('schedule') scheduleTable;
  public inspectionSchedules: InspectionSchedule[];
  public inspectionsChecks: InspectionBody;
  public selectedSchedule: InspectionSchedule;
  public dateRange: RangeDate;
  public scheduleExecutionProgress = 67;
  public enableCancelCheckDialog = false;
  public enableEditCheckDialog = false;
  public enableCreateCheckDialog = false;
  public statusIcons = SCHEDULE_STATUS_ICONS;
  public selectedEvent: SchedulerEvent;
  public isLoadingInspections = false;
  public isRefresh = false;
  public selectedYear;
  public filterDateValues: {
    max: Date
    min: Date
    defaultDate: Date,
  };
  private subLinkOpener: SubscriptionLike;
  public selectedMuFilterParams;

  constructor(
    public loaderService: LoaderService,
    private dialogService: DialogService,
    private httpService: CheckCombatReadinessService,
    public checkCombatReadinessData: CheckCombatReadinessDataService,
    public roleModelService: RoleModelService,
    public timeChartScheduleService: TimeChartScheduleService,
    private message: NotificationService,
    private linkOpener: NotificationLinkOpenerService,
    public changeDetectorRef: ChangeDetectorRef,
    private loader: LoaderService,
    private readonly documentService: DocumentsFormalizedService,
  ) {
  }

  public ngOnInit(): void {
    this.getMU();
    this.getInspectionSchedules();
    this.getStatuses();
    this.subscribeToLinkOpener();
    this.subscribeToPrintSubject();
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngDoCheck(): void {
    this.checkNeedToUpdateTable();
  }

  ngOnDestroy(): void {
    this.subLinkOpener.unsubscribe();
  }

  public getMU(): void {
    this.loader.startLoading(this.httpService.getMilitaryUnits()).subscribe(res => {
        this.selectedMuFilterParams = res;
      },
    );
  }

  prepareMuIdsForQuery(): string | null {
    if (this.selectedMuFilterParams) {
      const MuIds = [];
      this.selectedMuFilterParams.forEach(item => {
        MuIds.push(item.id);
      });
      let parsedMuIds: string;
      if (this.selectedMuFilterParams) {
        parsedMuIds = `military_unit_ids=`;
        for (const id of MuIds) {
          parsedMuIds += (id + ',');
        }
        const lastValueIndex = parsedMuIds.length - 1;
        if (parsedMuIds[lastValueIndex] === ',') {
          parsedMuIds = parsedMuIds.slice(0, lastValueIndex);
        }
        return MuIds ? parsedMuIds : null;
      }
    } else {
      return null;
    }
  }

  printSchedule(): void {
    this.changeDateRange(this.prepareDateForPrint());
    setTimeout(() => {
      const printHiddenButton = document.getElementsByClassName('hidden-print-button')[0] as HTMLElement;
      printHiddenButton.click();
    }, 100);
  }

  prepareDateForPrint(): RangeDate {
    const period = this.documentService.periods[0];
    switch (period.period) {
      case 'week':
        return ScheduleDateForPrintConverter.convertPrintDateToWeek(period);
      case 'month':
        return ScheduleDateForPrintConverter.convertPrintDateToMonth(period);
      case 'preparatory':
        return ScheduleDateForPrintConverter.convertPrintDateToPreparatory(period);
      case 'summer':
        return ScheduleDateForPrintConverter.convertPrintDateToSummer(period);
      case 'winter':
        return ScheduleDateForPrintConverter.convertPrintDateToWinter(period);
    }
  }

  checkNeedToUpdateTable(): void {
    if (this.timeChartScheduleService.needRefresh) {
      this.getInspectionAudits(this.selectedSchedule.uuid);
      this.timeChartScheduleService.needRefresh = false;
    }
  }

  public selectedScheduleChanged($event: any): void {
    this.selectedMuFilterParams = null;
    this.selectedSchedule = null;
    const currentScheduleDefaultDate = new Date();
    currentScheduleDefaultDate.setFullYear($event.value.year);
    this.filterDateValues = {
      max: new Date(`${$event.value.year}-12-31`),
      min: new Date(`${$event.value.year}-01-01`),
      defaultDate: currentScheduleDefaultDate,
    };
    this.dateRange = {
      from: this.filterDateValues.min,
      to: this.filterDateValues.max,
    };
    setTimeout(() => {
      this.selectedSchedule = $event.value;
      this.selectedYear = $event.value;
      this.checkCombatReadinessData.selectedScheduleUuid = $event.value.uuid;
      this.checkCombatReadinessData.selectedSchedule = $event.value;
      this.getInspectionAudits($event.value.uuid);
    }, 1);
  }

  public changeDateRange(event: RangeDate): void {
    this.dateRange = event;
    this.scheduleTable.setTableDateFromFilter(event);
    this.scheduleTable.refreshScheduleTable();
  }

  public openInspectionDialog(): void {
    this.dialogService.open(InspectionDialogComponent, {
      header: 'Создание проверки', data: {
        mode: 'create',
      },
    }).onClose.pipe(takeWhile(res => res)).subscribe(res => {
    });
  }

  getStatuses(): void {
    this.httpService.getInspectionsStatuses().subscribe(data => {
      this.checkCombatReadinessData.inspectionStatuses = data;
    });
  }

  public openDutyShiftInspectionDialog(): void {
    this.dialogService.open(DutyShiftInspectionDialogComponent, {
      header: 'Создание проверки', data: {
        mode: 'create',
      },
    }).onClose.pipe(takeWhile(res => res)).subscribe(res => {
      this.getInspectionAudits(this.selectedSchedule.uuid);
    });
  }

  updateTable(): void {
    this.getInspectionAudits(this.selectedSchedule.uuid);
  }

  showCancelCheckDialog(): void {
    this.enableCancelCheckDialog = true;
  }

  closeCancelCheckDialog($event: CheckData): void {
    this.enableCancelCheckDialog = $event.data;
  }

  public createSchedule(): void {
    this.dialogService.open(CreateScheduleComponent,
      { header: 'Создание графика проверки плана' })
      .onClose.pipe(takeWhile(res => res)).subscribe(res => {
      this.getInspectionSchedulesAfterCreateNew(res);
    });
  }

  setCSSClassForPrintPage(window: any, value: string): void {
    const t = window.document.getElementsByTagName('style')[0];
    if (t) {
      t.innerHTML += value;
    } else {
      const style = window.document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = value;
      window.document.getElementsByTagName('head')[0].appendChild(style);
    }
  }

  refreshPageAfterChangeSchedule(): void {
    this.getInspectionSchedules();
    this.selectedSchedule = null;
    this.inspectionsChecks = undefined;
  }

  public openSaveScheduleDialog(year: number): void {
    this.dialogService.open(SaveScheduleDialogComponent,
      {
        header: `Сохранение графика проверок на ${year} год`,
        data: {
          selected: this.selectedSchedule,
        },
      }).onClose.pipe(takeWhile(res => res)).subscribe(res => {
      this.refreshPageAfterChangeSchedule();
    });
  }

  public deleteSchedule(): void {
    this.dialogService.open(ConfirmationDialogComponent, {
      header: `Удалить график ${this.selectedSchedule.year}`, data: {
        message: 'Вы действительно хотите удалить график на “Выбранный год” без возможности восстановления?',
        acceptIcon: 'pi-trash',
        reject: 'Отмена',
        accept: 'Да',
      },
    }).onClose.pipe(takeWhile(res => res)).subscribe(() => {
      this.httpService.removeSchedule(this.selectedSchedule.uuid)
        .subscribe(res => {
            this.getInspectionSchedules();
            this.selectedSchedule = null;
          },
        );
    });
  }

  public openHistoryChangesDialog(): void {
    this.dialogService.open(PlanHistoryChangesComponent, {
      header: 'История изменений',
      data: { key: 'scheduler' },
    });
  }

  public selectedEventChanged($event: SchedulerEvent): void {
    this.selectedEvent = $event;
  }

  public checkSelectedEventStatuses(statuses: EventStatus[]): boolean {
    return statuses.includes(this.selectedEvent?.status);
  }

  public checkSelectedPlanStatuses(statuses: ScheduleStatusCode[]): boolean {
    if (this.selectedSchedule) {
      return statuses.includes(this.selectedSchedule.status.code);
    }
    return false;
  }

  private getInspectionSchedules(): void {
    this.selectedSchedule = null;
    this.loaderService.startLoading(this.httpService.getInspectionSchedules()).subscribe(res => {
      this.inspectionSchedules = res;
    });
  }

  private getInspectionSchedulesAfterCreateNew(createdSchedule): void {
    this.selectedSchedule = null;
    this.loaderService.startLoading(this.httpService.getInspectionSchedules()).subscribe(res => {
      this.inspectionSchedules = res;
      for (let i = 0; i < res.length; i++) {
        if (res[i].year == createdSchedule?.schedule?.year) {
          this.selectedScheduleChanged({ value: res[i] });
        }
      }
    });
  }

  private convertInspectionsDates(): void {
    this.inspectionsChecks.formations.forEach(formation => {
      formation.inspections.forEach(inspection => {
        inspection.dt_start = this.checkCombatReadinessData.swapDayWithMonth(inspection.dt_start);
        inspection.dt_end = this.checkCombatReadinessData.swapDayWithMonth(inspection.dt_end);
        if (inspection.dt_end_fact && inspection.dt_start_fact) {
          inspection.dt_end_fact = this.checkCombatReadinessData.swapDayWithMonth(inspection.dt_end_fact);
          inspection.dt_start_fact = this.checkCombatReadinessData.swapDayWithMonth(inspection.dt_start_fact);
        }
      });

    });
  }

  public getInspectionAudits(id): void {
    this.isRefresh = true;
    setTimeout(() => {
      this.isRefresh = false;
      this.isLoadingInspections = true;
      this.inspectionsChecks = null;
      this.loaderService.startLoading(this.httpService.getInspectionAuditsByMU(id, this.prepareMuIdsForQuery())).subscribe(res => {
        this.inspectionsChecks = res;
        this.convertInspectionsDates();
        this.scheduleTable.setTableDateFromFilter(this.dateRange);
        this.scheduleTable.prepareSchedule(this.inspectionsChecks);
        this.isLoadingInspections = false;
      });
    }, 1);
  }

  private subscribeToLinkOpener(): void {
    this.subLinkOpener = this.linkOpener.currentLinkData$
      .pipe(
        filter(res => !!res),
        pluck('schedule'))
      .subscribe(schedule => {
        this.selectedScheduleChanged({ value: schedule });
      });
  }

  private subscribeToPrintSubject(): void {
    this.documentService.actionType$.subscribe(res => {
      if (res === 'print') {
        this.printSchedule();
      }
    });
  }
}
