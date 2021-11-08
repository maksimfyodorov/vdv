import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-report-back-dialog',
  templateUrl: './report-back-dialog.component.html',
  styleUrls: ['./report-back-dialog.component.scss']
})
export class ReportBackDialogComponent implements OnInit {

  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) { }

  ngOnInit(): void {
  }

}
