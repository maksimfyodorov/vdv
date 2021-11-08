import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MilitaryUnitsDropdownComponent } from './military-units-dropdown.component';
import { MilitaryUnitsDropdownService } from './services/military-units-dropdown.service';
import { TreeModule } from 'primeng/tree';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [MilitaryUnitsDropdownComponent],
  exports: [
    MilitaryUnitsDropdownComponent,
  ],
  imports: [
    CommonModule,
    TreeModule,
    ScrollPanelModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    OverlayPanelModule,
    FormsModule,
  ],
  providers: [
    MilitaryUnitsDropdownService
  ]
})
export class MilitaryUnitsDropdownModule { }
