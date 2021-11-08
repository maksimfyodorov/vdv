import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  TechItem,
  TechSettingsItem,
} from '../../../../../../../../shared/components/ospo/ospo-security/types/security.types';
import { SecurityService } from '../../services/security.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-tech',
  templateUrl: './add-tech.component.html',
  styleUrls: ['./add-tech.component.scss'],
})
export class AddTechComponent implements OnInit {
  public techItems: TechSettingsItem[] = [];
  public itemsForAutoComplete: TechItem[] = [];

  public formArray: FormArray;

  constructor(
    private dialogRef: DynamicDialogRef,
    private securityService: SecurityService,
  ) {
  }

  ngOnInit(): void {
    this.getItems();
    this.formArray = this.createFormArray();
  }

  public createItem(): void {
    this.formArray.push(this.createFormGroup());
  }

  public deleteItem($event: FormGroup): void {
    this.formArray.removeAt(this.formArray.controls.indexOf($event));
  }

  public save(): void {
    this.dialogRef.close(this.formArray.value);
  }

  public close(): void {
    this.dialogRef.close();
  }

  public techChanged($event: FormGroup): void {
    const indexChangedFormGroup = this.formArray.controls.indexOf($event);
    this.formArray.controls[indexChangedFormGroup].patchValue($event.value);
  }

  private getItems(): void {
    this.securityService.getTechItems().subscribe(res => {
      this.itemsForAutoComplete = res;
    });
  }

  private createFormArray(): FormArray {
    return new FormArray([]);
  }

  private createFormGroup(): FormGroup {
    return new FormGroup({
      uuid: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      count: new FormControl(1, [Validators.min(1), Validators.required]),
    });
  }
}
