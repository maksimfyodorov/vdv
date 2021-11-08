import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-dialog-wrap',
  templateUrl: './mat-dialog-wrap.component.html',
  styleUrls: ['./mat-dialog-wrap.component.scss']
})
export class MatDialogWrapComponent implements OnInit {

  constructor(
    private matDialogRef: MatDialogRef<unknown>,
  ) { }

  ngOnInit(): void {

  }

  public closeDialog(): void {
    this.matDialogRef.close(false);
  }
}
