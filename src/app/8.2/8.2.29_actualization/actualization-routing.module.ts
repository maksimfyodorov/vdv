import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActualizationComponent } from './pages/actualization.component';

const routes: Routes = [{ path: '', component: ActualizationComponent } ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActualizationRoutingModule { }
