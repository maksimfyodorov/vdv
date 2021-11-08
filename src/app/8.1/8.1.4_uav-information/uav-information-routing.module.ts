import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UavInformationComponent } from './uav-information/uav-information.component';
import { FlightPlansComponent } from '@app/8.1/8.1.4_uav-information/components/flight-plans/flight-plans.component';
import { UavStateComponent } from '@app/8.1/8.1.4_uav-information/components/uav-state/uav-state.component';

const routes: Routes = [
  {
    path: '',
    component: UavInformationComponent,
    children: [
      {
        path: 'flight_plans/military_unit/:military_unit_id',
        component: FlightPlansComponent
      },
      {
        path: 'state_bla/military_unit/:military_unit_id',
        component: UavStateComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UavInformationRoutingModule { }
