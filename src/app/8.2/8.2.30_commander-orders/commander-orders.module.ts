import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommanderOrdersRoutingModule } from './commander-orders-routing.module';
import { CommanderOrdersComponent } from './commander-orders/commander-orders.component';
import { NodesHierarchyModule } from '../../shared/components/nodes-hierarchy/nodes-hierarchy.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { OrdersFilterComponent } from './components/orders-filter/orders-filter.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { AddOrderDialogComponent } from './dialogs/order-dialogs/add-order-dialog/add-order-dialog.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { DocumentsModule } from '../../shared/components/ospo/documents/documents.module';
import { UavInformationModule } from '../../8.1/8.1.4_uav-information/uav-information.module';
import { StepsModule } from 'primeng/steps';
import { StepperComponent } from './components/stepper/stepper.component';
import { BadgeModule } from 'primeng/badge';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';
import { ExecuteOrderDialogComponent } from './dialogs/execute-order-dialog/execute-order-dialog.component';
import { AddOrderDialogService } from './services/add-order-dialog.service';
import { AddDecisionDialogComponent } from './dialogs/decision-dialogs/add-decision-dialog/add-decision-dialog.component';
import { HttpApiService } from './services/api.service';
import { StepperService } from './services/stepper.service';
import { EditDecisionDialogComponent } from './dialogs/decision-dialogs/edit-decision-dialog/edit-decision-dialog.component';
import { EditOrderDialogComponent } from './dialogs/order-dialogs/edit-order-dialog/edit-order-dialog.component';
import { MilitaryModule } from '../../shared/components/military/military.module';
import { DocumentsFormalizedModule } from '../../shared/components/ospo/documents-formalized/documents-formalized.module';
import { DialogsService } from './services/dialogs.service';
import { MilitaryUnitsDropdownFlatModule } from '../../shared/components/ospo/military-units/military-units-dropdown-flat/military-units-dropdown-flat.module';
import { LoaderDirectiveModule } from '../../shared/directives/loader/loader-directive.module';
import { EditableAutocompleteModule } from '../../shared/components/editable-autocomplete/editable-autocomplete.module';
import { AddDecisionDialogService } from './services/add-decision-dialog.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    CommanderOrdersComponent,
    OrdersFilterComponent,
    AddOrderDialogComponent,
    EditOrderDialogComponent,
    OrdersListComponent,
    StepperComponent,
    ExecuteOrderDialogComponent,
    AddDecisionDialogComponent,
    EditDecisionDialogComponent,
  ],
  imports: [
    CommonModule,
    CommanderOrdersRoutingModule,
    NodesHierarchyModule,
    ButtonModule,
    InputTextModule,
    OverlayPanelModule,
    CalendarModule,
    ReactiveFormsModule,
    CheckboxModule,
    DropdownModule,
    ScrollPanelModule,
    DocumentsModule,
    UavInformationModule,
    StepsModule,
    BadgeModule,
    ProgressBarModule,
    TagModule,
    FormsModule,
    MilitaryModule,
    DocumentsFormalizedModule,
    MilitaryUnitsDropdownFlatModule,
    LoaderDirectiveModule,
    EditableAutocompleteModule,
    MatCheckboxModule,
    TableModule,
  ],
  providers: [AddOrderDialogService, HttpApiService, StepperService, DialogsService, AddDecisionDialogService]
})
export class CommanderOrdersModule { }
