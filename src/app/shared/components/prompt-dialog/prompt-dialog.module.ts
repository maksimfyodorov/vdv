import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromptDialogComponent } from './prompt-dialog.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [PromptDialogComponent],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
  ],
})
export class PromptDialogModule { }
