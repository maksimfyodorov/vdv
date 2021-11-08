import { Component, DoCheck, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Group, LayoutStrategy } from '@puzzleitc/ng-time-chart';
import * as moment from 'moment';
import { Inspection, InspectionBody } from '../../types/check-combat-readiness.types';
import { InspectionDialogComponent } from '../dialogs/inspection/inspection-dialog/inspection-dialog.component';
import { DutyShiftInspectionDialogComponent } from '../dialogs/inspection/duty-shift-mode/duty-shift-inspection-dialog/duty-shift-inspection-dialog.component';
import { LoaderService } from '../../../../shared/components/loader/loader.service';
import { RoleModelService } from '../../../../shared/services/role-model.service';
import { DialogService } from 'primeng/dynamicdialog';
import { CheckCombatReadinessDataService } from '../../services/check-combat-readiness-data.service';
import { CheckCombatReadinessService } from '../../services/check-combat-readiness.service';
import { RangeDate } from '../../../../shared/components/range-data-picker/date-picker.types';
import { TimeChartScheduleService } from './time-chart-schedule.service';
import { TableDesignChanger } from './table-design-changer';
import { SubscriptionLike } from 'rxjs';
import { NotificationLinkOpenerService } from '../../../../shared/components/ospo/notification/services/notification-link-opener.service';
import { filter, pluck } from 'rxjs/operators';

@Component({
  selector: 'app-time-chart-schedule',
  templateUrl: './time-chart-schedule.component.html',
  styleUrls: ['./time-chart-schedule.component.scss'],
})
export class TimeChartScheduleComponent implements OnInit, DoCheck, OnDestroy {

  @ViewChild('timeChartTable') timeChartTable;
  @Output() needTableUpdate = new EventEmitter<any>();

  @Input() set dataSource(value: InspectionBody) {
    this._dataSource = value;
  }

  get dataSource(): InspectionBody {
    return this._dataSource;
  }

  layoutStrategy: LayoutStrategy = LayoutStrategy.Tiled;
  private _dataSource: InspectionBody;
  public loadingData = true;
  public monthInterval = 2;
  startDate;
  endDate;
  groups = [];
  tableDesignChanger = new TableDesignChanger();
  needStylesUpdate = true;
  private subLinkOpener: SubscriptionLike;

  constructor(
    public loaderService: LoaderService,
    public roleModelService: RoleModelService,
    public timeChartScheduleService: TimeChartScheduleService,
    private dialogService: DialogService,
    private checkCombatReadinessData: CheckCombatReadinessDataService,
    private httpService: CheckCombatReadinessService,
    private linkOpener: NotificationLinkOpenerService,
  ) {
  }

  ngOnInit(): void {
    this.setDefaultTableDate(this.monthInterval);
    this.subscribeToLinkOpener();
  }

  ngDoCheck(): void {
    this.prepareItemsGridBackground();
  }

  ngOnDestroy(): void {
    this.subLinkOpener.unsubscribe();
  }

  prepareItemsGridBackground(): void {
    if (document.getElementsByClassName('week-offset').item(0) != null ||
      document.getElementsByClassName('week').item(0) != null) {
      let offsetWidth;
      let items = document.getElementsByClassName('item-grouping');
      if (document.getElementsByClassName('week-offset').item(0) != null) {
        // @ts-ignore
        offsetWidth = document.getElementsByClassName('week-offset')[0]?.offsetWidth;
      } else {
        // @ts-ignore
        offsetWidth = document.getElementsByClassName('week')[0]?.offsetWidth;
      }
      this.setItemGridBackground(items, offsetWidth);
      if (this.needStylesUpdate) {
        this.needStylesUpdate = false;
        this.tableDesignChanger.changeDesign();
      }
    }
  }

  setItemGridBackground(items, offsetWidth): void {
    for (let i = 0; i < items.length; i++) {
      // @ts-ignore
      items[i].style['background'] = 'repeat url(/assets/img/drawing.png)';
      // @ts-ignore
      items[i].style['background-color'] = 'white';
      // @ts-ignore
      items[i].style['background-position-x'] = `${offsetWidth}px`;
    }
  }

  setDefaultTableDate(monthInterval: number): void {
    let startDate;
    let endDate;
    const convertedStartDate = ['', '', ''];
    const convertedEndDate = ['', '', ''];
    if (this.timeChartScheduleService.getBrowserName() === 'firefox') {
      startDate = new Date().toLocaleDateString();
      startDate = startDate.split('/');
      const firefoxStartDateMonth = startDate[0];
      const firefoxStartDateDay = startDate[1];
      startDate[1] = firefoxStartDateMonth;
      startDate[0] = firefoxStartDateDay;
      endDate = startDate;
    } else {
      startDate = new Date().toLocaleDateString();
      startDate = startDate.split('.');
      endDate = startDate;
    }
    convertedStartDate[0] = startDate[2];
    convertedStartDate[1] = (parseInt(startDate[1], 16) - monthInterval).toString();
    convertedStartDate[2] = startDate[0];
    startDate = convertedStartDate.join('-');

    convertedEndDate[0] = endDate[2];
    convertedEndDate[1] = (parseInt(endDate[1], 16) + monthInterval).toString();
    convertedEndDate[2] = endDate[0];
    endDate = convertedEndDate.join('-');

    this.startDate = moment(startDate);
    this.endDate = moment(endDate);
  }

  setTableDateFromFilter(date: RangeDate): void {
    if (date) {
      this.startDate = moment(date.from);
      this.endDate = moment(date.to);
    }
  }

  prepareSchedule(inspectionBody): void {
    let preparedFormation;
    inspectionBody.formations.forEach(formation => {
      const items = (this.prepareGroupItems(formation));
      preparedFormation = new Group(
        formation.name,
        items,
      );
      this.groups.push(preparedFormation);
    });
    this.loadingData = false;
  }

  prepareGroupItems(formation): any {
    let preparedInspection;
    const items = [];
    formation.inspections.forEach(inspection => {
      preparedInspection = {
        name: inspection.name,
        startTime: moment(this.convertDateToTableFormat(inspection.dt_start)),
        endTime: moment(this.convertDateToTableFormat(inspection.dt_end)),
        class: this.getInspectionClass(inspection.status?.name, inspection.combat_readiness?.name),
        onClick: () => {
          this.prepareItemsGridBackground();
          if (!this.timeChartScheduleService.loadingOpeningDialog) {
            this.openInspectionDialog(inspection);
          }
        },
      };
      items.push(preparedInspection);
    });
    return items;
  }

  public openInspectionDialog(event): void {
    this.timeChartScheduleService.loadingOpeningDialog = true;
    this.checkCombatReadinessData.selectedInspectionId = event.uuid;
    if (!this.roleModelService.userPermissions$.value['access.edit_inspection_status']) {
      this.httpService.getInspectionById(event.uuid, this.checkCombatReadinessData.selectedScheduleUuid).subscribe(data => {
        this.timeChartScheduleService.loadingOpeningDialog = false;
        this.dialogService.open(InspectionDialogComponent, {
          header: 'Просмотр проверки', data: {
            mode: 'view',
            importedDialogData: data,
          },
        }).onClose.subscribe(res => {
        });
      });
    } else {
      this.openDutyShiftInspectionDialog(event);
    }
  }

  public openDutyShiftInspectionDialog(event): void {
    this.timeChartScheduleService.loadingOpeningDialog = true;
    this.httpService.getInspectionById(event.uuid, this.checkCombatReadinessData.selectedScheduleUuid).subscribe(data => {
      this.timeChartScheduleService.loadingOpeningDialog = false;
      this.dialogService.open(DutyShiftInspectionDialogComponent, {
        header: 'Просмотр проверки', data: {
          mode: 'view',
          importedDialogData: data,
        },
      }).onClose.subscribe(res => {
      });
    });
  }

  getInspectionClass(status: string, combatReadiness: string): string {
    switch (combatReadiness) {
      case 'Не определено':
        return 'undefined-inspection';
      case 'БГ':
        return 'BG-inspection';
      case 'Не БГ':
        return 'not-BG-inspection';
    }

    switch (status) {
      case 'Запланирована':
        return 'planed-inspections';
      case 'На исполнении':
        return 'on-execute-inspections';
      case 'Завершена':
        return 'completed-inspections';
      case 'Отменена':
        return 'canceled-inspections';
    }
  }

  convertDateToTableFormat(date): string {
    const newDate = date.split('.');
    return `${newDate[0]}-${newDate[1]}-${newDate[2]}`;
  }

  refreshScheduleTable(): void {
    this.loadingData = true;
    setTimeout(() => {
      this.loadingData = false;
      this.needStylesUpdate = true;
    }, 1);
  }

  private subscribeToLinkOpener(): void {
    this.subLinkOpener = this.linkOpener.currentLinkData$
      .pipe(
        filter(res => !!res),
        filter(res => res.type === 'inspection'),
        pluck('inspection'))
      .subscribe(inspectionUuid => this.openInspectionDialog({uuid: inspectionUuid}));
  }
}
