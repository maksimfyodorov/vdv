import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RangeDate } from './date-picker.types';

@Component({
  selector: 'app-range-data-picker',
  templateUrl: './range-data-picker.component.html',
  styleUrls: ['./range-data-picker.component.scss'],
})
export class RangeDataPickerComponent implements OnInit{
  @Input() importedDateValues: {max: Date, min: Date, defaultDate: Date};
  @Output() private datePicked: EventEmitter<RangeDate> = new EventEmitter<RangeDate>();
  public dateForm: FormGroup;
  constructor() {
  }

  ngOnInit(): void {
    this.dateForm = new FormGroup({
      from: new FormControl(this.importedDateValues.defaultDate),
      to: new FormControl(this.importedDateValues.defaultDate),
    });
  }

  public valueChanges(): void {
    this.datePicked.emit(this.dateForm.value);
  }
}
