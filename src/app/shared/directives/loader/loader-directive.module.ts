import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderDirective } from './loader.directive';
import { LoaderModule } from '../../components/loader/loader.module';

@NgModule({
  declarations: [LoaderDirective],
  exports: [
    LoaderDirective,
  ],
  imports: [
    CommonModule,
    LoaderModule,
  ],
})
export class LoaderDirectiveModule { }
