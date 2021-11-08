import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputDelayDirective } from './input-delay.directive';


@NgModule({
  declarations: [InputDelayDirective],
  exports: [
    InputDelayDirective,
  ],
  imports: [
    CommonModule,
  ],
})
export class InputDelayModule { }
