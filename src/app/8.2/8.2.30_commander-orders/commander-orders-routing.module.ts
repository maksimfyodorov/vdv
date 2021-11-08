import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommanderOrdersComponent } from './commander-orders/commander-orders.component';

const routes: Routes = [{ path: '', component: CommanderOrdersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommanderOrdersRoutingModule { }
