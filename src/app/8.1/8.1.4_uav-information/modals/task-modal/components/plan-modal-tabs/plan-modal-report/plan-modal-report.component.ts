import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Document } from '../../../../../../../shared/components/ospo/documents/documents.types';
import { TaskModalDynamicConfigData, TaskMode } from '../../../types/task-modal';
import { RoleModelService } from '../../../../../../../shared/services/role-model.service';

@Component({
  selector: 'app-plan-modal-report',
  templateUrl: './plan-modal-report.component.html',
  styleUrls: ['../plan-modal-intelligence/plan-modal-intelligence.component.scss', '../plan-modal-track-points/plan-modal-track-points.component.scss', './plan-modal-report.component.scss']
})
export class PlanModalReportComponent implements OnInit {
  @Input() public form: FormGroup;
  @Input() public data: TaskModalDynamicConfigData;
  @Output() public actionEmit: EventEmitter<string> = new EventEmitter<string>();
  public documents: Document[] = [];

  constructor(
    public roleService: RoleModelService
  ) {
  }

  public ngOnInit(): void {
    // if (this.roleService.userAccessLevel$.value !== 'command') {
      this.form.disable();
    // }
  }

  public attachDocument(event: Document): void {
    const documentsValue = this.form.get('flight_report_documents_uuid').value;
    documentsValue.push(event.uuid);
  }

  public detachDocument(event: Document): void {
    const documentsValue = this.form.get('flight_report_documents_uuid').value;
    const uuid = documentsValue.findIndex(documentId => documentId === event.uuid);
    documentsValue.splice(uuid, 1);
  }

  public getText(status: string): string {
    return status === 'completed' ? 'Задание выполнено' : 'Задание не выполнено';
  }

  public checkTaskMode(modes: TaskMode[]): boolean {
    return modes.includes(this.data.mode.mode);
  }
}

@Component({
  selector: 'app-plan-modal-report-edit',
  templateUrl: './plan-modal-report.component.html',
  styleUrls: ['../plan-modal-intelligence/plan-modal-intelligence.component.scss', '../plan-modal-track-points/plan-modal-track-points.component.scss', './plan-modal-report.component.scss']
})
export class PlanModalReportEditComponent extends PlanModalReportComponent implements OnInit {
  constructor(
    roleService: RoleModelService
  ) {
    super(roleService);
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.fillForm();
  }

  protected fillForm(): void {
    this.documents = this.data.task?.flight_report_documents;
    const flightReportsUuid = this.documents.map(document => document.uuid);
    this.form.patchValue(this.data.task);
    this.form.get('flight_report_documents_uuid').setValue(flightReportsUuid);

  }
}

@Component({
  selector: 'app-plan-modal-report-disable',
  templateUrl: './plan-modal-report.component.html',
  styleUrls: ['../plan-modal-intelligence/plan-modal-intelligence.component.scss', '../plan-modal-track-points/plan-modal-track-points.component.scss', './plan-modal-report.component.scss']
})
export class PlanModalReportDisableComponent extends PlanModalReportEditComponent implements OnInit {
  constructor(
    roleService: RoleModelService
  ) {
    super(roleService);
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.form.enable();
  }
}
