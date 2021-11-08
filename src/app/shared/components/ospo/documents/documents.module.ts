import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsComponent } from './documents.component';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { AttachDocumentDialogService } from './attach-document-dialog/attach-document-dialog.service';
import { LoaderService } from '../../loader/loader.service';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService } from 'primeng/dynamicdialog';
import { MatExpansionModule } from '@angular/material/expansion';



@NgModule({
  declarations: [DocumentsComponent],
  imports: [
    CommonModule,
    ButtonModule,
    AccordionModule,
    TooltipModule,
    MatExpansionModule,
  ],
  exports: [
    DocumentsComponent,
  ],
  providers: [
    AttachDocumentDialogService,
    LoaderService,
    DialogService,
  ]
})
export class DocumentsModule { }
