import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-plan-create',
  templateUrl: './plan-create.component.html',
  styleUrls: ['./plan-create.component.scss']
})
export class PlanCreateComponent implements OnInit {

  public planName: string;

  constructor(
    private dialogRef: DynamicDialogRef,
  ) { }

  public ngOnInit(): void {
  }

  public closeDialog(): void {
    this.dialogRef.close(this.planName);
  }

}
