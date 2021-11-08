import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DesantEventsRoutingModule} from './desant-events-routing.module';
import {DesantEventsComponent} from './components/desant-events.component';
import {DesantEventsMainComponent} from './components/desant-events-main/desant-events-main.component';
import {CreateAndModifyingEventComponent} from './components/create-and-modifying-event/create-and-modifying-event.component';
import {FilterDesantEventsComponent} from './components/desant-events-main/filter-desant-events/filter-desant-events.component';
import {DesantEventCardComponent} from './components/desant-events-main/desant-event-card/desant-event-card.component';
import {GeneralEventInfoComponent} from './components/create-and-modifying-event/components/general-event-info/general-event-info.component';
import {DesantEventStaffComponent} from './components/create-and-modifying-event/components/desant-event-staff/desant-event-staff.component';
import {NewEventCardComponent} from './components/create-and-modifying-event/new-event-card/new-event-card.component';
import {NewStaffTaskDialogComponent} from './components/create-and-modifying-event/components/desant-event-staff/dialogs/new-staff-task-dialog/new-staff-task-dialog.component';
import {SelectDesantSubdivisionComponent} from './components/create-and-modifying-event/components/desant-event-staff/dialogs/select-desant-subdivision/select-desant-subdivision.component';
import {NewStaffSubtaskDialogComponent} from './components/create-and-modifying-event/components/desant-event-staff/dialogs/new-staff-subtask-dialog/new-staff-subtask-dialog.component';
import {SelectDesantSubdivisionSubtaskComponent} from './components/create-and-modifying-event/components/desant-event-staff/dialogs/select-desant-subdivision-substask/select-desant-subdivision-subtask.component';
import {StaffTaskProgressDialogComponent} from './components/create-and-modifying-event/components/desant-event-staff/dialogs/staff-task-progress-dialog/staff-task-progress-dialog.component';
import {VvstParachuteSystemComponent} from './components/create-and-modifying-event/components/desant-event-staff/dialogs/vvst-parachute-system/vvst-parachute-system.component';
import {ReportDesantSubdivisionComponent} from './components/create-and-modifying-event/components/desant-event-staff/dialogs/report-desant-subdivision/report-desant-subdivision.component';
import {InputNumberModule} from 'primeng/inputnumber';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MilitaryUnitsSidebarModule} from '../../../shared/components/ospo/military-units/military-units-sidebar/military-units-sidebar.module';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {RippleModule} from 'primeng/ripple';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {BadgeModule} from 'primeng/badge';
import {DocumentsFormalizedModule} from '../../../shared/components/ospo/documents-formalized/documents-formalized.module';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ReportsDialogModule} from '../../../shared/components/ospo/reports-dialog/reports-dialog.module';
import {DocumentsModule} from '../../../shared/components/ospo/documents/documents.module';
import {CheckboxModule} from 'primeng/checkbox';
import {InputSwitchModule} from 'primeng/inputswitch';
import {MilitaryModule} from '../../../shared/components/military/military.module';
import {OspoCoordinatesModule} from '../../../shared/components/ospo/ospo-coordinates/ospo-coordinates.module';
import {CoordinatesModule} from '../../../shared/components/ospo/coordinates/coordinates.module';
import {RadioButtonModule} from 'primeng/radiobutton';
import {StepsModule} from 'primeng/steps';
import {OspoCompletenessModule} from '../../../shared/components/ospo-completeness/ospo-completeness.module';
import {OspoSecurityModule} from '../../../shared/components/ospo/ospo-security/ospo-security.module';
import {LoaderDirectiveModule} from '../../../shared/directives/loader/loader-directive.module';
import {PaginatorModule} from 'primeng/paginator';
import {TabMenuModule} from 'primeng/tabmenu';
import {TabViewModule} from 'primeng/tabview';
import { TechEventComponent } from './components/create-and-modifying-event/components/tech-event/tech-event.component';
import { CargoEventComponent } from './components/create-and-modifying-event/components/cargo-event/cargo-event.component';
import { NewTechTaskDialogComponent } from './components/create-and-modifying-event/components/tech-event/dialogs/new-tech-task-dialog/new-tech-task-dialog.component';
import {NewTechTaskService} from './components/create-and-modifying-event/components/tech-event/services/new-tech-task.service';
import {NewEventDataService} from './components/create-and-modifying-event/services/new-event-data.service';
import {NewEventApiService} from './components/create-and-modifying-event/services/new-event-api.service';
import { SelectTechSubdivisionComponent } from './components/create-and-modifying-event/components/tech-event/dialogs/select-tech-subdivision/select-tech-subdivision.component';
import { NewSubtaskCreateComponent } from './components/create-and-modifying-event/components/desant-event-staff/dialogs/new-subtask-create/new-subtask-create.component';
import { NewCargoTaskDialogComponent } from './components/create-and-modifying-event/components/cargo-event/dialogs/new-cargo-task-dialog/new-cargo-task-dialog.component';
import {OspoTimeModule} from '../../../shared/components/ospo/ospo-time/ospo-time.module';
import {WillingnessComponent} from './components/create-and-modifying-event/components/willingness/willingness.component';
import {WillingnessReportDialogComponent} from './components/create-and-modifying-event/components/willingness/components/willingness-report-dialog/willingness-report-dialog.component';
import {GeneralComponent} from './components/create-and-modifying-event/components/willingness/components/willingness-report-dialog/components/general/general.component';
import {InstructorDialogComponent} from './components/create-and-modifying-event/components/willingness/components/willingness-report-dialog/components/general/instructor-dialog/instructor-dialog.component';
import {AttendantsComponent} from './components/create-and-modifying-event/components/willingness/components/willingness-report-dialog/components/attendants/attendants.component';
import {ReportingComponent} from './components/create-and-modifying-event/components/willingness/components/willingness-report-dialog/components/reporting/reporting.component';


@NgModule({
  declarations: [
    DesantEventsComponent,
    DesantEventsMainComponent,
    CreateAndModifyingEventComponent,
    FilterDesantEventsComponent,
    DesantEventCardComponent,
    GeneralEventInfoComponent,
    DesantEventStaffComponent,
    NewEventCardComponent,
    NewStaffTaskDialogComponent,
    SelectDesantSubdivisionComponent,
    NewStaffSubtaskDialogComponent,
    SelectDesantSubdivisionSubtaskComponent,
    StaffTaskProgressDialogComponent,
    VvstParachuteSystemComponent,
    ReportDesantSubdivisionComponent,
    TechEventComponent,
    CargoEventComponent,
    NewTechTaskDialogComponent,
    SelectTechSubdivisionComponent,
    NewSubtaskCreateComponent,
    NewCargoTaskDialogComponent,
    WillingnessComponent,
    WillingnessReportDialogComponent,
    GeneralComponent,
    InstructorDialogComponent,
    AttendantsComponent,
    ReportingComponent,
    VvstParachuteSystemComponent,
    ReportDesantSubdivisionComponent,
  ],
  imports: [
    CommonModule,
    DesantEventsRoutingModule,
    InputNumberModule,
    ReactiveFormsModule,
    CommonModule,
    MilitaryUnitsSidebarModule,
    ButtonModule,
    CalendarModule,
    FormsModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    RippleModule,
    SliderModule,
    MultiSelectModule,
    BadgeModule,
    DocumentsFormalizedModule,
    DynamicDialogModule,
    InputTextareaModule,
    ReportsDialogModule,
    DocumentsModule,
    CommonModule,
    MilitaryUnitsSidebarModule,
    ButtonModule,
    CalendarModule,
    FormsModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    RippleModule,
    SliderModule,
    MultiSelectModule,
    BadgeModule,
    DocumentsFormalizedModule,
    DynamicDialogModule,
    InputTextareaModule,
    ReportsDialogModule,
    DocumentsModule,
    CheckboxModule,
    InputSwitchModule,
    MilitaryModule,
    OspoCoordinatesModule,
    CoordinatesModule,
    RadioButtonModule,
    StepsModule,
    OspoCompletenessModule,
    OspoSecurityModule,
    LoaderDirectiveModule,
    PaginatorModule,
    TabMenuModule,
    TabViewModule,
    OspoTimeModule
  ],
  providers: [NewEventDataService, NewEventApiService, NewTechTaskService],
})
export class DesantEventsModule {
}
