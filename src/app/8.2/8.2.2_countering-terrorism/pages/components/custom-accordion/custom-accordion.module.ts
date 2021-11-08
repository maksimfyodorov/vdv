import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowAccordionDataComponent } from './show-accordion-data/show-accordion-data.component';
import { RouterModule } from '@angular/router';
import { AccordionModalDataComponent } from './show-accordion-data/accordion-modal-data/accordion-modal-data.component';
import { NewCustomAccordionComponent } from './new-custom-accordion/new-custom-accordion.component';



@NgModule({
  declarations: [
    ShowAccordionDataComponent,
    AccordionModalDataComponent,
    NewCustomAccordionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
  ],
  exports: [
    NewCustomAccordionComponent,
  ],
})
export class CustomAccordionModule { }
