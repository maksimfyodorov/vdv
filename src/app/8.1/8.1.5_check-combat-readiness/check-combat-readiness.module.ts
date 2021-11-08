import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckCombatReadinessComponent } from './pages/check-combat-readiness.component';
import { CheckCombatReadinessRoutingModule } from './check-combat-readiness-routing.module';
import { RangeDataPickerModule } from '../../shared/components/range-data-picker/range-data-picker.module';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SchedulerTableComponent } from './components/scheduler-table/scheduler-table.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { TreeModule } from 'primeng/tree';
import { CancelInspectionDialogComponent } from './components/dialogs/inspection/cancel-inspection-dialog/cancel-inspection-dialog.component';
import { MultipleCheckboxesModule } from '../../shared/components/multiple-checkboxes/multiple-checkboxes.module';
import { PerformVerificationDialogComponent } from './components/dialogs/inspection/perform-verification-dialog/perform-verification-dialog.component';
import { ShowToModule } from '../../shared/directives/show-to-role/show-to.module';
import { HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'primeng/tooltip';
import { StepsModule } from 'primeng/steps';
import { AccordionModule } from 'primeng/accordion';
import { InspectionDialogComponent } from './components/dialogs/inspection/inspection-dialog/inspection-dialog.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { ConfirmationDialogModule } from '../../shared/components/confirmation-dialog/confirmation-dialog.module';
import { LoaderDirectiveModule } from '../../shared/directives/loader/loader-directive.module';
import { PlanHistoryChangesComponent } from './components/dialogs/plan-history-changes/plan-history-changes.component';
import { CreateScheduleComponent } from './components/dialogs/schedule/create-schedule/create-schedule.component';
import { SaveScheduleDialogComponent } from './components/dialogs/schedule/save-schedule-dialog/save-schedule-dialog.component';
import { RippleModule } from 'primeng/ripple';
import { TreeDialogComponent } from '../../shared/components/tree-dialog/tree-dialog.component';
import { AttachDocumentDialogModule } from '../../shared/components/ospo/documents/attach-document-dialog/attach-document-dialog.module';
import { NotificationModule } from '../../shared/components/ospo/notification/notification.module';
import { BreadcrumbsModule } from '../../shared/components/breadcrumbs/breadcrumbs.module';
import { TransferCheckComponent } from './components/dialogs/inspection/transfer-check/transfer-check.component';
import { DutyShiftInspectionDialogComponent } from './components/dialogs/inspection/duty-shift-mode/duty-shift-inspection-dialog/duty-shift-inspection-dialog.component';
import { DocumentLinksListComponent } from '../../shared/components/document-links-list/document-links-list.component';
import { DocumentLinksListDialogComponent } from '../../shared/components/document-links-list/document-links-list-dialog/document-links-list-dialog.component';
import { DocumentsModule } from '../../shared/components/ospo/documents/documents.module';
import { UserPermissionDialogComponent } from '../../shared/components/user-permission-dialog/user-permission-dialog.component';
import { TimeChartScheduleComponent } from './components/time-chart-schedule/time-chart-schedule.component';
import { NgTimeChartModule } from '@puzzleitc/ng-time-chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DocumentsFormalizedModule } from '../../shared/components/ospo/documents-formalized/documents-formalized.module';
import { NodesHierarchyModule } from '../../shared/components/nodes-hierarchy/nodes-hierarchy.module';
import { UavInformationModule } from '../8.1.4_uav-information/uav-information.module';
import { NgxPrintModule } from 'ngx-print';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CategoryHierarchyModule } from '../../shared/components/ospo/category-hierarchy/category-hierarchy/category-hierarchy.module';
import { MilitaryUnitsDropdownModule } from '../../shared/components/ospo/military-units/military-units-dropdown/military-units-dropdown.module';

@NgModule({
  declarations: [
    CheckCombatReadinessComponent,
    CancelInspectionDialogComponent,
    SchedulerTableComponent,
    PerformVerificationDialogComponent,
    InspectionDialogComponent,
    PlanHistoryChangesComponent,
    CreateScheduleComponent,
    TreeDialogComponent,
    SaveScheduleDialogComponent,
    TransferCheckComponent,
    DutyShiftInspectionDialogComponent,
    DocumentLinksListComponent,
    DocumentLinksListDialogComponent,
    UserPermissionDialogComponent,
    TimeChartScheduleComponent,
  ],
  imports: [
    CheckCombatReadinessRoutingModule,
    CommonModule,
    RangeDataPickerModule,
    ButtonModule,
    DropdownModule,
    CalendarModule,
    RadioButtonModule,
    FormsModule,
    ScrollPanelModule,
    TabViewModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    ConfirmDialogModule,
    CheckboxModule,
    TreeModule,
    FileUploadModule,
    ReactiveFormsModule,
    InputTextModule,
    MultipleCheckboxesModule,
    InputTextareaModule,
    DialogModule,
    ShowToModule,
    HttpClientModule,
    TooltipModule,
    StepsModule,
    AccordionModule,
    AutoCompleteModule,
    MultiSelectModule,
    TableModule,
    ConfirmationDialogModule,
    LoaderDirectiveModule,
    AccordionModule,
    RippleModule,
    NotificationModule,
    AttachDocumentDialogModule,
    BreadcrumbsModule,
    DocumentsModule,
    NgTimeChartModule,
    ProgressSpinnerModule,
    DocumentsFormalizedModule,
    NodesHierarchyModule,
    UavInformationModule,
    NgxPrintModule,
    OverlayPanelModule,
    CategoryHierarchyModule,
    MilitaryUnitsDropdownModule,
  ],
  exports: [
    DocumentLinksListComponent
  ],
})

export class CheckCombatReadinessModule {
}
