import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseTimeComponent } from './choose-time/choose-time.component';
import { TimeInputComponent } from './time-input/time-input.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';



@NgModule({
  declarations: [
    ChooseTimeComponent,
    TimeInputComponent,
  ],
  imports: [
    CommonModule,
    OverlayPanelModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  exports: [
    TimeInputComponent,
    ChooseTimeComponent,
  ]
})
export class OspoTimeModule { }
