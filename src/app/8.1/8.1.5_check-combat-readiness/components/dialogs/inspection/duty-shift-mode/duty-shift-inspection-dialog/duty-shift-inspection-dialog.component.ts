import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewingCheckData } from '../../inspection-dialog/Mock';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InspectionFormParams } from '../../inspection-dialog/inspection-dialog.types';
import { NotificationService } from '../../../../../../../shared/components/ospo/notification/services/notification.service';
import { CheckCombatReadinessDataService } from '../../../../../services/check-combat-readiness-data.service';
import { CheckCombatReadinessService } from '../../../../../services/check-combat-readiness.service';
import { CancelInspectionDialogComponent } from '../../cancel-inspection-dialog/cancel-inspection-dialog.component';
import { takeWhile } from 'rxjs/operators';
import { TransferCheckComponent } from '../../transfer-check/transfer-check.component';
import { TreeDialogComponent } from '../../../../../../../shared/components/tree-dialog/tree-dialog.component';
import { PlanHistoryChangesComponent } from '../../../plan-history-changes/plan-history-changes.component';
import { LoaderService } from '../../../../../../../shared/components/loader/loader.service';
import { RoleModelService } from '../../../../../../../shared/services/role-model.service';
import { AccessLevel } from '../../../../../../../shared/services/auth.types';
import { DocumentCategories } from '../../types/inspection-types';
import { TimeChartScheduleService } from '../../../../time-chart-schedule/time-chart-schedule.service';

@Component({
  selector: 'app-duty-shift-inspection-dialog',
  templateUrl: './duty-shift-inspection-dialog.component.html',
  styleUrls: ['./duty-shift-inspection-dialog.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class DutyShiftInspectionDialogComponent implements OnInit {
  dialogFormParams: FormGroup;
  mockFormParams = ViewingCheckData;
  items: MenuItem[];
  activeIndex = 2;
  submitButtonText: string;
  subdivisionTreeDialog: DynamicDialogRef;
  structureTreeDialog: DynamicDialogRef;
  mode = 'view';
  selectedSchedule;
  formData: InspectionFormParams = {
    structure: null,
    subdivision: null,
    dt_start: null,
    dt_end: null,
  };
  documentCategories = DocumentCategories;
  currentAccessLevel: AccessLevel;
  documents = [];
  currentDocumentList = [];
  dateStartIsChanged = false;
  dateEndIsChanged = false;
  currentStatusIndex: number;
  inspectionStatuses = [
    {
      uuid: this.checkCombatReadinessData.getInspectionStatusUuidByName(this.checkCombatReadinessData.inspectionStatuses, 'Заппанирована'),
      name: 'Заппанирована',
    },
    {
      uuid: this.checkCombatReadinessData.getInspectionStatusUuidByName(this.checkCombatReadinessData.inspectionStatuses, 'На исполнении'),
      name: 'На исполнении',
    },
    {
      uuid: this.checkCombatReadinessData.getInspectionStatusUuidByName(this.checkCombatReadinessData.inspectionStatuses, 'Завершена'),
      name: 'Завершена',
    },
    {
      uuid: this.checkCombatReadinessData.getInspectionStatusUuidByName(this.checkCombatReadinessData.inspectionStatuses, 'Закрепление статуса'),
      name: 'Закрепление статуса',
    },
  ];

  constructor(
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private checkCombatReadinessData: CheckCombatReadinessDataService,
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private httpService: CheckCombatReadinessService,
    public loaderService: LoaderService,
    public roleModelService: RoleModelService,
    public timeChartScheduleService: TimeChartScheduleService,
  ) {
  }

  ngOnInit(): void {
    this.roleModelService.userAccessLevel$.subscribe(res => {
      this.currentAccessLevel = res;
    });
    this.documents = this.config.data?.importedDialogData?.document_groups;
    this.selectedSchedule = this.checkCombatReadinessData.selectedSchedule;
    this.setSubmitButtonText();
    this.setMode();
    this.setProgressItems();
    this.getDialogParams();
    this.setDialogParams();

    console.log(20, this.selectedSchedule?.status?.name);
    console.log(22, this.mode);
    console.log(24, this.config.data?.importedDialogData?.document_groups?.length);
  }

  setMode(): void {
    this.mode = this.config?.data?.mode;
  }

  setSubmitButtonText(): void {
    switch (this.config?.data.importedDialogData?.status?.name) {
      case 'Запланирована':
        this.submitButtonText = 'Начать проверку';
        this.currentStatusIndex = 0;
        break;
      case 'На исполнении':
        this.submitButtonText = 'Завершить проверку';
        this.currentStatusIndex = 1;
        break;
      case 'Завершена':
        this.submitButtonText = 'Успешно';
        this.currentStatusIndex = 2;
        break;
      case 'Присвоение статуса':
        this.currentStatusIndex = 3;
        break;
    }
  }

  getDialogParams(): void {
    if (this.mode === 'view') {
      this.formData.structure = this.config.data.importedDialogData.military_unit;
      this.formData.subdivision = this.config.data.importedDialogData.division;
      this.formData.dt_start = this.config.data.importedDialogData.dt_start;
      this.formData.dt_end = this.config.data.importedDialogData.dt_end;
    }
  }

  setProgressItems(): void {
    this.activeIndex =
      this.config.data.importedDialogData ?
        this.checkCombatReadinessData.getStatusIndexByStatusName(this.config.data.importedDialogData.status.name)
        : 0;
    this.items = [
      { label: 'Запланирована' },
      { label: 'На исполнении' },
      { label: 'Завершена' },
      { label: 'Закрепление статуса' },
    ];
  }

  deleteInspection(): void {
    this.httpService.deleteInspectionById(this.checkCombatReadinessData.selectedScheduleUuid,
      this.checkCombatReadinessData.selectedInspectionId).subscribe(data => {
      this.closeDialog();
    });
  }

  changeModeToEdit(): void {
    this.mode = 'edit';
  }

  setDialogParams(): void {
    this.dialogFormParams = this.formBuilder.group({
      dateStart: [this.formData?.dt_start ? this.formData?.dt_start : null, [Validators.required]],
      dateEnd: [this.formData?.dt_end ? this.formData?.dt_end : null, [Validators.required]],
    });
  }

  openSubdivisionDialog(): void {
    this.subdivisionTreeDialog = this.dialogService.open(TreeDialogComponent, {
      header: 'Выбор подразделения',
      width: '555px',
      data: this.loaderService.startLoading(this.httpService.getDivisionById(this.formData.structure.id)),
    });
    this.subdivisionTreeDialog.onClose.subscribe((data) => {
      if (data) {
        this.formData.subdivision = data;
      }
    });
  }

  openCancelInspectionDialog(): void {
    const cancelDialog = this.dialogService.open(CancelInspectionDialogComponent, {
      data: {
        dateStart: this.config.data.importedDialogData.dt_start,
        dateEnd: this.config.data.importedDialogData.dt_end,
        document: this.config.data.importedDialogData.document_groups,
      },
      header: 'Отмена проверки',
      width: '588px',
    });
    cancelDialog.onClose.pipe(takeWhile(res => res)).subscribe(data => {
      this.notificationService.invoke({
        title: 'Отмена проверки', description: 'На учебный год 2021 по плану проверок командующего ВДВ:',
        date: (new Date).toLocaleDateString(),
      });
      this.closeDialog();
    });
  }

  openTransferInspectionDialog(): void {
    this.dialogService.open(TransferCheckComponent, {
      data: {
        dateStart: this.config.data.importedDialogData.dt_start,
        dateEnd: this.config.data.importedDialogData.dt_end,
      },
      header: 'Перенос проверки',
      width: '588px',
    }).onClose.pipe(takeWhile(res => res)).subscribe(data => {
      this.notificationService.invoke({
        title: 'Перенос проверки', description: 'На учебный год 2021 по плану проверок командующего ВДВ:',
        date: (new Date).toLocaleDateString(),
      });
      this.closeDialog();
    });
  }

  openCheckingStructureDialog(): void {
    this.structureTreeDialog = this.dialogService.open(TreeDialogComponent, {
      header: 'Выбор проверяемой структуры',
      width: '555px',
      data: this.loaderService.startLoading(this.httpService.getMilitaryUnits()),
    });
    this.structureTreeDialog.onClose.subscribe((data) => {
      if (data) {
        this.formData.structure = data;
      }
    });
  }

  formDocumentUuidList(): any {
    let documentsUuids = [];
    documentsUuids = this.currentDocumentList.map(item => item?.uuid);
    return documentsUuids;
  }

  submit(): void {
    const data = {
      dt_start: this.dateStartIsChanged ? new Date(this.dialogFormParams.value.dateStart).toLocaleDateString()
        : this.dialogFormParams.value.dateStart,
      dt_end: this.dateEndIsChanged ? new Date(this.dialogFormParams.value.dateEnd).toLocaleDateString()
        : this.dialogFormParams.value.dateEnd,
      division_id: this.formData?.subdivision?.id || null,
      military_unit_id: this.formData.structure.id,
    };
    if (this.mode === 'create') {
      this.httpService.createInspection(this.checkCombatReadinessData.selectedScheduleUuid, data).subscribe(params => {
        this.timeChartScheduleService.needRefresh = true;
        this.dialogRef.close(params);
      });
    } else if (this.mode === 'edit') {
      this.httpService.editInspection(this.checkCombatReadinessData.selectedScheduleUuid,
        this.checkCombatReadinessData.selectedInspectionId, data).subscribe(params => {
        this.timeChartScheduleService.needRefresh = true;
        this.dialogRef.close(params);
      });
    }
  }

  submitNewStatus(): void {
    const queryData = {
      new_status: this.inspectionStatuses[this.currentStatusIndex + 1].uuid,
      documents: this.formDocumentUuidList(),
    };
    this.httpService.changeInspectionStatus(this.checkCombatReadinessData.selectedScheduleUuid,
      this.checkCombatReadinessData.selectedInspectionId, queryData).subscribe(data => {
      this.timeChartScheduleService.needRefresh = true;
      this.dialogRef.close(true);
    });
  }

  submitBG(combatReadinessText): void {
    const queryData = {
      new_status: this.inspectionStatuses[this.currentStatusIndex + 1].uuid,
      combat_readiness: combatReadinessText,
      documents: this.formDocumentUuidList(),
    };
    this.httpService.changeInspectionStatus(this.checkCombatReadinessData.selectedScheduleUuid,
      this.checkCombatReadinessData.selectedInspectionId, queryData).subscribe(data => {
      this.timeChartScheduleService.needRefresh = true;
      this.dialogRef.close(true);
    });
  }

  openHistoryCheckDialog(): void {
    this.dialogService.open(PlanHistoryChangesComponent, {
      data: {
        key: 'inspection',
      },
      header: 'История изменений',
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
