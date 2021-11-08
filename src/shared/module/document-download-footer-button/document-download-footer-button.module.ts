import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentDownloadFooterButtonComponent } from './document-download-footer-button.component';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [ DocumentDownloadFooterButtonComponent ],
  imports: [
    CommonModule,
    ButtonModule,
  ],
  exports: [
    DocumentDownloadFooterButtonComponent,
  ],
})
export class DocumentDownloadFooterButtonModule { }
