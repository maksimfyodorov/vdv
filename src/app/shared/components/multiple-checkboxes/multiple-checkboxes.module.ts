import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultipleCheckboxesComponent } from './multiple-checkboxes.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MultipleCheckboxesComponent],
  imports: [CommonModule, CheckboxModule, FormsModule],
  exports: [MultipleCheckboxesComponent],
})
export class MultipleCheckboxesModule { }
