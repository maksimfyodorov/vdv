import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsFormalizedComponent } from './page/documents-formalized.component';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DropdownModule } from 'primeng/dropdown';
import { DocumentDialogComponent } from './components/document-dialog/document-dialog.component';
import { TabViewModule } from 'primeng/tabview';
import { DocumentSettingsComponent } from './components/document-dialog/components/document-settings/document-settings.component';
import { SavedDocumentsComponent } from './components/document-dialog/components/saved-document/saved-documents.component';
import { MenuModule } from 'primeng/menu';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { InputTextModule } from 'primeng/inputtext';
import { DocumentsFormalizedService } from './services/documents-formalized.service';
import { DocumentsModule } from '../documents/documents.module';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { MilitaryModule } from '../../military/military.module';
import { LoaderDirectiveModule } from '@app/shared/directives/loader/loader-directive.module';
import { MilitaryUnitsDropdownFlatModule } from '@app/shared/components/ospo/military-units/military-units-dropdown-flat/military-units-dropdown-flat.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TreeModule } from 'primeng/tree';


@NgModule({
  declarations: [DocumentsFormalizedComponent, DocumentDialogComponent, DocumentSettingsComponent, SavedDocumentsComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ButtonModule,
    OverlayPanelModule,
    DropdownModule,
    TabViewModule,
    MenuModule,
    CalendarModule,
    FormsModule,
    MatExpansionModule,
    InputTextModule,
    DocumentsModule,
    ScrollPanelModule,
    MilitaryModule,
    LoaderDirectiveModule,
    MilitaryUnitsDropdownFlatModule,
    MatSlideToggleModule,
    TreeModule,
  ],
  exports: [
    DocumentsFormalizedComponent,
  ],
  providers: [DocumentsFormalizedService],
})
export class DocumentsFormalizedModule {
}
