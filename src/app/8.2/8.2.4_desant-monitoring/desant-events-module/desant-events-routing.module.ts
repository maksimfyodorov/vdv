import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DesantEventsComponent} from './components/desant-events.component';
import {DesantEventsMainComponent} from './components/desant-events-main/desant-events-main.component';
import {CreateAndModifyingEventComponent} from './components/create-and-modifying-event/create-and-modifying-event.component';
import {GeneralEventInfoComponent} from './components/create-and-modifying-event/components/general-event-info/general-event-info.component';
import {DesantEventStaffComponent} from './components/create-and-modifying-event/components/desant-event-staff/desant-event-staff.component';
import {TechEventComponent} from './components/create-and-modifying-event/components/tech-event/tech-event.component';
import {CargoEventComponent} from './components/create-and-modifying-event/components/cargo-event/cargo-event.component';
import {WillingnessComponent} from './components/create-and-modifying-event/components/willingness/willingness.component';

const routes: Routes = [
  {
    path: '', component: DesantEventsComponent, children: [
      {path: '', redirectTo: 'main', pathMatch: 'full'},
      {path: 'main', component: DesantEventsMainComponent},
      {
        path: 'new-or-change', component: CreateAndModifyingEventComponent, children: [
          {path: '', redirectTo: 'general', pathMatch: 'full'},
          {path: 'general', component: GeneralEventInfoComponent},
          {path: 'staff', component: DesantEventStaffComponent},
          {path: 'vvst', component: TechEventComponent},
          {path: 'cargo', component: CargoEventComponent},
          {path: 'readiness', component: WillingnessComponent},
          {path: 'airplanes'},
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesantEventsRoutingModule {
}
