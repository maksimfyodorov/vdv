import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CufComponent } from './cuf.component';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ManualControlComponent } from './components/manual-control/manual-control.component';
import { CufControlComponent } from './components/cuf-control/cuf-control.component';
import { DropdownModule } from 'primeng/dropdown';
import { PeriodModule } from '../../period/period.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { CheckboxModule } from 'primeng/checkbox';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TriggerModule } from './components/cuf-control/components/trigger/trigger.module';
import { LoaderDirectiveModule } from '../../../directives/loader/loader-directive.module';
import { LoaderService } from '../../loader/loader.service';
import { CufService } from './services/cuf.service';



@NgModule({
  declarations: [CufComponent, ManualControlComponent, CufControlComponent],
  exports: [
    CufComponent,
  ],
  imports: [
    CommonModule,
    TabViewModule,
    TableModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    InputTextareaModule,
    RadioButtonModule,
    DropdownModule,
    PeriodModule,
    ReactiveFormsModule,
    MatExpansionModule,
    CheckboxModule,
    ScrollPanelModule,
    TriggerModule,
    LoaderDirectiveModule,
  ],
  providers: [LoaderService, CufService],
})
export class CufModule { }
