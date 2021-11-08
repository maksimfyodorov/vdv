import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MilitaryUnitsDropdownFlatComponent } from './military-units-dropdown-flat.component';
import { DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [MilitaryUnitsDropdownFlatComponent],
  imports: [
    CommonModule,
    DropdownModule,
    OverlayPanelModule,
    ScrollPanelModule,
    InputTextModule,
    FormsModule,
  ],
  exports: [
    MilitaryUnitsDropdownFlatComponent,
  ],
})
export class MilitaryUnitsDropdownFlatModule { }
