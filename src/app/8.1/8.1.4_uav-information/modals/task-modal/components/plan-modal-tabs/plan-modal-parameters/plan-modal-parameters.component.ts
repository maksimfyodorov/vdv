import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { AttachDocumentDialogComponent } from '../../../../../../../shared/components/ospo/documents/attach-document-dialog/attach-document-dialog.component';
import { TaskModalService } from '../../../services/task-modal.service';
import { Document } from '../../../../../../../shared/components/ospo/documents/attach-document-dialog/attach-document-dialog.types';
import { TaskModalDynamicConfigData, TaskMode } from '../../../types/task-modal';
import { RoleModelService } from '../../../../../../../shared/services/role-model.service';
import { Bpla, Division, Operator } from '../../../../../components/flight-plans/types/tasks';

@Component({
  selector: 'app-plan-modal-parameters',
  templateUrl: './plan-modal-parameters.component.html',
  styleUrls: ['../plan-modal-intelligence/plan-modal-intelligence.component.scss', './plan-modal-parameters.component.scss']
})
export class PlanModalParametersComponent implements OnInit {
  @Input() public form: FormGroup;
  @Input() public data: TaskModalDynamicConfigData;
  @Output() public actionEmit: EventEmitter<string> = new EventEmitter<string>();
  public document: Document;
  public operators: Operator[];
  public bpla: Bpla[];
  public divisions: Division[];

  constructor(
    private dialogService: DialogService,
    private taskModalService: TaskModalService,
  ) {
  }

  public ngOnInit(): void {
    this.getOperators();
    this.getUav();
    this.getDivision();
  }

  public openDocumentsModal(): void {
    this.dialogService.open(AttachDocumentDialogComponent, {
      data: { attachMode: 'single', }
    }).onClose.subscribe(res => {
      this.document = res[0];
      this.form.controls.order_document_uuid.setValue(res[0].uuid);
    });
  }

  public getOperators(): void {
    this.taskModalService.getOperators().subscribe(res => this.operators = res);
  }

  public getUav(): void {
    this.taskModalService.getUav().subscribe(res => {
      this.bpla = res;
    });
  }

  public getDivision(): void {
    this.taskModalService.getDivision().subscribe(res => this.divisions = res);
  }

  public checkTaskMode(modes: TaskMode[]): boolean {
    return modes.includes(this.data.mode.mode);
  }
}

@Component({
  selector: 'app-plan-modal-parameters-edit',
  templateUrl: './plan-modal-parameters.component.html',
  styleUrls: ['../plan-modal-intelligence/plan-modal-intelligence.component.scss', './plan-modal-parameters.component.scss']
})
export class PlanModalParametersEditComponent extends PlanModalParametersComponent implements OnInit {
  constructor(
    dialogService: DialogService,
    taskModalService: TaskModalService
  ) {
    super(dialogService, taskModalService);
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.fillForm();
  }

  protected fillForm(): void {
    this.form.patchValue(this.data.task);
    this.form.get('bpla_uuid').setValue(this.data.task.bpla?.uuid);
    this.form.get('operator_uuid').setValue(this.data.task.operator?.uuid);
    this.form.get('division_id').setValue(this.data.task.division?.id);
    this.form.get('order_document_uuid').setValue(this.data.task.order_document?.uuid);
    this.document = this.data.task.order_document;
  }
}

@Component({
  selector: 'app-plan-modal-parameters-disable',
  templateUrl: './plan-modal-parameters.component.html',
  styleUrls: ['../plan-modal-intelligence/plan-modal-intelligence.component.scss', './plan-modal-parameters.component.scss']
})
export class PlanModalParametersDisableComponent extends PlanModalParametersEditComponent implements OnInit {
  constructor(
    dialogService: DialogService,
    taskModalService: TaskModalService,
    private roleService: RoleModelService,
  ) {
    super(dialogService, taskModalService);
  }

  public ngOnInit(): void {
    super.ngOnInit();

    // if (this.roleService.userAccessLevel$.value !== 'command') {
    this.form.disable();
    // }
  }
}
