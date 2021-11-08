import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RoutingVideoMonitoringModule } from './routing-video-monitoring.module';
import { VideoMonitoringPageComponent } from './pages/video-monitoring-page/video-monitoring-page.component';

import { NodesHierarchyModule } from '../../shared/components/nodes-hierarchy/nodes-hierarchy.module';

import { SelectionTreeService } from '../../8.1/8.1.4_uav-information/components/uav-node-folder/services/selection-tree.service';
import { HttpApiService } from '../../8.1/8.1.4_uav-information/services/api.service';

import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';

import { VideoMonitoringService } from './pages/video-monitoring-page/services/video-monitoring.service';
import { VideoSettingsComponent } from './pages/video-monitoring-page/components/video-settings/video-settings.component';
import { MonitoringNodeFolderComponent } from './pages/video-monitoring-page/components/monitoring-node-folder/monitoring-node-folder.component';
import { SelectButtonsComponent } from './pages/video-monitoring-page/components/select-buttons/select-buttons.component';
import { ContextMenuComponent } from './pages/video-monitoring-page/components/context-menu/context-menu.component';
import { EquipmentCharacteristicsComponent } from './pages/video-monitoring-page/components/video-settings/tabs/equipment-characteristics/equipment-characteristics.component';
import { EditorComponent } from './pages/video-monitoring-page/components/editor/editor.component';
import { DocumentsFormalizedModule } from '../../shared/components/ospo/documents-formalized/documents-formalized.module';
import { CufModule } from '../../shared/components/ospo/cuf/cuf.module';
import { LoaderDirectiveModule } from '../../shared/directives/loader/loader-directive.module';

@NgModule({
  declarations: [
    VideoSettingsComponent,
    EditorComponent,
    MonitoringNodeFolderComponent,
    VideoMonitoringPageComponent,
    SelectButtonsComponent,
    ContextMenuComponent,
    EquipmentCharacteristicsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingVideoMonitoringModule,
    CalendarModule,
    SelectButtonModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    InputTextareaModule,
    RadioButtonModule,
    DialogModule,
    DropdownModule,
    NodesHierarchyModule,
    ConfirmPopupModule,
    DocumentsFormalizedModule,
    CufModule,
    LoaderDirectiveModule,
  ],
  providers: [VideoMonitoringService, SelectionTreeService, HttpApiService, ConfirmationService],
})
export class VideoMonitoringModule {}
