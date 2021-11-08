import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { militaryMen } from '../../intercession-schedule/posts-schedule/mock';

@Component({
  selector: 'app-military-man-edit-dialog',
  templateUrl: './military-man-edit-dialog.component.html',
  styleUrls: ['./military-man-edit-dialog.component.scss'],
})
export class MilitaryManEditDialogComponent implements OnInit {

  selectedMilitaryMan;
  militaryMen;

  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {
  }

  ngOnInit(): void {
    this.militaryMen = this.config.data.allMilitaryMen;
  }

  selectMilitaryMan(militaryMan): void {
    this.selectedMilitaryMan = militaryMan;
    this.closeDialog();
  }

  closeDialog(): void {
    console.log(this.selectedMilitaryMan);
    this.dialogRef.close(this.selectedMilitaryMan);
  }

}
