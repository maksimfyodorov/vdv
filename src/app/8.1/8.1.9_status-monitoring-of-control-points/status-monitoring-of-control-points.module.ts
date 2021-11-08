import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusMonitoringOfControlPointsRoutingModule } from './status-monitoring-of-control-points-routing.module';
import { SmocpComponent } from './status-monitoring-of-control-points/smocp.component';
import { NodesHierarchyModule } from '../../shared/components/nodes-hierarchy/nodes-hierarchy.module';
import { UavInformationModule } from '../8.1.4_uav-information/uav-information.module';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { StabilitySectionComponent } from './pages/stability-section/stability-section.component';
import { TableModule } from 'primeng/table';
import { SettingSectionComponent } from './pages/setting-section/setting-section.component';
import { DoubleInputModule } from '../../shared/components/double-input/double-input.module';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { IntercessionScheduleComponent } from './pages/intercession-schedule/intercession-schedule.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';
import { PostsScheduleComponent } from './pages/intercession-schedule/posts-schedule/posts-schedule.component';
import { JournalComponent } from './pages/journal/journal.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TolerancesComponent } from './pages/tolerances/tolerances.component';
import { CompletnessComponent } from './pages/completness/completness.component';
import { SettingSectionFormComponent } from './pages/setting-section/setting-section-form/setting-section-form.component';
import { DifferentShiftNamesValidatorDirective } from './pages/setting-section/setting-section-form/different-shift-names-validator.directive';
import { MilitaryManEditDialogComponent } from './pages/dialogs/military-man-edit-dialog/military-man-edit-dialog.component';
import { OspoCompletenessModule } from '../../shared/components/ospo-completeness/ospo-completeness.module';
import { CommunicationNodesModule } from '../8.1.6_communication-nodes/communication-nodes.module';
import { DocumentsFormalizedModule } from '../../shared/components/ospo/documents-formalized/documents-formalized.module';
import { MonthCalendarComponent } from './pages/intercession-schedule/month-calendar/month-calendar.component';

@NgModule({
  declarations: [SmocpComponent, StabilitySectionComponent, MonthCalendarComponent, SettingSectionComponent, IntercessionScheduleComponent, PostsScheduleComponent, JournalComponent, TolerancesComponent, CompletnessComponent, SettingSectionFormComponent, DifferentShiftNamesValidatorDirective, MilitaryManEditDialogComponent],
  imports: [
    CommonModule,
    StatusMonitoringOfControlPointsRoutingModule,
    NodesHierarchyModule,
    UavInformationModule,
    TabViewModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    TableModule,
    DoubleInputModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    InputNumberModule,
    ReactiveFormsModule,
    InputTextareaModule,
    OspoCompletenessModule,
    CommunicationNodesModule,
    DocumentsFormalizedModule,
    TooltipModule,
  ],
})
export class StatusMonitoringOfControlPointsModule {
}
