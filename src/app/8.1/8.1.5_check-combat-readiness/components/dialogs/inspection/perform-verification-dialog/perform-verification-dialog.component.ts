import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FormGroup, FormArray, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { organizingVerifications, verifiableMilitaryFormations, tree } from './Mock';
import { Verification } from '../../../../types/check-combat-readiness.types';
import { Document } from '../../../../../../shared/components/ospo/documents/documents.types';

@Component({
  selector: 'app-perform-verification-dialog',
  templateUrl: './perform-verification-dialog.component.html',
  styleUrls: ['./perform-verification-dialog.component.scss']
})
export class PerformVerificationDialogComponent implements OnInit {

  dialogForm: FormGroup;

  organizingVerifications = organizingVerifications;
  verifiableMilitaryFormations = verifiableMilitaryFormations;

  @Input() display: boolean;
  @Input() verification: Verification;
  @Output() closeDialog = new EventEmitter<boolean>();

  documents: Document[] = [
    {
      uuid: '14',
      name: 'xxx.img',
      files: [],
    },
    {
      uuid: '25',
      name: 'xxx2.img',
      files: [],
    },
    {
      uuid: '36',
      name: 'xxx3.img',
      files: [],
    },
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.setFormValue();
  }

  setFormValue(): void {
    this.dialogForm = this.formBuilder.group({
      organizingVerification: [
        {organizingVerification: this.verification ? this.verification.organizingVerification : 'Текст пример'},
        [Validators.required]
      ],
      verifiableMilitaryFormation: [ {verifiableMilitaryFormation: this.verification ? this.verification.verifiableMilitaryFormation : 'Сюда нужен текст примера'},
         [Validators.required]
      ],
      plannedDateStart: [ this.verification ? this.verification.plannedDateStart : '14.02.2021', [Validators.required]],
      plannedDateEnd: [this.verification ? this.verification.plannedDateEnd : '22.02.2021', [Validators.required]],
      factualDateStart: [ this.verification ? this.verification.factualDateStart : '15.02.2021', [Validators.required]],
      factualDateEnd: [this.verification ? this.verification.factualDateEnd : '23.02.2021', [Validators.required]],
      nameVerification: [this.verification ? this.verification.nameVerification : 'Текст пример', [Validators.required]],
      result: [this.verification ? this.verification.nameVerification : 'Текст', [Validators.required]],
    });
  }

  get _nameVerification(): AbstractControl {
    return this.dialogForm.get('nameVerification');
  }

  get _reason(): AbstractControl {
    return this.dialogForm.get('reason');
  }

  checkNameVerificationValid(): boolean {
    return (this._nameVerification.invalid && (this._nameVerification.touched || this._nameVerification.dirty));
  }

  checkReason(): boolean {
    return (this._reason.invalid && (this._reason.touched || this._reason.dirty));
  }

  saveVerification(): void {
    console.log('dialogForm::', this.dialogForm.value);
  }

  cancelCreateDialog(): void {
    this.closeDialog.emit(true);
    this.display = false;
  }

}
