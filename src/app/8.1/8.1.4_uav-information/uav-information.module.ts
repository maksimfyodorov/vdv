import { Host, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UavInformationRoutingModule } from './uav-information-routing.module';
import { UavInformationComponent } from './uav-information/uav-information.component';
import { NodesHierarchyModule } from '../../shared/components/nodes-hierarchy/nodes-hierarchy.module';
import { UavNodeFolderComponent } from './components/uav-node-folder/uav-node-folder.component';
import { TabViewModule } from 'primeng/tabview';
import { BreadcrumbsModule } from '../../shared/components/breadcrumbs/breadcrumbs.module';
import { FlightPlansComponent } from './components/flight-plans/flight-plans.component';
import { UavStateComponent } from './components/uav-state/uav-state.component';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { UesModule } from 'ues_ui';
import { OlMapInitModule } from '../../shared/components/map/ol-map-init/ol-map-init.module';
import { TaskModalComponent } from './modals/task-modal/task-modal.component';
import {
  PlanModalIntelligenceComponent,
  PlanModalIntelligenceDisableComponent,
  PlanModalIntelligenceEditComponent,
} from './modals/task-modal/components/plan-modal-tabs/plan-modal-intelligence/plan-modal-intelligence.component';
import {
  PlanModalParametersComponent,
  PlanModalParametersDisableComponent,
  PlanModalParametersEditComponent,
} from './modals/task-modal/components/plan-modal-tabs/plan-modal-parameters/plan-modal-parameters.component';
import {
  PlanModalTrackPointsComponent,
  PlanModalTrackPointsDisableComponent,
  PlanModalTrackPointsEditComponent,
} from './modals/task-modal/components/plan-modal-tabs/plan-modal-track-points/plan-modal-track-points.component';
import {
  PlanModalReportComponent,
  PlanModalReportDisableComponent,
  PlanModalReportEditComponent,
} from './modals/task-modal/components/plan-modal-tabs/plan-modal-report/plan-modal-report.component';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MarkDataService } from '../../shared/components/ospo/ospo-coordinates/services/mark-data.service';
import { CoordinatesDialogService } from '../../shared/components/ospo/ospo-coordinates/services/coordinates-dialog.service';
import { OlApiService } from '../../shared/services/ol-api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { MarksComponent } from './components/flight-plans/components/map/marks/marks.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ApiService } from '../../shared/components/ospo/ospo-coordinates/services/api.service';
import { MapService } from './components/flight-plans/components/map/services/map.service';
import { DocumentsModule } from '../../shared/components/ospo/documents/documents.module';
import { InputDelayModule } from '../../shared/directives/input-delay/input-delay.module';
import { LoaderDirectiveModule } from '../../shared/directives/loader/loader-directive.module';
import { DirectiveModule } from './directives/directive.module';
import { OspoSecurityModule } from '../../shared/components/ospo/ospo-security/ospo-security.module';
import { FlightPlansDialogService } from './components/flight-plans/services/flight-plans-dialog.service';
import { SelectionTreeService } from './components/uav-node-folder/services/selection-tree.service';
import { HttpApiService } from './services/api.service';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DocumentsFormalizedModule } from '../../shared/components/ospo/documents-formalized/documents-formalized.module';
import { SearchSideBarComponent } from './components/flight-plans/components/search-side-bar/search-side-bar.component';
import { NgIfEmitterModuleModule } from '@app/shared/directives/ng-if-emitter/ng-if-emitter-module.module';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoaderModule } from '@app/shared/components/loader/loader.module';
import { PlanComponent } from './components/flight-plans/components/plan/plan.component';

@NgModule({
  declarations: [
    UavInformationComponent,
    UavNodeFolderComponent,
    FlightPlansComponent,
    UavStateComponent,
    TaskModalComponent,
    PlanModalIntelligenceComponent,
    PlanModalParametersComponent,
    PlanModalTrackPointsComponent,
    PlanModalReportComponent,
    PlanModalIntelligenceEditComponent,
    PlanModalParametersEditComponent,
    PlanModalReportEditComponent,
    PlanModalTrackPointsEditComponent,
    PlanModalIntelligenceDisableComponent,
    PlanModalParametersDisableComponent,
    PlanModalReportDisableComponent,
    PlanModalTrackPointsDisableComponent,
    MarksComponent,
    SearchSideBarComponent,
    PlanComponent,
  ],
            imports: [
              CommonModule,
              UavInformationRoutingModule,
              NodesHierarchyModule,
              TabViewModule,
              BreadcrumbsModule,
              InputTextModule,
              DropdownModule,
              ButtonModule,
              UesModule,
              OlMapInitModule,
              CalendarModule,
              InputTextareaModule,
              ReactiveFormsModule,
              ScrollPanelModule,
              ConfirmDialogModule,
              DocumentsModule,
              InputDelayModule,
              LoaderDirectiveModule,
              DirectiveModule,
              OspoSecurityModule,
              InputSwitchModule,
              DocumentsFormalizedModule,
              NgIfEmitterModuleModule,
              ProgressBarModule,
              ProgressSpinnerModule,
              LoaderModule,
            ],
  exports: [
    UavNodeFolderComponent,
  ],
  providers: [
    MarkDataService,
    CoordinatesDialogService,
    OlApiService,
    ApiService,
    MapService,
    FlightPlansDialogService,
    HttpApiService,
  ],
})
export class UavInformationModule {
}
