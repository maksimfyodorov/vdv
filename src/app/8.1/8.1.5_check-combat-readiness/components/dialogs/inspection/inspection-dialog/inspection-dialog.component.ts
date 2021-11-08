import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  DoCheck,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService, TreeNode } from 'primeng/api';
import {
  ViewingCheckData, tree,
} from 'src/app/8.1/8.1.5_check-combat-readiness/components/dialogs/inspection/inspection-dialog/Mock';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TreeDialogComponent } from '../../../../../../shared/components/tree-dialog/tree-dialog.component';
import { CheckCombatReadinessService } from '../../../../services/check-combat-readiness.service';
import { InspectionFormParams } from './inspection-dialog.types';
import { CheckCombatReadinessDataService } from '../../../../services/check-combat-readiness-data.service';
import { CancelInspectionDialogComponent } from '../cancel-inspection-dialog/cancel-inspection-dialog.component';
import { PlanHistoryChangesComponent } from '../../plan-history-changes/plan-history-changes.component';
import { TransferCheckComponent } from '../transfer-check/transfer-check.component';
import { NotificationService } from '../../../../../../shared/components/ospo/notification/services/notification.service';
import { takeWhile } from 'rxjs/operators';
import { LoaderService } from '../../../../../../shared/components/loader/loader.service';
import { RoleModelService } from '../../../../../../shared/services/role-model.service';
import { AccessLevel } from '../../../../../../shared/services/auth.types';
import { TimeChartScheduleService } from '../../../time-chart-schedule/time-chart-schedule.service';

@Component({
  selector: 'app-create-check-dialog',
  templateUrl: './inspection-dialog.component.html',
  styleUrls: ['./inspection-dialog.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class InspectionDialogComponent implements OnInit {
  dialogFormParams: FormGroup;
  mockFormParams = ViewingCheckData;
  items: MenuItem[];
  cancelItems: MenuItem[] = [
    { label: 'Запланирована' },
    { label: 'Отменена' },
  ];
  dateStartIsChanged = false;
  dateEndIsChanged = false;
  activeIndex = 2;
  subdivisionTreeDialog: DynamicDialogRef;
  structureTreeDialog: DynamicDialogRef;
  mode = 'view';
  currentAccessLevel: AccessLevel;
  documents = [];
  selectedSchedule;
  formData: InspectionFormParams = {
    structure: null,
    subdivision: null,
    dt_start: null,
    dt_end: null,
  };


  constructor(
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    public roleModelService: RoleModelService,
    private notificationService: NotificationService,
    private checkCombatReadinessData: CheckCombatReadinessDataService,
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private httpService: CheckCombatReadinessService,
    public loaderService: LoaderService,
    public timeChartScheduleService: TimeChartScheduleService,
  ) {
  }

  ngOnInit(): void {
    this.roleModelService.userAccessLevel$.subscribe(res => {
      this.currentAccessLevel = res;
    });
    this.documents = this.config.data?.importedDialogData?.documents;
    this.selectedSchedule = this.checkCombatReadinessData.selectedSchedule;
    this.setMode();
    this.setProgressItems();
    this.getDialogParams();
    this.setDialogParams();
  }

  setMode(): void {
    this.mode = this.config?.data?.mode;
  }

  deleteInspection(): void {
    this.httpService.deleteInspectionById(this.checkCombatReadinessData.selectedScheduleUuid,
      this.checkCombatReadinessData.selectedInspectionId).subscribe(data => {
      this.timeChartScheduleService.needRefresh = true;
      this.closeDialog();
    });
  }

  openCancelInspectionDialog(): void {
    const cancelDialog = this.dialogService.open(CancelInspectionDialogComponent, {
      data: {
        dateStart: this.config.data.importedDialogData.dt_start,
        dateEnd: this.config.data.importedDialogData.dt_end,
        document: this.config.data.importedDialogData.documents,
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

  changeModeToEdit(): void {
    this.mode = 'edit';
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

  setDialogParams(): void {
    const currentYear = new Date(this.checkCombatReadinessData.selectedSchedule.year, 0, 1);
    this.dialogFormParams = this.formBuilder.group({
      dateStart: [this.formData?.dt_start ? this.formData?.dt_start : currentYear, [Validators.required]],
      dateEnd: [this.formData?.dt_end ? this.formData?.dt_end : currentYear, [Validators.required]],
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

  openHistoryCheckDialog(): void {
    this.dialogService.open(PlanHistoryChangesComponent, {
      data: {
        key: 'inspection',
      },
      header: 'История графика',
    });
  }

  closeDialog(): void {
    this.dialogRef.close(true);
  }
}
