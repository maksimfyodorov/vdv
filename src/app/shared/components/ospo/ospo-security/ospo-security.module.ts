import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditableAutocompleteModule } from '../../editable-autocomplete/editable-autocomplete.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CufModule } from '../cuf/cuf.module';
import { DocumentsModule } from '../documents/documents.module';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { NodesHierarchyModule } from '../../nodes-hierarchy/nodes-hierarchy.module';
import { MilitaryUnitsSidebarModule } from '../military-units/military-units-sidebar/military-units-sidebar.module';
import { SecurityTableComponent } from './components/security-table/security-table.component';
import { TreeTableModule } from 'primeng/treetable';
import { CheckboxModule } from 'primeng/checkbox';
import { ProgressBarModule } from 'primeng/progressbar';
import { LoaderDirectiveModule } from '../../../directives/loader/loader-directive.module';
import { PeriodModule } from '../../ports/ports.module';
import { SecurityTableTemplatesComponent } from './components/security-table/components/security-table-templates/security-table-templates.component';

@NgModule({
  declarations: [SecurityTableComponent, SecurityTableTemplatesComponent],
  imports: [
    CommonModule,
    ButtonModule,
    EditableAutocompleteModule,
    FormsModule,
    InputTextModule,
    ScrollPanelModule,
    CufModule,
    DocumentsModule,
    InputTextareaModule,
    PeriodModule,
    NodesHierarchyModule,
    MilitaryUnitsSidebarModule,
    TreeTableModule,
    CheckboxModule,
    ProgressBarModule,
    LoaderDirectiveModule,
    ReactiveFormsModule,
  ],
  exports: [ButtonModule, InputTextModule, SecurityTableComponent],
})
export class OspoSecurityModule {}
