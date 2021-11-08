import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-document-links-list-dialog',
  templateUrl: './document-links-list-dialog.component.html',
  styleUrls: ['./document-links-list-dialog.component.scss']
})
export class DocumentLinksListDialogComponent implements OnInit {

  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) { }

  ngOnInit(): void {
  }

}
