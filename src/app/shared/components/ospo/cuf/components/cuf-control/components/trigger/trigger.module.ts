import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TriggerComponent } from './trigger.component';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [TriggerComponent],
  imports: [
    CommonModule,
    CheckboxModule,
    ButtonModule,
    DropdownModule,
    ReactiveFormsModule,
  ],
  exports: [
    TriggerComponent,
  ],
})
export class TriggerModule { }
