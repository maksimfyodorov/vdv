import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-create-edit-informing-dialog',
  templateUrl: './create-edit-informing-dialog.component.html',
  styleUrls: ['./create-edit-informing-dialog.component.scss']
})
export class CreateEditInformingDialogComponent implements OnInit {

  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) { }

  ngOnInit(): void {
  }
}
