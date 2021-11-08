import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReportsDialogComponent } from './reports-dialog/reports-dialog.component';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
@NgModule({
  declarations: [ReportsDialogComponent],
  imports: [
    CommonModule,
    TableModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
  ],
  exports: [
    ReportsDialogComponent,
  ],
})
export class ReportsDialogModule { }
