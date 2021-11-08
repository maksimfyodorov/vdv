import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowToDirective } from './show-to.directive';



@NgModule({
  declarations: [ShowToDirective],
  exports: [
    ShowToDirective,
  ],
  imports: [
    CommonModule,
  ],
})
export class ShowToModule { }
