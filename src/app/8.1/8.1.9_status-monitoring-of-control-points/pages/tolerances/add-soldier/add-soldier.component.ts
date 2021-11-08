import { Component, OnInit } from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import { shiftPositionsMock, soldierNamesMock, tolerancesMock } from '../types/mock';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-soldier',
  templateUrl: './add-soldier.component.html',
  styleUrls: ['./add-soldier.component.scss']
})
export class AddSoldierComponent implements OnInit {
  shiftPositions = shiftPositionsMock;
  soldierNames = soldierNamesMock;
  data = tolerancesMock;
  public form: FormGroup;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.fb.group({
      shiftPosition: [null, Validators.required],
      soldierName: [null, Validators.required],
      shiftAdmission: [null, Validators.required],
    });
  }

  closeDialog(): void {
    this.ref.close();
  }

  addSoldier() {
    this.ref.close(this.form.value);
  }

}
