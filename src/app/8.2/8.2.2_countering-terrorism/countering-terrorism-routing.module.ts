import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CounterListTableComponent } from './pages/components/counter-list-table/counter-list-table.component';
import { CounterListComponent } from './pages/components/counter-list/counter-list.component';
import { CreationBillComponent } from './pages/components/creation-bill/creation-bill.component';
import { ShowAccordionDataComponent } from './pages/components/custom-accordion/show-accordion-data/show-accordion-data.component';
import { MakeReportModule } from './pages/components/make-report/make-report.module';
import { NewBillComponent } from './pages/components/new-bill/new-bill.component';
import { ShowReportModule } from './pages/components/show-report/show-report.module';


const routes: Routes =
  [
    {
      path: '', component: CounterListComponent,
      children: [
        { path: '', redirectTo: 'table', pathMatch: 'full' },
        {
          path: 'table', component: CounterListTableComponent,
          children: [
            {
              path: 'new-bill',
              outlet: 'modal',
              component: NewBillComponent,
            }
          ],
        },
        {
          path: 'create',
          component: CreationBillComponent,
          children: [
            {
              path: 'short-data',
              outlet: 'modal',
              component: ShowAccordionDataComponent,
            }
          ],
        },
        { path: 'make-report', loadChildren: () => MakeReportModule },
        { path: 'show-report', loadChildren: () => ShowReportModule },
      ]
    },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CounteringTerrorismRoutingModule { }
