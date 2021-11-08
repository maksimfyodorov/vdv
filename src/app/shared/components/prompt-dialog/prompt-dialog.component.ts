import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-prompt-dialog',
  templateUrl: './prompt-dialog.component.html',
  styleUrls: ['./prompt-dialog.component.scss']
})
export class PromptDialogComponent {
  public value = '';

  constructor(
    private dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {
    this.value = config.data;
  }

  public save(): void {
    this.dialogRef.close(this.value);
  }

  public close(): void {
    this.dialogRef.close();
  }
}
