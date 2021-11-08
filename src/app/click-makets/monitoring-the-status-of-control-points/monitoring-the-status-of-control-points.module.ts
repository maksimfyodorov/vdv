import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitoringTheStatusOfControlPointsRoutingModule } from './monitoring-the-status-of-control-points-routing.module';
import { MonitoringTheStatusOfControlPointsComponent } from './monitoring-the-status-of-control-points.component';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { MtsofcStabilityComponent } from './mtsofc-stability/mtsofc-stability.component';
import { CheckCombatReadinessModule } from '../../8.1/8.1.5_check-combat-readiness/check-combat-readiness.module';
import { SidebarTreeModule } from '../../shared/click-layout/sidebar-tree/sidebar-tree.module';


@NgModule({
  declarations: [MonitoringTheStatusOfControlPointsComponent, MtsofcStabilityComponent],
  imports: [
    CommonModule,
    MonitoringTheStatusOfControlPointsRoutingModule,
    CheckCombatReadinessModule,
    MonitoringTheStatusOfControlPointsRoutingModule,
    TabViewModule,
    DialogModule,
    SidebarTreeModule,
  ],
})
export class MonitoringTheStatusOfControlPointsModule { }
