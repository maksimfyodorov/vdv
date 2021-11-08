import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MilitaryUnitsModalComponent } from './military-units-modal.component';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { LoaderDirectiveModule } from '../../../../directives/loader/loader-directive.module';



@NgModule({
  declarations: [ MilitaryUnitsModalComponent ],
  imports: [
    CommonModule,
    TableModule,
    CheckboxModule,
    ButtonModule,
    LoaderDirectiveModule,
  ],
})
export class MilitaryUnitsModalModule { }
