import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CheckCombatReadinessService } from '../../../../services/check-combat-readiness.service';
import { CheckCombatReadinessDataService } from '../../../../services/check-combat-readiness-data.service';
import { Document } from '../../../../../../shared/components/ospo/documents/documents.types';
import { TimeChartScheduleService } from '../../../time-chart-schedule/time-chart-schedule.service';

@Component({
  selector: 'app-transfer-check',
  templateUrl: './transfer-check.component.html',
  styleUrls: ['./transfer-check.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class TransferCheckComponent implements OnInit {

  checkForm: FormGroup;
  documents: Document[] = [];
  currentDocumentList = [];

  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private httpService: CheckCombatReadinessService,
    private checkCombatReadinessData: CheckCombatReadinessDataService,
    public timeChartScheduleService: TimeChartScheduleService,
  ) {
  }

  ngOnInit(): void {
    this._createForm();
  }

  private _createForm(): void {
    this.checkForm = this.fb.group({
      currentInspectionStartDate: [this.config.data.dateStart, Validators.required],
      currentInspectionEndDate: [this.config.data.dateEnd, Validators.required],
      newStartDate: [new Date, Validators.required],
      newEndDate: [new Date, Validators.required],
      result: ['', Validators.required],
    });
  }

  formDocumentUuidList(): any {
    let documentsUuids = [];
    documentsUuids = this.currentDocumentList.map(item => item?.uuid);
    return documentsUuids;
  }

  submitTransfer(): void {
    const queryData = {
      currentInspectionStartDate: this.checkForm.value.currentInspectionStartDate,
      currentInspectionEndDate: this.checkForm.value.currentInspectionEndDate,
      new_dt_start: this.checkForm.value.newStartDate,
      new_dt_end: this.checkForm.value.newEndDate,
      result: this.checkForm.value.result,
      new_status: this.checkCombatReadinessData.getInspectionStatusUuidByName(this.checkCombatReadinessData.inspectionStatuses, 'Перенесена'),
      documents: this.formDocumentUuidList(),
    };
    this.httpService.changeInspectionStatus(this.checkCombatReadinessData.selectedScheduleUuid, this.checkCombatReadinessData.selectedInspectionId,
      queryData).subscribe(data => {
      this.timeChartScheduleService.needRefresh = true;
      this.dialogRef.close(true);
    });
  }

  closeDialog(): void {
    this.dialogRef.close(true);
  }
}
