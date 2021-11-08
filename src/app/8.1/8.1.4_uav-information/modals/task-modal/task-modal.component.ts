import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  OnInit,
  QueryList,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { FullTask } from '../../components/flight-plans/types/tasks';
import { CoordinatesDialogService } from '../../../../shared/components/ospo/ospo-coordinates/services/coordinates-dialog.service';
import { ConfirmationService } from 'primeng/api';
import { TaskModalService } from './services/task-modal.service';
import { HttpApiService } from '../../services/api.service';
import { LoaderService } from '@app/shared/components/loader/loader.service';


interface DynamicComponentForm {
  form: AbstractControl;
  actionEmit?: EventEmitter<string>;
  data?: any;
}

const DATE_FIELD = [
  'end_flight_plan',
  'end_flight_fact',
  'start_flight_plan',
  'start_flight_fact',
];

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
  providers: [CoordinatesDialogService, ConfirmationService, TaskModalService, HttpApiService, LoaderService]
})
export class TaskModalComponent implements OnInit, AfterViewInit {
  private intelligenceForm: FormGroup;
  private paramsForm: FormGroup;
  private trackPointForm: FormGroup;
  private reportForm: FormGroup;

  @ViewChildren
  ('tabContent', { read: ViewContainerRef }) public tabContent: QueryList<ViewContainerRef>;

  constructor(
    public config: DynamicDialogConfig,
    public loaderService: LoaderService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private changeDetectorRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private dialogRef: DynamicDialogRef,
    private taskModalService: TaskModalService,
  ) {
  }

  ngOnInit(): void {
    this.buildForms();
    this.formatDate(this.config.data.task);
  }

  public ngAfterViewInit(): void {
    this.createDynamicComponentContent();
    this.changeDetectorRef.detectChanges();
  }

  private createDynamicComponentContent(): void {
    const formKeyToDynamicComponents = [this.intelligenceForm, this.paramsForm, this.trackPointForm, this.reportForm];
    this.tabContent.forEach((item, index) => {
      item.clear();
      const componentItem = this.componentFactoryResolver.resolveComponentFactory(this.config.data.tabComponents[index]);
      const componentRef = item.createComponent(componentItem);
      (componentRef.instance as DynamicComponentForm).form = formKeyToDynamicComponents[index];
      (componentRef.instance as DynamicComponentForm).data = this.config.data;
      (componentRef.instance as DynamicComponentForm).actionEmit?.subscribe(res => {
        const formValue = { ...this.intelligenceForm.value, ...this.paramsForm.value, ...this.trackPointForm.value, ...this.reportForm.value };
        this.formatDate(formValue, 'YYYY-MM-DDTHH:mm:00.000');
        this.checkForNull(formValue);
        this.doAction(res, formValue);
      });
    });
  }

  private buildForms(): void {
    this.intelligenceForm = new FormGroup({
      name: new FormControl(),
      start_flight_plan: new FormControl(),
      end_flight_plan: new FormControl(),
      coordinates_start_uuid: new FormControl(),
      coordinates_landing_uuid: new FormControl(),
      coordinates_nsu_location_uuid: new FormControl(),
    });

    this.paramsForm = new FormGroup({
      order_document_uuid: new FormControl(),
      bpla_uuid: new FormControl(),
      division_id: new FormControl(),
      operator_uuid: new FormControl(),
      target_flight: new FormControl(),
    });

    this.trackPointForm = new FormGroup({
      coordinates_track_points: new FormControl(),
    });

    this.reportForm = new FormGroup({
      start_flight_fact: new FormControl(),
      end_flight_fact: new FormControl(),
      flight_report_documents_uuid: new FormControl([]),
      note: new FormControl(),
    });
  }

  private formatDate(value: FullTask, format?: string): void {
    DATE_FIELD.forEach(field => {
      const date = value?.[field];
      if (date) {
        value[field] = format ? moment(date).format(format) : new Date(date);
      }
    });
  }

  private doAction(actionType: string, form: FullTask): void {
    const taskUuid = this.config.data.task?.uuid;
    if (actionType === 'print') {
      window.print();
      return;
    }

    const action = {
      create: () => this.taskModalService.createTask(form, this.config.data.task.plan_uuid),
      new: () => this.taskModalService.editTask(taskUuid, form),
      completed: () => this.taskModalService.completeTask(taskUuid, form),
      not_completed: () => this.taskModalService.reportNonCompliance(taskUuid, form),
      delete: () => this.taskModalService.deleteTask(taskUuid),
    };

    action[actionType]?.().subscribe(responseValue => {
      this.dialogRef.close({ actionType, responseValue, taskUuid });
    });
  }

  private checkForNull(formValue: unknown): void {
    Object.keys(formValue).forEach(k => !formValue[k] && delete formValue[k]);
  }
}
