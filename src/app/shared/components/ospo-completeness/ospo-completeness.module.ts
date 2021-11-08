import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TreeTableModule } from 'primeng/treetable';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';

import { CompletenessTableComponent } from './components/completeness-table/completeness-table.component';
import { ProgressBarComponent } from './components/completeness-table/components/progress-bar/progress-bar.component';
import { CreateEditPersonnelComponent } from './dialogs/create-edit-personnel/create-edit-personnel.component';
import { ReasonAbsenceComponent } from './dialogs/reason-absence/reason-absence.component';
import { LoaderDirectiveModule } from '../../directives/loader/loader-directive.module';
import { CompletenessTemplatesComponent } from './components/completeness-table/completeness-templates/completeness-templates.component';
import { TooltipModule } from 'primeng/tooltip';
@NgModule({
  declarations: [
    CompletenessTableComponent,
    CreateEditPersonnelComponent,
    ReasonAbsenceComponent,
    ProgressBarComponent,
    CompletenessTemplatesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TreeTableModule,
    ButtonModule,
    CheckboxModule,
    TableModule,
    InputTextModule,
    ProgressBarModule,
    TriStateCheckboxModule,
    InputTextareaModule,
    DropdownModule,
    LoaderDirectiveModule,
    TooltipModule,
  ],
  exports: [CompletenessTableComponent],
})
export class OspoCompletenessModule {}
