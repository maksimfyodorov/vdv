import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-doki-dialog',
  templateUrl: './doki-dialog.component.html',
  styleUrls: ['./doki-dialog.component.scss']
})
export class DokiDialogComponent implements OnInit {

  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) { }

  ngOnInit(): void {
  }

}
