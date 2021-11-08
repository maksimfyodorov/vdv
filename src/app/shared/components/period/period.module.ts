import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeriodComponent } from './period.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [PeriodComponent],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    InputMaskModule,
    ReactiveFormsModule,
    ButtonModule,
    InputNumberModule,
  ],
  exports: [
    PeriodComponent,
  ],
})
export class PeriodModule {
}
