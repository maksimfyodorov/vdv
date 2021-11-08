import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapResizeDirective } from './map-resize.directive';


@NgModule({
  declarations: [
    MapResizeDirective,
  ],
  imports: [
    CommonModule
  ],
              exports: [
                  MapResizeDirective,
              ],
          })
export class DirectiveModule { }
