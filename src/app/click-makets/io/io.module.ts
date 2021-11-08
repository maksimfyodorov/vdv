import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IoRoutingModule } from './io-routing.module';
import { IoComponent } from './io.component';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [IoComponent],
  imports: [
    CommonModule,
    IoRoutingModule,
    ButtonModule,
  ],
})
export class IoModule { }
