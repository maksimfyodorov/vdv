import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {

  public message: string;
  public acceptIcon: string;
  public reject: string;
  public accept: string;


  constructor(
    public dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {
    this.message = config.data?.message;
    this.acceptIcon = config.data?.acceptIcon || '';
    this.reject = config.data?.reject || 'Нет';
    this.accept = config.data?.accept || 'Да';
  }

  public rejectDialog(): void {
    this.dialogRef.close();
  }

  public acceptDialog(): void {
    this.dialogRef.close(true);
  }
}

