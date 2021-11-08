import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { CoordinatesComponent } from './coordinates/coordinates.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ButtonModule } from 'primeng/button';
import { OlApiService } from '../../../services/ol-api.service';

@NgModule({
  declarations: [CoordinatesComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    ButtonModule,
  ],
  exports: [CoordinatesComponent],
  providers: [
    OlApiService,
  ]
})
export class CoordinatesModule { }
