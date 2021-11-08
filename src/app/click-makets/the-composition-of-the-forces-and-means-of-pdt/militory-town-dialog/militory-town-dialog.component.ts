import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-militory-town-dialog',
  templateUrl: './militory-town-dialog.component.html',
  styleUrls: ['./militory-town-dialog.component.scss']
})
export class MilitoryTownDialogComponent implements OnInit {

  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) { }

  ngOnInit(): void {
  }

}
