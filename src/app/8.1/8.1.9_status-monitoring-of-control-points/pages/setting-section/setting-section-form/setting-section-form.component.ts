import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { differentShiftNamesValidator } from './different-shift-names-validator.directive';
import { Post } from '../types/setting';

@Component({
  selector: 'app-setting-section-form',
  templateUrl: './setting-section-form.component.html',
  styleUrls: ['./setting-section-form.component.scss']
})
export class SettingSectionFormComponent implements OnInit {
  @Input() formData: Post;
  @Input() formIndex: number;
  @Input() isLoading: boolean;
  @Input() isChangingPostPermitted: boolean;
  @Output() added = new EventEmitter<{ newPostData: Post, formIndex: number }>();
  @Output() updated = new EventEmitter<{ submittedFormValue: Post, formGroup: FormGroup} >();
  @Output() deletedNewPost = new EventEmitter<number>();
  @Output() deletedOldPost = new EventEmitter<string>();

  get shifts(): FormArray {
    return this.form.get('shifts') as FormArray;
  }

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    const {
      uuid: formDataUuid,
      number: formDataNumber,
      atsMo,
      atsR,
      zsSpd,
      msOek,
      zvks,
      shifts
    } = this.formData;

    this.form = this.fb.group({
      uuid: [formDataUuid],
      number: [formDataNumber, Validators.required],
      atsMo: [atsMo],
      atsR: [atsR],
      zsSpd: [zsSpd],
      msOek: [msOek],
      zvks: [zvks],
      shifts: this.fb.array([]),
    }, { validators: differentShiftNamesValidator });


    if (shifts.length === 0) {
      this.addShift();
    } else {
        const shiftsFormGroups = shifts.map(({ uuid, number, days, men }) => this.fb.group({
          uuid: [uuid],
          number: [number, Validators.required],
          days: [days],
          men: [men],
        }));

        shiftsFormGroups.forEach((shiftFormGroup) => this.shifts.push(shiftFormGroup));
    }
  }

  addShift(): void {
    this.shifts.push(this.fb.group({
      number: ['', Validators.required],
    }));
    this.shifts.markAsDirty();
  }

  deleteShift(index): void {
    this.shifts.removeAt(index);
    this.shifts.markAsDirty();
  }

  public deletePost(): void {
    if (this.form.value.uuid) {
      this.deletedOldPost.emit(this.form.value.uuid);
    } else {
      this.deletedNewPost.emit(this.formIndex);
    }
  }

  public onSubmit(): void {
    const submittedFormValue = this.form.value;

    if (submittedFormValue.uuid) {
      this.updated.emit({ submittedFormValue, formGroup: this.form });
    } else {
      this.added.emit({ newPostData: submittedFormValue, formIndex: this.formIndex });
    }
  }
}
