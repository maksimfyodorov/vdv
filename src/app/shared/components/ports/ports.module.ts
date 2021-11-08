import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortsComponent } from './ports.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PortsComponent],
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    FormsModule,
  ],
  exports: [
    PortsComponent,
  ],
})
export class PeriodModule {
}
