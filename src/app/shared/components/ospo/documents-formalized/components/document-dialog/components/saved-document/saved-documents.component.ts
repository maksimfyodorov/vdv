import { Component, OnInit } from '@angular/core';
import { DocumentsFormalizedService } from '../../../../services/documents-formalized.service';
import { FormalizedDocument } from '../../../../interfaces/document-formalized.interfaces';
import { Document } from '../../../../../documents/documents.types'


@Component({
  selector: 'app-saved-document',
  templateUrl: './saved-documents.component.html',
  styleUrls: ['./saved-documents.component.scss'],
})
export class SavedDocumentsComponent implements OnInit {

  public currentDocument: FormalizedDocument;
  public attachedDocuments: Document[] = [];
  private currentGroupName: string;

  constructor(private documentService: DocumentsFormalizedService) {
  }

  ngOnInit(): void {
    this.currentDocument = this.documentService.currentDocument;
    this.currentGroupName = this.documentService.currentGroupName;
    this.getDocuments();
  }

  public attacheDocument(document: Document): void {
    // todo: Реализовать метод прикрепления документа
  }

  private getDocuments(): void {
    this.documentService.getAttachedDocuments(this.currentGroupName).subscribe(res => this.attachedDocuments = res);
  }
}
