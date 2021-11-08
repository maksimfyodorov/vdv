import { CategoryHierarchyComponent } from './category-hierarchy.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TreeModule} from 'primeng/tree';
import { LoaderDirectiveModule } from '../../../../directives/loader/loader-directive.module';
import {ButtonModule} from 'primeng/button';


@NgModule({
  declarations: [
    CategoryHierarchyComponent,
  ],
  imports: [
    CommonModule,
    TreeModule,
    LoaderDirectiveModule,
    ButtonModule,
  ],
  exports: [
    CategoryHierarchyComponent
  ]
})
export class CategoryHierarchyModule { }
