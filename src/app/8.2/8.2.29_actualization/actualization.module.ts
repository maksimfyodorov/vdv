import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ActualizationComponent } from './pages/actualization.component';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ActualizationRoutingModule } from './actualization-routing.module';
import { TableModule } from 'primeng/table';
import { ReportComponent } from './components/dialogs/report/report.component';
import { SettingInformationGroupComponent } from './components/dialogs/setting-information-group/setting-information-group.component';
import { DetailsComponent } from './components/dialogs/setting-information-group/components/details/details.component';
import { ChangesDetailComponent } from './components/dialogs/setting-information-group/components/changes-detail/changes-detail.component';
import { EditableAutocompleteModule } from '../../shared/components/editable-autocomplete/editable-autocomplete.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PeriodModule } from '../../shared/components/period/period.module';
import { SettingsInformationArrayComponent } from './components/dialogs/settings-information-array/settings-information-array.component';
import { TreeModule } from 'primeng/tree';
import { MilitaryModule } from '../../shared/components/military/military.module';
import { MilitaryUnitsDropdownModule } from '../../../app/shared/components/ospo/military-units/military-units-dropdown/military-units-dropdown.module';
import { FormGroupComponent } from './components/dialogs/setting-information-group/components/changes-detail/components/form-group/form-group.component';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { CustomTreeComponent } from './components/dialogs/settings-information-array/components/custom-tree/custom-tree.component';
import { DocumentsFormalizedModule } from '../../shared/components/ospo/documents-formalized/documents-formalized.module';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NodeComponent } from './components/dialogs/settings-information-array/components/node/node.component';
import { NamePipe } from './components/dialogs/settings-information-array/components/custom-tree/name.pipe';
import { ButtonModule } from 'primeng/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MilitaryUnitsDropdownFlatModule } from '../../shared/components/ospo/military-units/military-units-dropdown-flat/military-units-dropdown-flat.module';


@NgModule({
  declarations: [
    ActualizationComponent,
    ReportComponent,
    SettingInformationGroupComponent,
    DetailsComponent,
    ChangesDetailComponent,
    SettingsInformationArrayComponent,
    FormGroupComponent,
    CustomTreeComponent,
    NodeComponent,
    NamePipe,
  ],
  imports: [
    CommonModule,
    ActualizationRoutingModule,
    CalendarModule,
    InputTextModule,
    FormsModule,
    DropdownModule,
    TableModule,
    DialogModule,
    EditableAutocompleteModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    PeriodModule,
    TreeModule,
    MilitaryModule,
    MilitaryUnitsDropdownModule,
    PasswordModule,
    DocumentsFormalizedModule,
    VirtualScrollerModule,
    ProgressSpinnerModule,
    CheckboxModule,
    ButtonModule,
    MatExpansionModule,
    MilitaryUnitsDropdownFlatModule,
  ],
})
export class ActualizationModule {
}
