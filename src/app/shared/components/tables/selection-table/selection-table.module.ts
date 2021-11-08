import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionTableComponent } from './component/selection-table.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MercatorToHDMSPipe } from '../../ospo/ospo-coordinates/pipes/coordinate-system.pipe';

@NgModule({
  declarations: [
    SelectionTableComponent,
    MercatorToHDMSPipe,
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
  ],
  exports: [
    SelectionTableComponent,
  ],
})
export class SelectionTableModule {}
