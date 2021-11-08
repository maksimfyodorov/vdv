import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [
    CommonModule,
    ButtonModule,
  ],
})
export class ConfirmationDialogModule { }
