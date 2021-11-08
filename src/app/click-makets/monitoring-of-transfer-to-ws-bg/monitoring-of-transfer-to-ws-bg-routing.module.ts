import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonitoringOfTransferToWsBGComponent } from './monitoring-of-transfer-to-ws-bg/monitoring-of-transfer-to-ws-bg.component';

const routes: Routes = [{ path: '', component: MonitoringOfTransferToWsBGComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitoringOfTransferToWsBGRoutingModule { }
