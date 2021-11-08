import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachDocumentDialogComponent } from './attach-document-dialog.component';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocumentEditComponent } from './document/document-edit.component';
import { DocumentViewComponent } from './document/document-view.component';
import { DocumentCreateComponent } from './document/document-create.component';
import { AttachDocumentDialogService } from './attach-document-dialog.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { LoaderService } from '../../../loader/loader.service';
import { LoaderDirectiveModule } from '../../../../directives/loader/loader-directive.module';
import { EditableAutocompleteModule } from '../../../editable-autocomplete/editable-autocomplete.module';
import { MilitaryUnitDropdownComponent } from './document/components/military-unit-dropdown/military-unit-dropdown.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { UploadFilesComponent } from './document/components/upload-files/upload-files.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { DeleteTypeErrorComponent } from './document/components/delete-type-error/delete-type-error.component';
import { MilitaryUnitsDropdownFlatModule } from '../../military-units/military-units-dropdown-flat/military-units-dropdown-flat.module';


@NgModule({
  declarations: [
    AttachDocumentDialogComponent,
    DocumentEditComponent,
    DocumentViewComponent,
    DocumentCreateComponent,
    MilitaryUnitDropdownComponent,
    UploadFilesComponent,
    DeleteTypeErrorComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    TableModule,
    CalendarModule,
    AccordionModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextareaModule,
    ScrollPanelModule,
    LoaderDirectiveModule,
    EditableAutocompleteModule,
    CommonModule,
    NgxDropzoneModule,
    AccordionModule,
    ButtonModule,
    MatExpansionModule,
    MilitaryUnitsDropdownFlatModule,
  ],
  providers: [AttachDocumentDialogService, LoaderService],
})
export class AttachDocumentDialogModule {
}
