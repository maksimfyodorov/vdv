import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MilitaryUnitsSidebarComponent } from './military-units-sidebar.component';
import { NodesHierarchyModule } from '../../../nodes-hierarchy/nodes-hierarchy.module';
import { HierarchyFolderComponent } from './components/hierarchy-folder/hierarchy-folder.component';
import { LoaderService } from '../../../loader/loader.service';
import { LoaderDirectiveModule } from '../../../../directives/loader/loader-directive.module';



@NgModule({
  declarations: [MilitaryUnitsSidebarComponent, HierarchyFolderComponent],
  exports: [
    MilitaryUnitsSidebarComponent,
    HierarchyFolderComponent,
  ],
  imports: [
    CommonModule,
    NodesHierarchyModule,
    LoaderDirectiveModule,
  ],
  providers: [
    LoaderService,
  ]
})
export class MilitaryUnitsSidebarModule { }
