import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodesHierarchyComponent } from './nodes-hierarchy.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NodesHierarchyComponent],
  imports: [CommonModule, ScrollPanelModule, InputSwitchModule, FormsModule],
  exports: [NodesHierarchyComponent],
})
export class NodesHierarchyModule { }
