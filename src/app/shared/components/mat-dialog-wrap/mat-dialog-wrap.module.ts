import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogWrapComponent } from './component/mat-dialog-wrap.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    MatDialogWrapComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    DragDropModule,
  ],
  exports: [
    MatDialogWrapComponent,
  ],
})
export class MatDialogWrapModule { }
