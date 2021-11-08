import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoldierLengthFormComponent } from './soldier-length-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SoldierLengthFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    SoldierLengthFormComponent
  ]
})
export class SoldiersModule { }
