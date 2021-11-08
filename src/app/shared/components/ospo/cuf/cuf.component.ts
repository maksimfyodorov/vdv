import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, SubscriptionLike } from 'rxjs';
import { PeriodValidators } from '../../period/periodValidators';
import { filter, pluck } from 'rxjs/operators';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CufData, Status } from './interfaces/interfaces';
import { Equipment, Type } from './types/types';
import { CufService } from './services/cuf.service';
import { LoaderService } from '../../loader/loader.service';

@Component({
  selector: 'app-cuf',
  templateUrl: './cuf.component.html',
  styleUrls: ['./cuf.component.scss'],
})
export class CufComponent implements OnInit, OnDestroy {

  get periodsArrayForm(): FormArray {
    return this.cufForm.get('periods') as FormArray;
  }

  get triggersArrayForm(): FormArray {
    return this.cufForm.get('triggers') as FormArray;
  }

  public cufForm: FormGroup;
  public equipment: Equipment;
  public targetType: number;
  private statuses: Status[];
  private subHost: Subscription;
  private subType: SubscriptionLike;

  constructor(public config: DynamicDialogConfig,
              private dialogRef: DynamicDialogRef,
              private cufService: CufService,
              public loader: LoaderService) {
  }

  public ngOnInit(): void {
    this.getStatuses();
    this.equipment = this.config.data.equipment;
    this.targetType = this.config.data.targetType;
    this.createCufForm();
    this.subscribeToType();
  }

  public ngOnDestroy(): void {
    this.subHost?.unsubscribe();
    this.subType?.unsubscribe();
  }

  public save(): void {
    this.cufForm.addControl('is_reported', new FormControl('false'));
    this.sendForm();
  }

  public saveAndNotify(): void {
    this.cufForm.addControl('is_reported', new FormControl('true'));
    this.sendForm();
  }

  public pushTriggerControl(): void {
    this.triggersArrayForm.push(new FormGroup({
      uuid: new FormControl(),
      trigger_id: new FormControl({
        value: '',
        disabled: !this.cufForm.get('host_id').value,
      }, Validators.required),
      status_uuid: new FormControl({
        value: '',
        disabled: !this.cufForm.get('host_id').value,
      }, Validators.required),
      auto_report: new FormControl({
        value: true, disabled: !this.cufForm.get('host_id').value,
      }, Validators.required),
    }));
  }

  public deleteTriggerControl(index: number): void {
    this.triggersArrayForm.removeAt(index);
  }

  public pushPeriod(): void {
    this.periodsArrayForm.push(new FormControl(null, PeriodValidators.filledPeriod));
  }

  public deletePeriod(index: number): void {
    this.periodsArrayForm.removeAt(index);
  }

  private getStatuses(): void {
    this.cufService.getStatuses()
      .pipe(pluck('data'))
      .subscribe(res => this.statuses = res);
  }

  private subscribeToType(): void {
    this.subType = this.cufForm.get('type').valueChanges.subscribe(res => this.changeFormFields(res));
  }

  private createCufForm(): void {
    this.cufForm = new FormGroup({
      status_uuid: new FormControl(),
      message: new FormControl(null, Validators.required),
      type: new FormControl('manual', Validators.required),
      target_type: new FormControl(this.targetType),
    });
    this.equipment?.fixation?.cuf ? this.addFieldsToFormForCuf() : this.addFieldsToFormForManualType();
  }

  private addFieldsToFormForCuf(): void {
    this.cufForm.get('type').setValue('cuf');
    this.changeFormFieldsForAuto();

    if (this.equipment.fixation?.cuf.triggers) {
      this.equipment.fixation?.cuf.triggers.forEach(() => this.pushTriggerControl());
    }

    if (this.equipment.fixation?.cuf.periods) {
      this.equipment.fixation?.cuf.triggers.forEach(() => this.pushPeriod());
    }
    this.fillForm();
  }

  private addFieldsToFormForManualType(): void {
    this.changeFormFields();
    this.fillForm();
  }

  private fillForm(): void {
    this.equipment.fixation?.cuf ? this.fillCufForm() : this.fillManualForm();
    this.cufForm.markAllAsTouched();
  }

  private fillCufForm(): void {
    const cufObj = JSON.parse(JSON.stringify(this.equipment.fixation?.cuf));
    delete cufObj.uuid;
    delete cufObj.server;
    cufObj.triggers.forEach(item => delete item.status);
    this.cufForm.get('host_id').enable();
    this.cufForm.setValue({
      ...cufObj,
      type: 'cuf',
      target_type: this.targetType,
    });
  }

  private fillManualForm(): void {
    this.cufForm.setValue({
      type: 'manual',
      target_type: this.targetType,
      target_uuid: this.equipment.uuid,
      message: '',
      status_uuid: this.equipment.status.uuid,
    });
  }

  private changeFormFields(type: Type = 'manual'): void {
    type === 'manual' ? this.changeFormFieldsForManual() : this.changeFormFieldsForAuto();
  }

  private changeFormFieldsForAuto(): void {
    this.cufForm.addControl('periods', new FormArray([], Validators.required));
    this.cufForm.addControl('server_uuid', new FormControl(null, Validators.required));
    this.cufForm.addControl('host_id', new FormControl({ value: null, disabled: true }, Validators.required));
    this.cufForm.addControl('triggers', new FormArray([], Validators.required));
    this.subscribeToHostId();

    if (!this.triggersArrayForm.controls.length && !this.equipment.fixation?.cuf) {
      this.pushTriggerControl();
    }
    if (!this.periodsArrayForm.controls.length && !this.equipment.fixation?.cuf) {
      this.pushPeriod();
    }
    if (this.cufForm.controls.hasOwnProperty('status_uuid')) {
      this.cufForm.removeControl('status_uuid');
    }
    if (this.cufForm.controls.hasOwnProperty('target_uuid')) {
      this.cufForm.removeControl('target_uuid');
    }
  }

  private subscribeToHostId(): void {
    this.subHost = this.cufForm.get('host_id').valueChanges.pipe(filter(item => item))
      .subscribe(() => this.triggersArrayForm.enable());
  }

  private changeFormFieldsForManual(): void {
    this.cufForm.addControl('status_uuid', new FormControl(null, Validators.required));
    const cufControls = ['periods', 'server_uuid', 'host_id', 'triggers'];
    cufControls.forEach(control => {
      queueMicrotask(() => {
        if (this.cufForm.controls.hasOwnProperty(control)) {
          this.cufForm.removeControl(control);
        }
      });
    });
    this.cufForm.addControl('target_uuid', new FormControl(this.equipment.uuid));
    this.subHost?.unsubscribe();
  }

  private sendForm(): void {
    const data = this.removeEmptyFields(this.cufForm.value);
    delete data.type;
    this.cufForm.value.hasOwnProperty('periods') ? this.sendCufForm(data) : this.postManualForm(data);
  }

  private sendCufForm(data): void {
    !this.equipment?.fixation?.cuf?.uuid ? this.postCufForm(data) : this.putCufForm({
      ...data,
      uuid: this.equipment.fixation?.cuf.uuid,
    });
  }

  private postCufForm(data): void {
    this.loader.startLoading(this.cufService.postCufAuto(data))
      .subscribe((res) => this.dialogRef.close({ mode: 'auto', data: res }),
      );
  }

  private putCufForm(data): void {
    this.loader.startLoading(this.cufService.putCufAuto(data))
      .subscribe(res => this.dialogRef.close({ mode: 'auto', data: res }));
  }

  private postManualForm(data): void {
    const status = this.statuses.find(item => item.uuid === this.cufForm.get('status_uuid').value);
    this.loader.startLoading(this.cufService.postCufManual(data))
      .subscribe(() => this.dialogRef.close({
        mode: 'manual',
        data: {
          ...this.equipment,
          status,
        },
      }));
  }

  private removeEmptyFields(obj: FormData): CufData {
    const cleanObj = obj as unknown as CufData;
    for (const key in cleanObj) {
      if (cleanObj[key] === null || cleanObj[key] === undefined) {
        delete cleanObj[key];
      }
      if (typeof cleanObj[key] === 'object') {
        this.removeEmptyFields(cleanObj[key]);
      }
    }
    return cleanObj;
  }
}
