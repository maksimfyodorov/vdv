import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-delete-period-error',
  templateUrl: './delete-period-error.component.html',
  styleUrls: ['./delete-period-error.component.scss'],
})
export class DeletePeriodErrorComponent implements OnInit {

  constructor(private dialogRef: DynamicDialogRef) {
  }

  ngOnInit(): void {
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
