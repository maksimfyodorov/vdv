import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-reason-absence',
  templateUrl: './reason-absence.component.html',
  styleUrls: ['./reason-absence.component.scss'],
})
export class ReasonAbsenceComponent implements OnInit {
  reasons: SelectItem[] = [{ value: 'Болен', label: 'Болен' }];

  reason: SelectItem;

  anotherReason: boolean = false;

  descriptionReason: string = '';

  formGroup: FormGroup;

  value: any;

  constructor(private dialogRef: DynamicDialogRef, private dialogConfig: DynamicDialogConfig) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      reason: new FormControl(null),
      allowAnotherReason: new FormControl(false),
      descriptionReason: new FormControl({ value: '', disabled: true }),
    });

    this.value = this.dialogConfig.data.value;
  }

  submit(): void {
    const note = this.formGroup.value.reason || this.formGroup.value.descriptionReason;
    const reqBody = { status: { ...this.value.data.node.military_man.conditions.lack, status: true }, note };
    this.dialogRef.close(reqBody);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  allowAnotherReason(checked: boolean): void {
    if (checked) {
      this.formGroup.get('reason').disable();
      this.formGroup.get('descriptionReason').enable();
    } else {
      this.formGroup.get('reason').enable();
      this.formGroup.get('descriptionReason').disable();
    }
  }
}
