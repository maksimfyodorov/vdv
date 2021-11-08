import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-delete-type-error',
  templateUrl: './delete-type-error.component.html',
  styleUrls: ['./delete-type-error.component.scss']
})
export class DeleteTypeErrorComponent implements OnInit {

  constructor(private dialogRef: DynamicDialogRef,) { }

  ngOnInit(): void {
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
