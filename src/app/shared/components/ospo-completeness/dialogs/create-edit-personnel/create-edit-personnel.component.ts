import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PersonnelService } from './services/personnel.service';

@Component({
  selector: 'app-create-edit-personnel',
  templateUrl: './create-edit-personnel.component.html',
  styleUrls: ['./create-edit-personnel.component.scss'],
  providers: [PersonnelService],
})
export class CreateEditPersonnelComponent implements OnInit {
  form: FormGroup;

  selectedValue: any;
  staffingAppointments: any[];
  staffingRanks: any[];

  get getFormList(): FormArray {
    return this.form.get('list') as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig,
    private personnelService: PersonnelService
  ) {}

  ngOnInit(): void {
    this.selectedValue = this.dialogConfig.data.value;
    this.form = this.formBuilder.group({ list: this.formBuilder.array([]) });
    this.getStaffingOptions();
    this.addPerson();
  }

  addPerson(): void {
    this.getFormList.push(this.createPerson());
  }

  createPerson(): FormGroup {
    return this.formBuilder.group({
      appointment: [null, Validators.required],
      count: [0, [Validators.required, Validators.min(1)]],
      rank: [null, Validators.required],
    });
  }

  removeFormGroup(item: any): void {
    const index = this.getFormList.controls.indexOf(item);
    this.getFormList.removeAt(index);
  }

  submit(): void {
    const formValues = this.getFormList.value.map((person) => {
      return {
        appointment: person.appointment,
        count: person.count,
        rank: { uuid: person.rank.uuid, name: person.rank.name },
      };
    });

    this.dialogRef.close(formValues);
  }

  closeDialog(): void {
    this.getFormList.reset();
    this.dialogRef.close();
  }

  private getStaffingOptions(): void {
    this.personnelService.getStaffingSelectors().subscribe((response) => {
      this.staffingAppointments = response.appointments;
      this.staffingRanks =
        this.selectedValue.node.point === 'security'
          ? response.ranks.filter((rank) => rank.category.name === this.selectedValue.node.name)
          : response.ranks;
    });
  }
}
