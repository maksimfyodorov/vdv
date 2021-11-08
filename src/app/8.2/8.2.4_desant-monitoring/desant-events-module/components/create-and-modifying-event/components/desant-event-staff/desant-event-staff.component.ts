import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { NewStaffTaskDialogComponent } from './dialogs/new-staff-task-dialog/new-staff-task-dialog.component';
import { StaffSubtask, StaffTask } from '../../../../types/desant-events.type';
import { NewEventDataService } from '../../services/new-event-data.service';
import { NewStaffSubtaskDialogComponent } from './dialogs/new-staff-subtask-dialog/new-staff-subtask-dialog.component';
import { StaffTaskProgressDialogComponent } from './dialogs/staff-task-progress-dialog/staff-task-progress-dialog.component';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { LoaderService } from '../../../../../../../shared/components/loader/loader.service';
import { ActivatedRoute } from '@angular/router';
import { NewEventApiService } from '../../services/new-event-api.service';
import { NewSubtaskCreateComponent } from './dialogs/new-subtask-create/new-subtask-create.component';
import { ConfirmationDialogComponent } from '../../../../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { takeWhile } from 'rxjs/operators';
import { StaffTaskInfoService } from './services/staff-task-info.service';

@Component({
  selector: 'app-desant-event-staff',
  templateUrl: './desant-event-staff.component.html',
  styleUrls: ['./desant-event-staff.component.scss'],
  providers: [DialogService, LoaderService, StaffTaskInfoService],
})
export class DesantEventStaffComponent implements OnInit {

  public subtasks: StaffSubtask[];
  public taskList: StaffTask[];
  public tasksCount: number;
  public row = 5;
  public displayedPage: number;
  public allPage: number;

  constructor(public dialogService: DialogService,
              public loader: LoaderService,
              public newEventService: NewEventApiService,
              public newEventDataService: NewEventDataService,
              private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.newEventDataService.activeTab = 1;
    this.displayedPage = 0;
    this.loadTaskList(this.newEventDataService.eventUUID, this.row, this.displayedPage);
    this.allPage = this.calculateNumberOfPages(this.tasksCount);
  }

  public addNewTask(): void {
    this.dialogService.open(NewStaffTaskDialogComponent, {
      dismissableMask: true,
      width: '720px',
      header: 'Задача десантирования',
      data: { eventUUID: this.newEventDataService.eventUUID },
    }).onClose.subscribe(params => {
        this.taskList = [];
        this.displayedPage = 0;
        this.loadTaskList(this.newEventDataService.eventUUID, this.row, this.displayedPage);
      },
    );
  }

  public changeStaffTask(taskUUID: string): void {
    this.dialogService.open(NewStaffTaskDialogComponent, {
      dismissableMask: true,
      width: '720px',
      header: 'Задача десантирования',
      data: { eventUUID: this.newEventDataService.eventUUID, task_uuid: taskUUID },
    }).onClose.subscribe(params => {
      this.taskList = [];
      this.displayedPage = 0;
      this.loadTaskList(this.newEventDataService.eventUUID, this.row, this.displayedPage);
    });
  }

  public deleteStaffTask(uuid: string): void {
    this.dialogService.open(ConfirmationDialogComponent, {
      dismissableMask: true,
      header: `Удалить задачу`, data: {
        message: 'Вы действительно хотите удалить задачу личного состава без возможности восстановления?',
        acceptIcon: 'pi-trash',
        reject: 'Отмена',
        accept: 'Да',
      },
    }).onClose.pipe(takeWhile(res => res)).subscribe(() => {
        this.newEventService.deleteStaffTask(uuid).subscribe(value => {
          this.loadTaskList(this.newEventDataService.eventUUID, this.row, this.displayedPage);
        });
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      },
    );
  }

  public addNewSubTask(uuid: string): void {
    this.dialogService.open(NewSubtaskCreateComponent, {
      dismissableMask: true,
      width: '1000px',
      header: 'Задачи и подзадачи десантирования',
      data: { stageUUID: uuid },
    });
  }

  public changeSubtask(uuid: string): void {
    this.dialogService.open(NewStaffSubtaskDialogComponent, {
      dismissableMask: true,
      width: '720px',
      header: 'Подзадача десантирования',
      data: { stageUUID: uuid },
    });
  }

  public setSubtaskReadyState(uuid: string): void {
    // TODO: реализовать метод изменения подзадачи по uuid
  }

  public setStaffCompleteStatus(): void {
    this.dialogService.open(StaffTaskProgressDialogComponent, {
      dismissableMask: true,
      width: '818px',
      header: 'Ход выполнения задачи',
    });
  }

  public showNextPage(page: number): void {
    this.loadTaskList(this.newEventDataService.eventUUID, this.row, page);
  }

  private getTaskQueryParams(event_uuid: string, page_size: number, page: number): HttpParams {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('page_size', page_size.toString());
    httpParams = httpParams.append('page', page.toString());
    httpParams = httpParams.append('event_uuid', event_uuid);
    return httpParams;
  }

  private loadTaskList(uuid: string, row: number, page: number): void {
    this.loader
      .startLoading(this.newEventService.getStaffTasksList(this.getTaskQueryParams(uuid, row, page)))
      .subscribe((value => {
        this.taskList = value?.result;
        this.tasksCount = value?.count;
        this.allPage = this.calculateNumberOfPages(this.tasksCount);
      }));
  }

  private calculateNumberOfPages(elementCount: number): number {
    let numberOfPage = 1;
    if (this.tasksCount % this.row !== 0) {
      numberOfPage += Math.floor(elementCount / this.row);
    } else {
      numberOfPage = elementCount / this.row;
    }
    return numberOfPage;
  }
}
