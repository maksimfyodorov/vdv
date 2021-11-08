import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillCellComponent } from './bill-cell/bill-cell.component';
import { BillTasksComponent } from './bill-tasks/bill-tasks.component';
import { CreationBillComponent } from './creation-bill.component';
import { CustomAccordionModule } from '../custom-accordion/custom-accordion.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BillTasksComponent,
    BillCellComponent,
    CreationBillComponent,
  ],
  imports: [
    CommonModule,
    CustomAccordionModule,
    RouterModule,
  ],
  exports: [
    CreationBillComponent
  ]
})
export class BillModule { }
