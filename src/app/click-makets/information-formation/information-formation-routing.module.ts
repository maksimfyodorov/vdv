import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DesantMonitoringComponent } from '../../8.2/8.2.4_desant-monitoring/page/desant-monitoring.component'
import { InformationFormationComponent } from './information-formation.component';

const routes: Routes = [{ path: '', component: InformationFormationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformationFormationRoutingModule { }
