import { ReportsDialogModule } from './../../shared/components/ospo/reports-dialog/reports-dialog.module';
import { DocumentsModule } from './../../shared/components/ospo/documents/documents.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesantMonitoringRoutingModule } from './desant-monitoring-routing.module';
import { DesantMonitoringComponent } from './page/desant-monitoring.component';
import { MilitaryUnitsSidebarModule } from '../../shared/components/ospo/military-units/military-units-sidebar/military-units-sidebar.module';
import { MilitaryUnitService } from './services/military-unit.service';
import { TabViewModule } from 'primeng/tabview';
import { SportTeamComponent } from './components/sport-team/sport-team.component';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import { SportCardComponent } from './components/sport-team/sport-card/sport-card.component';
import {InputTextModule} from 'primeng/inputtext';
import {RippleModule} from 'primeng/ripple';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {BadgeModule} from 'primeng/badge';
import { DocumentsFormalizedModule } from '../../shared/components/ospo/documents-formalized/documents-formalized.module';
import { IndicationOffTheYearComponent } from './components/indication-off-the-year/indication-off-the-year.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { IndicationComponent } from './components/indication-off-the-year/components/indication/indication.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { StaffComponent } from './components/staff/staff.component';
import { StaffingLevelComponent } from './components/staff/staffing-level/staffing-level.component';
import { StaffDesantingComponent } from './components/staff/staff-desanting/staff-desanting.component';
import { StaffDesantingCardComponent } from './components/staff/staff-desanting-card/staff-desanting-card.component';
import { SettingsComponentComponent } from './components/settings-component/settings-component.component';
import { LandingTasksComponent } from './components/settings-component/components/landing-tasks/landing-tasks.component';
import { AircraftComponent } from './components/settings-component/components/aircraft/aircraft.component';
import { NewTaskComponent } from './components/settings-component/components/landing-tasks/components/new-task/new-task.component';
import {InputNumberModule} from 'primeng/inputnumber';
import {CheckboxModule} from 'primeng/checkbox';
import {InputSwitchModule} from 'primeng/inputswitch';
import {MilitaryModule} from '../../shared/components/military/military.module';
import { NewAircraftComponent } from './components/settings-component/components/aircraft/components/new-aircraft/new-aircraft.component';
import { AirfieldsComponent } from './components/settings-component/components/airfields/airfields.component';
import { NewAirfieldsComponent } from './components/settings-component/components/airfields/components/new-airfields/new-airfields.component';
import {OspoCoordinatesModule} from '../../shared/components/ospo/ospo-coordinates/ospo-coordinates.module';
import {CoordinatesModule} from '../../shared/components/ospo/coordinates/coordinates.module';
import {RadioButtonModule} from 'primeng/radiobutton';
import {StepsModule} from 'primeng/steps';
import {OspoCompletenessModule} from '../../shared/components/ospo-completeness/ospo-completeness.module';
import {OspoSecurityModule} from '../../shared/components/ospo/ospo-security/ospo-security.module';
import {PaginatorModule} from 'primeng/paginator';
import {TabMenuModule} from 'primeng/tabmenu';
import {DesantTabsService} from './services/desant-tabs.service';
import { CategoriesOfUnitsComponent } from './components/settings-component/components/categories-of-units/categories-of-units.component';
import { NewCategoryComponent } from './components/settings-component/components/categories-of-units/components/new-category/new-category.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AddNewCategoryComponent } from './components/jumping-standarts/components/add-new-category/add-new-category.component';
import { VvstigComponent } from './components/vvstig/vvstig.component';
import { LandingVvstComponent } from './components/vvstig/landing-vvst/landing-vvst.component';
import { LandingOfCargoComponent } from './components/vvstig/landing-of-cargo/landing-of-cargo.component';
import {LoaderDirectiveModule} from '../../shared/directives/loader/loader-directive.module';
import {JumpingStandartsComponent} from './components/jumping-standarts/jumping-standarts.component';
import {CategoryHierarchyModule} from '../../shared/components/ospo/category-hierarchy/category-hierarchy/category-hierarchy.module';
import { TechDesantingCardComponent } from './components/vvstig/landing-vvst/tech-desanting-card/tech-desanting-card.component';



@NgModule({
  declarations: [
    DesantMonitoringComponent,
    IndicationOffTheYearComponent,
    SportTeamComponent,
    SportCardComponent,
    IndicationComponent,
    StaffComponent,
    StaffingLevelComponent,
    StaffDesantingComponent,
    StaffDesantingCardComponent,
    SettingsComponentComponent,
    LandingTasksComponent,
    AircraftComponent,
    NewTaskComponent,
    NewAircraftComponent,
    AirfieldsComponent,
    NewCategoryComponent,
    NewAirfieldsComponent,
    CategoriesOfUnitsComponent,
    NewCategoryComponent,
    AddNewCategoryComponent,
    VvstigComponent,
    LandingVvstComponent,
    LandingOfCargoComponent,
    JumpingStandartsComponent,
    TechDesantingCardComponent
  ],
  imports: [
    InputNumberModule,
    ReactiveFormsModule,
    CommonModule,
    DesantMonitoringRoutingModule,
    MilitaryUnitsSidebarModule,
    TabViewModule,
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
    DesantMonitoringRoutingModule,
    MilitaryUnitsSidebarModule,
    TabViewModule,
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
    OverlayPanelModule,
    ReactiveFormsModule,
    CommonModule,
    DesantMonitoringRoutingModule,
    MilitaryUnitsSidebarModule,
    TabViewModule,
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
    DesantMonitoringRoutingModule,
    MilitaryUnitsSidebarModule,
    TabViewModule,
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
    PaginatorModule,
    TabMenuModule,
    OverlayPanelModule,
    LoaderDirectiveModule,
    CategoryHierarchyModule
  ],
  providers: [MilitaryUnitService, DesantTabsService],

})
export class DesantMonitoringModule { }
