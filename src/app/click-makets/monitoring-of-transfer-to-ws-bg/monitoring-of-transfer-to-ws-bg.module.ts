import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitoringOfTransferToWsBGRoutingModule } from './monitoring-of-transfer-to-ws-bg-routing.module';
import { MonitoringOfTransferToWsBGComponent } from './monitoring-of-transfer-to-ws-bg/monitoring-of-transfer-to-ws-bg.component';
import { CheckCombatReadinessModule } from '../../8.1/8.1.5_check-combat-readiness/check-combat-readiness.module';

import { DialogModule } from 'primeng/dialog';
import { SidebarTreeModule } from '../../shared/click-layout/sidebar-tree/sidebar-tree.module';
import { DocumentsFormalizedModule } from '../../shared/components/ospo/documents-formalized/documents-formalized.module';

@NgModule({
  declarations: [MonitoringOfTransferToWsBGComponent],
  imports: [
    CommonModule,
    MonitoringOfTransferToWsBGRoutingModule,
    DialogModule,
    MonitoringOfTransferToWsBGRoutingModule,
    CheckCombatReadinessModule,
    SidebarTreeModule,
    DocumentsFormalizedModule,
  ],
})
export class MonitoringOfTransferToWsBGModule { }
