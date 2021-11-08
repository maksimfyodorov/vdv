import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamplesRoutingModule } from './examples-routing.module';
import { ExamplesComponent } from './examples.component';
import { DocumentsModule } from '../../shared/components/ospo/documents/documents.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { CufModule } from '../../shared/components/ospo/cuf/cuf.module';
import { ButtonModule } from 'primeng/button';
import { MilitaryUnitsDropdownModule } from '../../shared/components/ospo/military-units/military-units-dropdown/military-units-dropdown.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MilitaryUnitsModalModule } from '../../shared/components/ospo/military-units/military-units-modal/military-units-modal.module';
import { MilitaryUnitsSidebarModule } from '../../shared/components/ospo/military-units/military-units-sidebar/military-units-sidebar.module';
import { OspoChangeHistoryComponent } from '../../shared/components/ospo/ospo-change-history/ospo-change-history.component';
import { TableModule } from 'primeng/table';
import { MilitaryUnitsDropdownFlatModule } from '../../shared/components/ospo/military-units/military-units-dropdown-flat/military-units-dropdown-flat.module';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [ExamplesComponent, OspoChangeHistoryComponent],
  imports: [
    CommonModule,
    ExamplesRoutingModule,
    DocumentsModule,
    MatExpansionModule,
    CufModule,
    ButtonModule,
    MilitaryUnitsDropdownModule,
    ReactiveFormsModule,
    MilitaryUnitsModalModule,
    MilitaryUnitsSidebarModule,
    TableModule,
    MilitaryUnitsDropdownFlatModule,
  ],
  providers: [
    MessageService,
  ],
})
export class ExamplesModule {
}
