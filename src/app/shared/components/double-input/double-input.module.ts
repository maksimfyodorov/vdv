import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoubleInputComponent } from './double-input.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [DoubleInputComponent],
  exports: [
    DoubleInputComponent,
  ],
  imports: [
    CommonModule,
    InputNumberModule,
    FormsModule,
  ],
})
export class DoubleInputModule { }
