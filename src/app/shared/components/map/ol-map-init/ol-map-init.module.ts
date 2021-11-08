import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OlMapInitComponent } from './components/ol-map-init/ol-map-init.component';

@NgModule({
  declarations: [
    OlMapInitComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    OlMapInitComponent,
  ],
})
export class OlMapInitModule { }
