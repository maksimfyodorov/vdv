import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {OspoChangeHistoryComponent} from '../../../../../../shared/components/ospo/ospo-change-history/ospo-change-history.component';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {DesantEventsService} from '../../../services/desant-events.service';
import {CHANGE_HISTORY, STATUSES} from '../mock';
import {DesantEventHeader, EventBasicInfo, StaffTask} from '../../../types/desant-events.type';
import {DesantEventDialogService} from '../../../services/desant-event-dialog.service';
import {HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Executive} from '../../../../../../shared/components/military/interfaces';
import {LoaderService} from '../../../../../../shared/components/loader/loader.service';
import {NewEventDataService} from '../../create-and-modifying-event/services/new-event-data.service';
import {ConfirmationDialogComponent} from '../../../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-desant-event-card',
  templateUrl: './desant-event-card.component.html',
  styleUrls: ['./desant-event-card.component.scss'],
  providers: [DesantEventsService, DesantEventDialogService, DynamicDialogRef, LoaderService],
})
export class DesantEventCardComponent implements OnInit {
  // @Output() emitChangeEvent: EventEmitter<DesantEventHeader> = new EventEmitter<DesantEventHeader>();
  public desantEventsList: EventBasicInfo[];
  public expandOpenStateEvent = [];
  public openStateTask = false;
  public tasks: StaffTask[];
  public selectedTask: StaffTask;
  public chooseAirportStyle = false;
  public eventChangeHistory = CHANGE_HISTORY;
  public changeStatuses = STATUSES;
  public currentPage = 0;
  public row = 5;
  public allEventsCount: number;
  public allPage: number;
  public militaryUnitID = 84000000;

  constructor(private dialogService: DialogService,
              private desantEventsService: DesantEventsService,
              public loader: LoaderService,
              private newEventService: NewEventDataService,
  ) {
  }

  ngOnInit(): void {
    this.getDesantEvents(this.row, this.currentPage);
  }

  changeOpenState(uuid: string): void {
    const index = this.desantEventsList.findIndex(item => item.uuid === uuid);
    this.expandOpenStateEvent[index] = !this.expandOpenStateEvent[index];
  }

  public showAllMilitaryUnit(): void {
    console.log('Все подразделения');
  }

  public showReport(): void {
    console.log('Доклад');
  }

  public openTaskInfo(): void {
    this.openStateTask = !this.openStateTask;
  }

  public changeEvent(eventInfo: EventBasicInfo): void {
    // this.newEventService.eventInfo = eventInfo;
    this.newEventService.eventUUID = eventInfo?.uuid;
  }

  public deleteEvent(uuid: string): void {
    this.dialogService.open(ConfirmationDialogComponent, {
      dismissableMask: true,
      header: `Удалить мероприятие`, data: {
        message: 'Вы действительно хотите удалить мероприятие без возможности восстановления?',
        acceptIcon: 'pi-trash',
        reject: 'Отмена',
        accept: 'Да',
      },
    }).onClose.pipe(takeWhile(res => res)).subscribe(() => {
        this.desantEventsService.deleteDesantEvent(uuid).pipe().subscribe(() => {
          this.getDesantEvents(this.row, this.currentPage);
          this.setEventExpandState();
        });
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  public openEventHistory(uuid: string): void {
    this.dialogService.open(OspoChangeHistoryComponent, {
      dismissableMask: true,
      header: 'Журнал изменений мероприятий',
      width: '1005px',
      data: {statuses: this.changeStatuses, history: this.eventChangeHistory}
    });
  }

  public setReadyState(uuid: string): void {
    console.log('Мероприятие выполнено');
  }

  public chooseAirport(uuid: string): void {
    this.chooseAirportStyle = !this.chooseAirportStyle;
    console.log('Выбрать аэропорт по id:', uuid);
  }

  public eventDuration(date_start_plan: string | undefined, date_end_plan: string | undefined): number {
    const dateStart = Date.parse(date_start_plan);
    const dateEnd = Date.parse(date_end_plan);
    const Days = (dateEnd - dateStart) / (1000 * 60 * 60 * 24);
    return Math.round(Days);
  }

  private getDesantEvents(row: number, showPage: number): void {
    // TODO: Поменять military_unit_id на динамический вместо мока
    this.loader.startLoading(this.desantEventsService.getDesantEventsList( this.createPaginatorParams(row, showPage, this.militaryUnitID))).subscribe(res => {
      this.desantEventsList = res.result;
      this.allEventsCount = res.count;
      this.allPage = this.calculateNumberOfPages(this.allEventsCount);
      this.expandOpenStateEvent = this.setEventExpandState();
    });
  }

  private setEventExpandState(): [] | any {
    return new Array(this.desantEventsList?.length).fill(false);
  }

  private createPaginatorParams(page_size: number, page: number, military_unit_id: number): HttpParams {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('military_unit_id', military_unit_id.toString());
    httpParams = httpParams.append('page_size', page_size.toString());
    httpParams = httpParams.append('page', page.toString());
    return httpParams;
  }

  public showNextPage(page: any): void {
    this.currentPage = page;
    this.getDesantEvents(this.row, page);
  }
  private calculateNumberOfPages(elementCount: number): number {
    let numberOfPage = 1;
    if (elementCount % this.row !== 0) {
      numberOfPage += Math.floor(elementCount / this.row);
    } else {
      numberOfPage = elementCount / this.row;
    }
    return numberOfPage;
  }
}
