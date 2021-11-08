import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoMonitoringPageComponent } from './pages/video-monitoring-page/video-monitoring-page.component';

const routes: Routes = [{ path: '', component: VideoMonitoringPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutingVideoMonitoringModule {}
