import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-informing-dialog',
  templateUrl: './informing-dialog.component.html',
  styleUrls: ['./informing-dialog.component.scss']
})
export class InformingDialogComponent implements OnInit {

  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) { }

  ngOnInit(): void {
  }

}
