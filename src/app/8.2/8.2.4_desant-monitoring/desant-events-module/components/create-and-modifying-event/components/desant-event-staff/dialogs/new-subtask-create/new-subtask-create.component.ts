import {Component, OnInit} from '@angular/core';
import {CompletingTable} from '../../../../types/new-desant-event-dialog.types';
import {NewTechTaskService} from '../../../tech-event/services/new-tech-task.service';
import {LoaderService} from '../../../../../../../../../shared/components/loader/loader.service';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {HttpErrorResponse, HttpParams} from '@angular/common/http';
import {NewStaffSubtaskDialogComponent} from '../new-staff-subtask-dialog/new-staff-subtask-dialog.component';
import {StaffTaskInfoService} from '../../services/staff-task-info.service';
import {ConfirmationDialogComponent} from '../../../../../../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import {takeWhile} from 'rxjs/operators';
import {StaffTaskProgressDialogComponent} from '../staff-task-progress-dialog/staff-task-progress-dialog.component';

@Component({
  selector: 'app-new-subtask-create',
  templateUrl: './new-subtask-create.component.html',
  styleUrls: ['./new-subtask-create.component.scss'],
  providers: [LoaderService],
})
export class NewSubtaskCreateComponent implements OnInit {
  public completingTableInfo: CompletingTable[];
  private taskUUID: string;

  constructor(
    public loader: LoaderService,
    private staffTaskInfoService: StaffTaskInfoService,
    private dialogService: DialogService,
    private dialogRef: DynamicDialogRef,
    private dynamicDialogConfig: DynamicDialogConfig,
  ) {
  }

  ngOnInit(): void {
    this.taskUUID = this.dynamicDialogConfig.data.stageUUID;
    this.getCompletingTable();
  }

  private getQueryParamsForEventCompleting(uuid: string): HttpParams {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('landing_task_uuid', uuid);
    return httpParams;
  }

  public addSubTask(uuid: string): void {
    this.dialogService.open(NewStaffSubtaskDialogComponent, {
      dismissableMask: true,
      width: '720px',
      header: 'Подзадача десантирования',
      data: {completingUUID: uuid},
    }).onClose.subscribe(res => {
      this.getCompletingTable();
    });
  }

  public setSubtaskReadyState(uuid: string): void {
    this.dialogService.open(StaffTaskProgressDialogComponent, {
      dismissableMask: true,
      width: '818px',
      header: 'Ход выполнения задачи',
    });
  }

  public changeSubtask(uuid: string): void {
    this.dialogService.open(NewStaffSubtaskDialogComponent, {
      dismissableMask: true,
      width: '720px',
      header: 'Подзадача десантирования',
      data: {existSubtaskUUID: uuid},
    }).onClose.subscribe(res => {
      this.getCompletingTable();
    });
  }

  public deleteSubtask(uuid: string): void {
    this.dialogService.open(ConfirmationDialogComponent, {
      dismissableMask: true,
      header: `Удалить задачу`, data: {
        message: 'Вы действительно хотите удалить подзадачу без возможности восстановления?',
        acceptIcon: 'pi-trash',
        reject: 'Отмена',
        accept: 'Да',
      },
    }).onClose.pipe(takeWhile(res => res)).subscribe(() => {
        this.staffTaskInfoService.deleteStaffSubTask(uuid).subscribe(value => {
          this.getCompletingTable();
        });
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      },
    );
  }
  private getCompletingTable(): void {
     this.loader.startLoading(this.staffTaskInfoService.getCompletingInfo(this.getQueryParamsForEventCompleting(this.taskUUID))).subscribe(result => {
      this.completingTableInfo = result.data;
    });
  }
}
