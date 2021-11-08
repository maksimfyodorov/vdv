import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TransferCheckData } from '../../../../../../shared/interfaces/check-combat-readiness-model';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CheckCombatReadinessService } from '../../../../services/check-combat-readiness.service';
import { CheckCombatReadinessDataService } from '../../../../services/check-combat-readiness-data.service';
import { NotificationService } from '../../../../../../shared/components/ospo/notification/services/notification.service';
import { Document } from '../../../../../../shared/components/ospo/documents/documents.types';
import { TimeChartScheduleService } from '../../../time-chart-schedule/time-chart-schedule.service';


@Component({
  selector: 'app-transfer-cancel-inspection',
  templateUrl: './cancel-inspection-dialog.component.html',
  styleUrls: ['./cancel-inspection-dialog.component.scss'],
  providers: [MessageService],
})
export class CancelInspectionDialogComponent implements OnInit {

  checkForm: FormGroup;
  documents: Document[] = [];
  currentDocumentList = [];

  constructor(
    private messageService: MessageService,
    public dialogRef: DynamicDialogRef,
    private fb: FormBuilder,
    public config: DynamicDialogConfig,
    private httpService: CheckCombatReadinessService,
    private checkCombatReadinessData: CheckCombatReadinessDataService,
    public timeChartScheduleService: TimeChartScheduleService,
  ) {
  }

  ngOnInit(): void {
    this.getDocuments();
    this._createForm();
  }

  private _createForm(): void {
    this.checkForm = this.fb.group({
      currentInspectionStartDate: [this.config.data.dateStart, Validators.required],
      currentInspectionEndDate: [this.config.data.dateEnd, Validators.required],
      result: ['', Validators.required],
    });
  }

  formDocumentUuidList(): any {
    let documentsUuids = [];
    documentsUuids = this.currentDocumentList.map(item => item?.uuid);
    return documentsUuids;
  }

  getDocuments(): void {
    this.documents = this.config.data.document;
  }

  submitCancel(): void {
    const queryData = {
      ...this.checkForm.value,
      new_status: this.checkCombatReadinessData.getInspectionStatusUuidByName(this.checkCombatReadinessData.inspectionStatuses, 'Отменена'),
      documents: this.formDocumentUuidList(),
    };
    this.httpService.changeInspectionStatus(this.checkCombatReadinessData.selectedScheduleUuid, this.checkCombatReadinessData.selectedInspectionId,
      queryData).subscribe(data => {
      this.timeChartScheduleService.needRefresh = true;
      this.dialogRef.close(true);
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
