import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunicationNodesRoutingModule } from './communication-nodes-routing.module';
import { CommunicationNodesComponent } from './pages/communication-nodes.component';
import { BreadcrumbsModule } from '../../shared/components/breadcrumbs/breadcrumbs.module';
import { TabViewModule } from 'primeng/tabview';
import { NodesSchemeComponent } from './tabs/azimuth-scheme/components/nodes-scheme/nodes-scheme.component';
import { ButtonModule } from 'primeng/button';
import { CreateEditViewNodeDialogComponent } from './tabs/azimuth-scheme/components/dialogs/node/create-edit-view-node-dialog/create-edit-view-node-dialog.component';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { NodesSchemeService } from './tabs/azimuth-scheme/components/nodes-scheme/services/nodes-scheme.service';
import { ProgressBarModule } from 'primeng/progressbar';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { LoaderDirectiveModule } from '../../shared/directives/loader/loader-directive.module';
import { CreateEditChannelDialogComponent } from './tabs/azimuth-scheme/components/dialogs/channel/create-edit-channel-dialog/create-edit-channel-dialog.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CreateEditDirectionDialogComponent } from './tabs/azimuth-scheme/components/dialogs/direction/create-edit-direction-dialog/create-edit-direction-dialog.component';
import { EditableAutocompleteModule } from '../../shared/components/editable-autocomplete/editable-autocomplete.module';
import { PromptDialogModule } from '../../shared/components/prompt-dialog/prompt-dialog.module';
import { UesModule } from 'ues_ui';
import { UnitMapViewComponent } from './tabs/azimuth-scheme/components/map-view/unit-map-view/unit-map-view.component';
import { OlApiService } from '../../shared/services/ol-api.service';
import { RooService } from '../../shared/services/roo.service';
import { DirectionMapViewComponent } from './tabs/azimuth-scheme/components/map-view/direction-map-view/direction-map-view.component';
import { NodeInfoDialogComponent } from './tabs/azimuth-scheme/components/dialogs/node-info-dialog/node-info-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AzimuthSchemeComponent } from './tabs/azimuth-scheme/azimuth-scheme.component';
import { CommunicationCenterComponent } from './tabs/communication-center/communication-center.component';
import { NodesComponent } from './tabs/communication-center/tabs/nodes/nodes.component';
import { CommunicationNodesService } from './tabs/communication-center/services/communication-nodes.service';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { AccordionModule } from 'primeng/accordion';
import { TreeTableModule } from 'primeng/treetable';
import { BattlePostComponent } from './tabs/communication-center/tabs/nodes/dialogs/battle-post/battle-post.component';
import { DocumentsModule } from '../../shared/components/ospo/documents/documents.module';
import { NodesHierarchyModule } from '../../shared/components/nodes-hierarchy/nodes-hierarchy.module';
import { HierarchyFolderComponent } from './tabs/azimuth-scheme/components/hierarchy-folder/hierarchy-folder.component';
import { OspoCoordinatesModule } from '../../shared/components/ospo/ospo-coordinates/ospo-coordinates.module';
import { USCenterComponent } from './tabs/communication-center/tabs/nodes/dialogs/us-center/us-center.component';
import { CoordinatesDialogService } from '../../shared/components/ospo/ospo-coordinates/services/coordinates-dialog.service';
import { MatDialogWrapModule } from '../../shared/components/mat-dialog-wrap/mat-dialog-wrap.module';
import { DirectionInfoDialogComponent } from './tabs/azimuth-scheme/components/dialogs/direction-info-dialog/direction-info-dialog.component';
import { InputMaskModule } from 'primeng/inputmask';
import { OspoSecurityModule } from '../../shared/components/ospo/ospo-security/ospo-security.module';
import { MilitaryUnitsDropdownModule } from '../../shared/components/ospo/military-units/military-units-dropdown/military-units-dropdown.module';
import { BattlePostsMapViewComponent } from './tabs/azimuth-scheme/components/map-view/battle-posts-map-view/battle-posts-map-view.component';
import { SecurityComponent } from './tabs/communication-center/tabs/security/page/security.component';
import { OspoHierarchyFolderComponent } from './tabs/communication-center/tabs/security/components/hierarchy-folder/ospo-hierarchy-folder.component';
import { CompletenessComponent } from './tabs/communication-center/tabs/completeness/completeness.component';
import { OspoCompletenessModule } from '../../shared/components/ospo-completeness/ospo-completeness.module';
import { AddTechComponent } from './tabs/communication-center/tabs/security/dialogs/add-tech/add-tech.component';
import { EditTechComponent } from './tabs/communication-center/tabs/security/dialogs/edit-tech/edit-tech.component';
import { TechSettingsItemComponent } from './tabs/communication-center/tabs/security/components/tech-settings-item/tech-settings-item.component';
import { PeriodModule } from '../../shared/components/ports/ports.module';
import { SecurityPortsComponent } from './tabs/communication-center/tabs/security/components/security-ports/security-ports.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DocumentsFormalizedModule } from '../../shared/components/ospo/documents-formalized/documents-formalized.module';
import { TabMenuModule } from 'primeng/tabmenu';
import { RepairFormComponent } from './tabs/communication-center/tabs/security/dialogs/edit-tech/repair-form/repair-form.component';

@NgModule({
  declarations: [
    CommunicationNodesComponent,
    NodesSchemeComponent,
    CreateEditViewNodeDialogComponent,
    CreateEditChannelDialogComponent,
    CreateEditDirectionDialogComponent,
    UnitMapViewComponent,
    DirectionMapViewComponent,
    NodeInfoDialogComponent,
    AzimuthSchemeComponent,
    CommunicationCenterComponent,
    NodesComponent,
    BattlePostComponent,
    HierarchyFolderComponent,
    USCenterComponent,
    DirectionInfoDialogComponent,
    BattlePostsMapViewComponent,
    SecurityComponent,
    OspoHierarchyFolderComponent,
    CompletenessComponent,
    AddTechComponent,
    EditTechComponent,
    TechSettingsItemComponent,
    SecurityPortsComponent,
    RepairFormComponent,
  ],
  imports: [
    CommonModule,
    CommunicationNodesRoutingModule,
    BreadcrumbsModule,
    MatDialogModule,
    TabViewModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    RadioButtonModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule,
    ProgressBarModule,
    ScrollPanelModule,
    LoaderDirectiveModule,
    InputTextareaModule,
    EditableAutocompleteModule,
    PromptDialogModule,
    UesModule,
    TableModule,
    MultiSelectModule,
    MatDialogModule,
    AccordionModule,
    TreeTableModule,
    DocumentsModule,
    NodesHierarchyModule,
    OspoCoordinatesModule,
    MatDialogWrapModule,
    InputMaskModule,
    OspoSecurityModule,
    MilitaryUnitsDropdownModule,
    PeriodModule,
    InputSwitchModule,
    OspoCompletenessModule,
    DocumentsFormalizedModule,
    TabMenuModule,
  ],
  providers: [
    DialogService,
    NodesSchemeService,
    OlApiService,
    RooService,
    CommunicationNodesService,
    CoordinatesDialogService,
  ],
  exports: [
    OspoHierarchyFolderComponent,
  ],
})
export class CommunicationNodesModule {
}
