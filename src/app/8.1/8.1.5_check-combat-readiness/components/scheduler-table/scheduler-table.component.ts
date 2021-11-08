import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, DoCheck, OnInit } from '@angular/core';
import {
  EVENT_STATUS_NAMES, EventsCount, EventStatus,
  FILTER_OPTIONS,
  MONTH_NAMES,
  SchedulerEvent,
  VIEW_OPTIONS,
  ViewOption,
  ViewOptionValue,
  WEEK_DAYS_NAMES,
} from './scheduler-table.types';
import { SchedulerTableService } from './scheduler-table.service';
import { CheckboxConfig } from '../../../../shared/components/multiple-checkboxes/multiple-checkboxes.component';
import { Inspection, InspectionBody, InspectionSchedule } from '../../types/check-combat-readiness.types';
import { DialogService } from 'primeng/dynamicdialog';
import { InspectionDialogComponent } from '../dialogs/inspection/inspection-dialog/inspection-dialog.component';
import { InspectionFormParams } from '../dialogs/inspection/inspection-dialog/inspection-dialog.types';
import { CheckCombatReadinessService } from '../../services/check-combat-readiness.service';
import { LoaderService } from '../../../../shared/components/loader/loader.service';
import { takeWhile } from 'rxjs/operators';
import { CheckCombatReadinessDataService } from '../../services/check-combat-readiness-data.service';
import { RoleModelService } from '../../../../shared/services/role-model.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { DutyShiftInspectionDialogComponent } from '../dialogs/inspection/duty-shift-mode/duty-shift-inspection-dialog/duty-shift-inspection-dialog.component';
import { NotificationLinkOpenerService } from '../../../../shared/components/ospo/notification/services/notification-link-opener.service';

@Component({
  selector: 'app-scheduler-table',
  templateUrl: './scheduler-table.component.html',
  styleUrls: ['./scheduler-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: SchedulerTableService }],
})
export class SchedulerTableComponent {
  @Input() set dataSource(value: InspectionBody) {
    this._dataSource = value;
  }

  get dataSource(): InspectionBody {
    return this._dataSource;
  }

  @Input() set startDate(value) {
    this.tableService.setStartDate(value || new Date());
    this.determineDisplayRange();
  }

  @Output() needTableUpdate = new EventEmitter<any>();
  @Output() selectionEvent: EventEmitter<Inspection> = new EventEmitter<Inspection>();
  public filterOptions: CheckboxConfig[] = FILTER_OPTIONS;
  public filterValues: EventStatus[];
  public weekDaysNames: string[] = WEEK_DAYS_NAMES;
  public monthNames: string[] = MONTH_NAMES;
  public viewOptions: ViewOption[] = VIEW_OPTIONS;
  public eventStatusNames = EVENT_STATUS_NAMES;
  public displayedRange: Date[] = [];
  public viewMode: ViewOption = { name: 'Год', value: 'year' };
  public selectedEvent: Inspection;
  private _dataSource: InspectionBody;

  constructor(
    private tableService: SchedulerTableService,
    public loaderService: LoaderService,
    public roleModelService: RoleModelService,
    private dialogService: DialogService,
    private checkCombatReadinessData: CheckCombatReadinessDataService,
    private httpService: CheckCombatReadinessService) {
    this.changeViewMode();
  }

  public changeViewMode(): void {
    this.determineDisplayRange();
  }

  public turnViewPage(forward: boolean, step: ViewOptionValue): void {
    this.tableService.turnViewPage(forward, step);
    this.determineDisplayRange();
  }

  public getDisplayedEvents(formationEvents: Inspection[]): Inspection[] {
    return this.tableService.takeEventsInRange(formationEvents, this.displayedRange);
  }

  public openInspectionDialog(event): void {
    this.checkCombatReadinessData.selectedInspectionId = event.uuid;
    if (!this.roleModelService.userPermissions$.value['access.edit_inspection_status']) {
      this.httpService.getInspectionById(event.uuid, this.checkCombatReadinessData.selectedScheduleUuid).subscribe(data => {
        this.dialogService.open(InspectionDialogComponent, {
          header: 'Просмотр проверки', data: {
            mode: 'view',
            importedDialogData: data,
          },
        }).onClose.subscribe(res => {
          this.needTableUpdate.emit();
        });
      });
    } else {
      this.openDutyShiftInspectionDialog(event);
    }
  }

  public openDutyShiftInspectionDialog(event): void {
    console.log(12);
    this.httpService.getInspectionById(event.uuid, this.checkCombatReadinessData.selectedScheduleUuid).subscribe(data => {
      this.dialogService.open(DutyShiftInspectionDialogComponent, {
        header: 'Просмотр проверки', data: {
          mode: 'view',
          importedDialogData: data,
        },
      }).onClose.subscribe(res => {
        this.needTableUpdate.emit();
      });
    });
  }

  getInspectionColor(status: string, combatReadiness: string): string {
    switch (combatReadiness) {
      case 'Не определено':
        return '#959ea9';
      case 'БГ':
        return '#82c91e';
      case 'Не БГ':
        return '#fa5252';
    }

    switch (status) {
      case 'Запланирована':
        return '#339af0';
      case 'На исполнении':
        return '#fab005';
      case 'Завершена':
        return '#22B8CF';
      case 'Отменена':
        return '#c92a2a';
    }
  }


  public selectionChanged(event: Inspection): void {
    this.selectedEvent = event;
    this.selectionEvent.emit(event);
  }

  public filterByCheckboxes(statuses: EventStatus[]): void {
    this.filterValues = statuses;
  }

  // get filteredInspections(): InspectionBody[] {
  //   if (this._dataSource) {
  //     return this._dataSource.inspections.map(inspection => {
  //       return {
  //         ...inspection,
  //         formations: inspection.formations.map(formation => {
  //           return {
  //             ...formation,
  //             events: formation.events.filter(event => {
  //               return this.filterValues ? this.filterValues.includes(event.status) : true;
  //             })
  //           };
  //         })
  //       };
  //     });
  //   }
  // }

  private determineDisplayRange(): void {
    this.displayedRange = this.tableService.determineRangeByMode(this.viewMode.value);
  }

  // private setStatusesCount(): void {
  //   this._dataSource.events_count.forEach(status => {
  //     const filterOption = this.filterOptions[this.filterOptions.findIndex(option => {
  //       return option.name === status.status;
  //     })];
  //     filterOption.count = status.count;
  //   });
  // }
}
