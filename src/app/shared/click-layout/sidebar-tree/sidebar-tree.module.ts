import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarTreeComponent } from './sidebar-tree.component';



@NgModule({
  declarations: [ SidebarTreeComponent],
  imports: [
    CommonModule
  ],
  exports: [SidebarTreeComponent]
})
export class SidebarTreeModule { }
