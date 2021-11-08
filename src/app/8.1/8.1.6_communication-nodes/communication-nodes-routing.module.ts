import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommunicationNodesComponent } from './pages/communication-nodes.component';

const routes: Routes = [{ path: '', component: CommunicationNodesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunicationNodesRoutingModule { }
