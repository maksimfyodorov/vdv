import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from '../../types/order.types';
import { Document } from '../../../../shared/components/ospo/documents/documents.types';
import { AddOrderDialogService } from '../../services/add-order-dialog.service';
import { LoaderService } from '../../../../shared/components/loader/loader.service';
import { ExecuteOrderDialogService } from '../../services/execute-order-dialog.service';
import { Report } from '../../types/report.types';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-execute-order-dialog',
  templateUrl: './execute-order-dialog.component.html',
  styleUrls: ['./execute-order-dialog.component.scss'],
  providers: [ExecuteOrderDialogService],
})
export class ExecuteOrderDialogComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public order: Order = this.config.data.order;
  public coExecutors: FormArray;
  public isViewMode = false;

  constructor(
    private config: DynamicDialogConfig,
    private fb: FormBuilder,
    private dialogRef: DynamicDialogRef,
    private addOrderDialogService: AddOrderDialogService,
    private renderer: Renderer2,
    public loader: LoaderService,
    private executeOrderDialogService: ExecuteOrderDialogService,
  ) {
  }

  public ngOnInit(): void {
    this.buildForm();
    this.fillForm();
    this.addClassToBody();

    this.disableFormOnViewMode();
  }

  public ngOnDestroy(): void {
    this.removeClassFromBody();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      report: this.fb.group({
        execution_date: [null, Validators.required],
        document_uuid: [null],
        document: [[], Validators.required],
        additional_documents: [[]],
        description: [null],
      }),
      executor: this.fb.group({
        shdk_uuid: [null, Validators.required],
        military_unit_id: [null, Validators.required],
        military_man_uuid: [null],
      }),
      co_executors: this.fb.array([this.createCoExecutor()]),
    });
  }

  private createCoExecutor(): FormGroup {
    return this.fb.group({
      shdk_uuid: null,
      military_unit_id: null,
      military_man_uuid: null,
    });
  }

  private fillForm(): void {
    if (!this.order.report) this.order.report = {} as Report;
    this.form.patchValue(this.order);

    this.order.report.execution_date
      ? this.form.get('report').get('execution_date').setValue(new Date(this.order.report.execution_date))
      : this.form.get('report').get('execution_date').setValue(new Date(new Date()));

    this.form.get('executor').setValue({
      shdk_uuid: {
        shdk_uuid: this.order.executor.shdk.uuid,
        military_man: `${this.order.executor.shdk.rank.name} ${this.order.executor.shdk.military_man.name.substr(0, 1)}.${this.order.executor.shdk.military_man.surname}`,
        appointment: this.order.executor.shdk.appointment.name,
      },
      military_unit_id: this.order.executor.military_unit.id,
      military_man_uuid: this.order.executor.shdk.military_man.uuid,
    });

    this.fillCoExecutorsSection();
  }

  private fillCoExecutorsSection(): void {
    this.coExecutors = this.form.get('co_executors') as FormArray;
    for (let i = 0; i < this.order.co_executors.length - 1; i++) {
      this.coExecutors.push(this.createCoExecutor());
    }

    this.order.co_executors.forEach(item => {
      item.military_unit_id = item.military_unit && item.military_unit?.id;
      if (item.shdk) {
        item.shdk_uuid = {
          shdk_uuid: item.shdk?.uuid,
          military_man: `${item.shdk.rank.name} ${item.shdk.military_man.name.substr(0, 1)}.${item.shdk.military_man.surname}`,
          appointment: item.shdk?.appointment.name,
        };
        item.military_man_uuid = item.shdk?.military_man.uuid;
      }
    });
    this.form.get('co_executors').patchValue(this.order.co_executors);
  }


  public addCoExecutor(): void {
    this.coExecutors = this.form.get('co_executors') as FormArray;
    this.coExecutors.push(this.createCoExecutor());
  }

  public deleteCoExecutor(): void {
    this.coExecutors.controls.pop();
    this.coExecutors.value.pop();
  }

  public resetCoExecutor(): void {
    const militaryMan = {
      shdk_uuid: { military_man: null },
    };
    const resetedCoExecutor = {
      shdk_uuid: null,
      military_unit_id: null,
      military_man_uuid: null,
    };

    this.coExecutors = this.form.get('co_executors') as FormArray;
    this.coExecutors.controls[0].patchValue(militaryMan);
    this.coExecutors.controls[0].patchValue(resetedCoExecutor);
  }

  private setFormValue(): void {
    const formValues = {
      executor: {
        military_man_uuid:
          this.form.get('executor').value?.shdk_uuid?.military_man_uuid
            ? this.form.get('executor').value?.shdk_uuid?.military_man_uuid
            : this.form.get('executor').value?.military_man_uuid,
        shdk_uuid: this.form.get('executor').value?.shdk_uuid?.shdk_uuid,
      },
      report: {
        document_uuid: this.form.get('report').value?.document[0]?.uuid || null,
        additional_documents: this.form.get('report').value.additional_documents.map(item => ({ uuid: item.uuid })),
      },
    };

    this.form.patchValue(formValues);
    this.setCoExecutorsValue();
    this.checkForNullCoExecutor();
    this.addOrderDialogService.formatDate(this.form.value.report);
  }

  private setCoExecutorsValue(): void {
    this.form.get('co_executors').value.forEach(item => {
      if (item.shdk_uuid?.military_man_uuid) {
        item.military_man_uuid = item.shdk_uuid.military_man_uuid;
        item.shdk_uuid = item.shdk_uuid.shdk_uuid;
        return;
      }
      if (item.military_man_uuid) {
        item.shdk_uuid = item.shdk_uuid.shdk_uuid;
        return;
      }
      item.military_man_uuid = null;
      item.shdk_uuid = null;
    });
  }

  private checkForNullCoExecutor(): void {
    const coExecutors = this.form.get('co_executors').value;
    const lastCoExecutor = coExecutors[coExecutors.length - 1];

    if (coExecutors.length > 1 && !lastCoExecutor.shdk_uuid && !lastCoExecutor.military_unit_id) {
      coExecutors.splice(coExecutors.length - 1, 1);
    }
  }

  public saveChanges(): void {
    this.setFormValue();
    const execution = cloneDeep(this.form.value);
    delete execution.report.document;

    this.loader.startLoading(
      this.executeOrderDialogService.addExecution(this.order.uuid, execution))
      .subscribe(res => {
        this.dialogRef.close(res);
      });
  }

  public reportInDocumentsChanged($event: Document[]) {
    this.form.get('report').patchValue({
      document: $event,
    });
  }

  public documentsChanged($event: Document[]): void {
    this.form.get('report').patchValue({
      additional_documents: $event,
    });
  }

  public cancelChanges(): void {
    this.dialogRef.close();
  }

  public addClassToBody(): void {
    this.renderer.addClass(document.body, 'commander-orders-overflow-hidden');
  }

  public removeClassFromBody(): void {
    this.renderer.removeClass(document.body, 'commander-orders-overflow-hidden');
  }

  public reportOnSuccess(): void {
    const mode = { status: 'SUCCESS' };

    this.loader.startLoading(
      this.executeOrderDialogService.reportOnSuccess(this.order.uuid, mode)).subscribe((res) => {
        this.dialogRef.close(res);
    });
  }

  public reportOnFailure(): void {
    const mode = { status: 'FAILURE' };

    this.loader.startLoading(
      this.executeOrderDialogService.reportOnFailure(this.order.uuid, mode)).subscribe((res) => {
        this.dialogRef.close(res);
    });
  }

  private disableFormOnViewMode(): void {
    this.isViewMode = this.config.data.isViewMode;
    this.isViewMode && this.form.disable();
  }

}
