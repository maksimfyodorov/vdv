import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DesantMonitoringComponent} from './page/desant-monitoring.component';
import {IndicationOffTheYearComponent} from './components/indication-off-the-year/indication-off-the-year.component';
import {SportTeamComponent} from './components/sport-team/sport-team.component';
import {StaffComponent} from './components/staff/staff.component';
import {SettingsComponentComponent} from './components/settings-component/settings-component.component';
import {DesantEventsModule} from './desant-events-module/desant-events.module';
import {JumpingStandartsComponent} from './components/jumping-standarts/jumping-standarts.component';
import {VvstigComponent} from './components/vvstig/vvstig.component';

const routes: Routes = [
  {
    path: '', component: DesantMonitoringComponent, children: [
      {path: '', redirectTo: 'events', pathMatch: 'full'},
      {path: 'events', loadChildren: () =>     import('src/app/8.2/8.2.4_desant-monitoring/desant-events-module/desant-events.module').then((m) => m.DesantEventsModule)},
      {path: 'indication-off-the-year', component: IndicationOffTheYearComponent},
      {path: 'sport-team', component: SportTeamComponent},
      {path: 'staff', component: StaffComponent},
      {path: 'vvst-and-cargo', component: VvstigComponent},
      {path: 'readiness'},
      {path: 'settings', component: SettingsComponentComponent},
      {path: 'jump-standards', component: JumpingStandartsComponent},
    ]
  }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesantMonitoringRoutingModule {
}
