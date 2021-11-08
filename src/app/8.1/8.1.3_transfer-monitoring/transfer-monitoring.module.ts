import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferMonitoringComponent } from './components/transfer-monitoring/transfer-monitoring.component';
import { MilitaryUnitsSidebarModule } from '../../shared/components/ospo/military-units/military-units-sidebar/military-units-sidebar.module';
import { TransferMonitoringRoutingModule } from './transfer-monitoring-routing.module';
import { ButtonModule } from 'primeng/button';
import { EditableAutocompleteModule } from '../../shared/components/editable-autocomplete/editable-autocomplete.module';
import { TimelineModule } from 'primeng/timeline';
import { PlanCreateComponent } from './components/plan-create/plan-create.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventTableComponent } from './components/transfer-monitoring/event-table/event-table.component';
import { TableModule } from 'primeng/table';
import { EventAdderComponent } from './components/transfer-monitoring/event-table/event-adder/event-adder.component';
import { EventTableDataService } from './services/event-table-data.service';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { AddMilitaryFormationComponent } from './components/transfer-monitoring/event-table/add-military-formation/add-military-formation.component';
import { CheckboxModule } from 'primeng/checkbox';
import { AddEventModalComponent } from './components/transfer-monitoring/event-table/event-adder/add-event-modal/add-event-modal.component';
import { TreeModule } from 'primeng/tree';
import { OspoTimeModule } from '../../shared/components/ospo/ospo-time/ospo-time.module';
import { EventTimerComponent } from './components/transfer-monitoring/event-timer/event-timer.component';
import { EventCompleteComponent } from './components/transfer-monitoring/event-table/event-adder/event-complete/event-complete.component'
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { HistoryModalComponent } from './components/transfer-monitoring/history-modal/history-modal.component';
import { StatusStyleDirective } from './components/transfer-monitoring/history-modal/status-style.directive';
import { TimeStyleDirective } from './components/transfer-monitoring/event-table/time-style.directive';
import { TransferTimlineComponent } from './components/transfer-monitoring/transfer-timline/transfer-timline.component';
import {TabViewModule} from 'primeng/tabview';
import { MonitorSignalComponent } from './components/transfer-monitoring/monitor-signal/monitor-signal.component';


@NgModule({
  declarations: [
    TransferMonitoringComponent,
    PlanCreateComponent,
    EventTableComponent,
    EventAdderComponent,
    AddMilitaryFormationComponent,
    AddEventModalComponent,
    EventTimerComponent,
    EventCompleteComponent,
    HistoryModalComponent,
    StatusStyleDirective,
    TimeStyleDirective,
    TransferTimlineComponent,
    MonitorSignalComponent,
  ],
  imports: [
    CommonModule,
    TransferMonitoringRoutingModule,
    MilitaryUnitsSidebarModule,
    ButtonModule,
    EditableAutocompleteModule,
    TimelineModule,
    InputTextModule,
    FormsModule,
    TableModule,
    DynamicDialogModule,
    CheckboxModule,
    TreeModule,
    OspoTimeModule,
    ReactiveFormsModule,
    InputTextareaModule,
    RadioButtonModule,
    DropdownModule,
    TabViewModule,
  ],
  providers: [
    EventTableDataService,
  ]
})
export class TransferMonitoringModule { }
