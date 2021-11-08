import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangeDataPickerComponent } from './range-data-picker.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [RangeDataPickerComponent],
  imports: [CommonModule, ReactiveFormsModule, CalendarModule],
  exports: [RangeDataPickerComponent],
})
export class RangeDataPickerModule {}
