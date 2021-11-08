import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SmocpComponent } from './status-monitoring-of-control-points/smocp.component';

const routes: Routes = [
  {
    path: '',
    component: SmocpComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatusMonitoringOfControlPointsRoutingModule { }
