import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContextMenuModule} from 'primeng/contextmenu';
import { InformationFormationRoutingModule } from './information-formation-routing.module';
import { InformationFormationComponent } from './information-formation.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { SchemeOrderComponent } from './scheme-order/scheme-order.component';
import { DialogModule } from 'primeng/dialog';
import { IfNodesComponent } from './if-nodes/if-nodes.component';
import { IfInformationPortsComponent } from './if-information-ports/if-information-ports.component';
import { IfSecurityComponent } from './if-security/if-security.component';
import { IfStaffingLevelComponent } from './if-staffing-level/if-staffing-level.component';
import { CheckCombatReadinessModule } from '../../8.1/8.1.5_check-combat-readiness/check-combat-readiness.module';


@NgModule({
  declarations: [InformationFormationComponent, SchemeOrderComponent, IfNodesComponent, IfInformationPortsComponent, IfSecurityComponent, IfStaffingLevelComponent],
  imports: [
    CommonModule,
    InformationFormationRoutingModule,
    SelectButtonModule,
    FormsModule,
    SidebarModule,
    ContextMenuModule,
    CheckCombatReadinessModule,
    ContextMenuModule,
    DialogModule,
  ],
})
export class InformationFormationModule { }
