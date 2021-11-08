import {Component, OnInit} from '@angular/core';
import {DesantEventsService} from '../../../../../../services/desant-events.service';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {NewEventDataService} from '../../../../services/new-event-data.service';
import {SelectDesantSubdivisionSubtaskComponent} from '../select-desant-subdivision-substask/select-desant-subdivision-subtask.component';
import {StaffTask} from '../../../../../../types/desant-events.type';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StaffTaskInfoService} from '../../services/staff-task-info.service';
import {LoaderService} from '../../../../../../../../../shared/components/loader/loader.service';
import {Document} from '../../../../../../../../../shared/components/ospo/documents/documents.types';

@Component({
  selector: 'app-new-subtask-dialog',
  templateUrl: './new-staff-subtask-dialog.component.html',
  styleUrls: ['./new-staff-subtask-dialog.component.scss'],
  providers: [DesantEventsService, LoaderService],
})
export class NewStaffSubtaskDialogComponent implements OnInit {
  public form: FormGroup = this.initTaskForm();
  public documents: Document[] = [];
  public allTasks: StaffTask[];
  public selectedTask: StaffTask;
  public dateStartSubtask: Date;
  public timeStartSubtask: Date;
  public dateEndSubtask: Date;
  public timeEndSubtask: Date;
  public notes: string;
  public subdivisions = [];
  public titleDoc = 'Добавить документы';
  private completingUUID: string;
  private existSubtaskUUID: string;
  public componentState = '';

  constructor(
    public loader: LoaderService,
    private desantEventsService: DesantEventsService,
    private dialogService: DialogService,
    private dialogRef: DynamicDialogRef,
    private dynamicDialogConfig: DynamicDialogConfig,
    private newEventService: NewEventDataService,
    private staffTaskInfoService: StaffTaskInfoService,
  ) {
  }

  ngOnInit(): void {
    this.completingUUID = this.dynamicDialogConfig.data?.completingUUID;
    this.existSubtaskUUID = this.dynamicDialogConfig.data?.existSubtaskUUID;
    this.form = this.initTaskForm();
    this.getAllDesantTasks();
    if (this.existSubtaskUUID) {
      this.getSubtaskFormValue();
      this.getSubtaskDocs();
    } else {
      this.componentState = 'create';
    }
  }

  public createOrChangeSubTask(): void {
    if (this.componentState === 'edit') {
      this.loader.startLoading(this.staffTaskInfoService.putStaffSubtask(this.existSubtaskUUID, this.setSubtaskParams())).subscribe();
    } else {
      this.loader.startLoading(this.staffTaskInfoService.postStaffSubtask(this.setSubtaskParams())).subscribe(value => this.existSubtaskUUID = value.uuid);
    }
  }

  public closeModal(): void {
    this.dialogRef.close();
  }

  public addDesantSubdivision(): void {
    this.dialogService.open(SelectDesantSubdivisionSubtaskComponent, {
      dismissableMask: true,
      header: 'Выбрать военнослужащих для задачи десантирования',
      width: '1350px',
    });
  }

  public addSubtaskDocs(): void {
    let chooseDocUUID = [];
    this.documents.forEach(value => chooseDocUUID.push(value.uuid));
    const docParams: any = {
      document_uuids: chooseDocUUID
    };
    chooseDocUUID = [];
    this.loader.startLoading(this.staffTaskInfoService.putSubtaskDocs(this.existSubtaskUUID, docParams)).subscribe(() => this.getSubtaskDocs());
  }

  private getAllDesantTasks(): void {
    this.loader.startLoading(this.desantEventsService.getDesantTask()).subscribe(value => this.allTasks = value.data);
  }

  private initTaskForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      date_start_plan: new FormControl('', Validators.required),
      time_start_plan: new FormControl('', Validators.required),
      date_end_plan: new FormControl('', Validators.required),
      time_end_plan: new FormControl('', Validators.required),
      notes: new FormControl('', Validators.required),
    });
  }

  private setTime(date: Date, time: Date): Date {
    const dateTimeSum = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours() + 3, time.getMinutes());
    return dateTimeSum;
  }

  private setSubtaskParams(): any {
    const params = {
      task_directory_uuid: this.form.controls.name.value.uuid,
      date_start_plan: this.setTime(this.form.controls.date_start_plan.value, this.form.controls.time_start_plan.value).toISOString(),
      date_end_plan: this.setTime(this.form.controls.date_end_plan.value, this.form.controls.time_end_plan.value).toISOString(),
      note: this.form.controls.notes.value,
      completing_uuid: this.completingUUID,
    };
    return params;
  }

  private setSubtaskFormValue(value: any): void {
    this.form.controls.name.setValue(value?.task_directory);
    this.form.controls.date_start_plan.setValue(new Date(value?.date_start_plan));
    this.form.controls.date_end_plan.setValue(new Date(value?.date_end_plan));
    this.form.controls.notes.setValue(value?.note);
  }

  private getSubtaskDocs(): void {
    this.loader.startLoading(this.staffTaskInfoService.getSubtaskDocs(this.existSubtaskUUID)).subscribe(value => this.documents = value.document);
  }

  private getSubtaskFormValue(): void {
    this.loader.startLoading(this.staffTaskInfoService.getStaffSubtaskBasicInfo(this.existSubtaskUUID)).subscribe(value => {
      this.setSubtaskFormValue(value);
      this.componentState = 'edit';
    });
  }
}
