import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterListComponent } from './pages/components/counter-list/counter-list.component'
import { CounteringTerrorismRoutingModule } from './countering-terrorism-routing.module';
import { MilitaryUnitsSidebarModule } from '../../shared/components/ospo/military-units/military-units-sidebar/military-units-sidebar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { CounterListTableComponent } from './pages/components/counter-list-table/counter-list-table.component';
import { CounterListService } from './pages/services/counter-list.service';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BreadcrumbService } from './pages/services/breadcrumb.service';
import { NewBillComponent } from './pages/components/new-bill/new-bill.component';
import { StateService } from './pages/services/state.service'
import { AccordionModule } from 'primeng/accordion';
import { ExecutiveService } from '../../shared/components/military/dialogs/select-shdk/services/executive.service';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TreeModule } from 'primeng/tree';
import { MilitaryTreeService } from './pages/components/make-report/composition/military-city-tree/military-tree.service';
import { DropdownModule } from 'primeng/dropdown';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SoldiersModule } from './pages/components/make-report/composition/soldier-length-form/soldiers.module';
import { SubordinateReportComponent } from './pages/components/subordinate-report/subordinate-report.component';
import { ShowReportModule } from './pages/components/show-report/show-report.module';
import { MakeReportModule } from './pages/components/make-report/make-report.module';
import { RouterModule } from '@angular/router';
import { BillModule } from './pages/components/creation-bill/bill.module';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NewBillModalComponent } from './pages/components/new-bill/new-bill-modal/new-bill-modal.component';
import { DocumentsFormalizedModule } from '../../shared/components/ospo/documents-formalized/documents-formalized.module';


@NgModule({
  declarations: [
    CounterListComponent,
    CounterListTableComponent,
    NewBillComponent,
    SubordinateReportComponent,
    NewBillModalComponent,
  ],
  imports: [
    CommonModule,
    CounteringTerrorismRoutingModule,
    MilitaryUnitsSidebarModule,
    CalendarModule,
    InputTextModule,
    FormsModule,
    TableModule,
    BreadcrumbModule,
    AccordionModule,
    InputSwitchModule,
    InputTextareaModule,
    ReactiveFormsModule,
    TreeModule,
    DropdownModule,
    ScrollPanelModule,
    SoldiersModule,
    ShowReportModule,
    MakeReportModule,
    RouterModule,
    BillModule,
    DocumentsFormalizedModule
  ],
  providers: [
    StateService,
    CounterListService,
    BreadcrumbService,
    ExecutiveService,
    MilitaryTreeService,
    DynamicDialogRef,
    DynamicDialogConfig,
  ],
  exports: [
  ]
})
export class CounteringTerrorismModule { }
