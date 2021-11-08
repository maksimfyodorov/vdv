import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonitoringOfTransferToWsBGComponent } from '../monitoring-of-transfer-to-ws-bg/monitoring-of-transfer-to-ws-bg/monitoring-of-transfer-to-ws-bg.component';
import { TheCompositionOfTheForcesAndMeansOfPdtComponent } from './the-composition-of-the-forces-and-means-of-pdt.component';

const routes: Routes = [{ path: '', component: TheCompositionOfTheForcesAndMeansOfPdtComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TheCompositionOfTheForcesAndMeansOfPdtRoutingModule { }
