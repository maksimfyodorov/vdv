import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransferMonitoringComponent } from './components/transfer-monitoring/transfer-monitoring.component';


const routes: Routes =
    [
        {
            path: '', component: TransferMonitoringComponent,
        },
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransferMonitoringRoutingModule { }
