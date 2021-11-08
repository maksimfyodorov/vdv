import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIfEmitterDirective } from './ng-if-emitter.directive';



@NgModule({
            declarations: [
              NgIfEmitterDirective,
            ],
            exports: [
              NgIfEmitterDirective,
            ],
            imports: [
              CommonModule,
            ],
          })
export class NgIfEmitterModuleModule { }
