import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MilitaryComponent } from './military.component';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectMilitaryMenComponent } from './dialogs/select-military-men/select-military-men.component';
import { RippleModule } from 'primeng/ripple';
import { LoaderDirectiveModule } from '../../directives/loader/loader-directive.module';
import { ExecutiveComponent } from './dialogs/select-shdk/shdk/executive.component';
import { ExecutiveService } from './dialogs/select-shdk/services/executive.service';

@NgModule({
  declarations: [
    MilitaryComponent,
    SelectMilitaryMenComponent,
    ExecutiveComponent,
  ],
  exports: [MilitaryComponent],
  imports: [
    CommonModule,
    DropdownModule,
    DynamicDialogModule,
    InputTextModule,
    TableModule,
    ButtonModule,
    RippleModule,
    LoaderDirectiveModule,
  ],
  providers: [
    ExecutiveService,
  ]
})
export class MilitaryModule { }
