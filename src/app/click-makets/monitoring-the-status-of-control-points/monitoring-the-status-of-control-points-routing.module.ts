import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonitoringTheStatusOfControlPointsComponent } from './monitoring-the-status-of-control-points.component';

const routes: Routes = [{ path: '', component: MonitoringTheStatusOfControlPointsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitoringTheStatusOfControlPointsRoutingModule { }
