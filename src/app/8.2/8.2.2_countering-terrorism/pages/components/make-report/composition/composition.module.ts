import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AntiTerrorUnitComponent } from './anti-terror-unit/anti-terror-unit.component';
import { AddMilitaryCityComponent } from './military-city-tree/add-military-city/add-military-city.component';
import { MilitaryTransportDialogComponent } from './military-transport/military-transport-dialog/military-transport-dialog.component';
import { MilitaryTransportComponent } from './military-transport/military-transport.component';
import { GarrisonStrengthComponent } from './garrison-strength/garrison-strength.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { OspoSecurityModule } from '../../../../../../shared/components/ospo/ospo-security/ospo-security.module';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CompositionComponent } from './composition.component';
import { MilitaryCityTreeComponent } from './military-city-tree/military-city-tree.component';
import { MilitaryCityComponent } from './military-city/military-city.component';
import { TreeModule } from 'primeng/tree';
import { EditableAutocompleteModule } from '../../../../../../shared/components/editable-autocomplete/editable-autocomplete.module';
import { BchsService } from '../../../services/bchs.service';
import { AntiTerrorUnitModeComponent } from './anti-terror-unit-mode/anti-terror-unit-mode.component';
import { SoldiersModule } from './soldier-length-form/soldiers.module';
import { RouterModule } from '@angular/router';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { OspoTimeModule } from '../../../../../../shared/components/ospo/ospo-time/ospo-time.module';
import { TreeTableModule } from 'primeng/treetable';


@NgModule({
  declarations: [
    AntiTerrorUnitComponent,
    GarrisonStrengthComponent,
    MilitaryTransportComponent,
    MilitaryTransportDialogComponent,
    AddMilitaryCityComponent,
    CompositionComponent,
    MilitaryCityComponent,
    MilitaryCityTreeComponent,
    AntiTerrorUnitModeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    OspoSecurityModule,
    DropdownModule,
    TableModule,
    CalendarModule,
    ReactiveFormsModule,
    RouterModule,
    InputSwitchModule,
    TreeModule,
    EditableAutocompleteModule,
    SoldiersModule,
    OverlayPanelModule,
    OspoTimeModule,
    TreeTableModule,
  ],
  exports: [
    CompositionComponent,
  ],
  providers: [
    BchsService
  ]
})
export class CompositionModule { }
