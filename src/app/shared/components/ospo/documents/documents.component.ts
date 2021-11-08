import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Document, DocumentsByGroup, File } from './documents.types';
import { DialogService } from 'primeng/dynamicdialog';
import { AttachDocumentDialogComponent } from './attach-document-dialog/attach-document-dialog.component';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent implements OnInit {

  @Input() public typeUuid: string;
  @Input() public kindUuid: string;
  @Input() public militaryUnitId: string;
  @Input() public repeat: string;
  @Input() public isViewMode = false;
  @Input() public documentsToShow: Document[];
  @Input() public documentsToShowByGroup: DocumentsByGroup[];
  @Input() public title: string;
  @Input() public hasHiddenBlocks = false;
  @Input() public hasNullifiedPaddings = false;
  @Input() public isMainDocument = false;
  @Input() public attachMode: string;
  @Input() public irzGroupUuid: string;
  @Input() public disableFilters = false;
  @Output() public detachDocument: EventEmitter<Document> = new EventEmitter<Document>();
  @Output() public attachDocument: EventEmitter<Document> = new EventEmitter<Document>();
  @Output() public currentDocumentList = new EventEmitter<any>();
  public documentsQuantity: number;

  constructor(
    private dialogService: DialogService,
  ) {
  }

  public ngOnInit(): void {
    this.calculateDocumentsQuantity();

  }

  public downloadDocument(document: Document): void {
    window.open(`/api/documents/${document.uuid}/files`, '_self');
  }

  public downloadFile(document: Document, file: File): void {
    window.open(`/api/documents/${document.uuid}/files/${file.uuid}`, '_self');
  }

  public onRemove(document: Document, groupIndex?: number): void {
    if (this.documentsToShowByGroup) {
      this.documentsToShowByGroup[groupIndex].documents = this.documentsToShowByGroup[groupIndex]
        .documents.filter(item => item.uuid !== document.uuid);
      this.detachDocument.emit(document);
      this.currentDocumentList.emit(this.documentsToShowByGroup);
    } else {
      this.documentsToShow = this.documentsToShow.filter(item => item.uuid !== document.uuid);
      this.detachDocument.emit(document);
      this.currentDocumentList.emit(this.documentsToShow);
    }

  }

  public attacheDocuments(categoryIndex?: number): void {
    this.dialogService.open(AttachDocumentDialogComponent,
      {
        header: 'Добавление документов',
        data: {
          attachMode: this.attachMode,
          disableFilters: this.disableFilters,
          irzGroupUuid: this.irzGroupUuid,
          repeat: this.repeat,
          typeUuid: this.typeUuid,
          kindUuid: this.kindUuid,
          militaryUnitId: this.militaryUnitId,
        },
      })
      .onClose.pipe(takeWhile(res => res))
      .subscribe(newDocuments => {
        newDocuments.forEach(newDocument => {
            if (this.documentsToShowByGroup) {
              if (!this.isDocumentsArrayIncludeDocument(this.documentsToShowByGroup[categoryIndex].documents, newDocument)) {
                this.attacheOneDocumentInGroup(newDocument, categoryIndex);
              }
            } else {
              if (!this.isDocumentsArrayIncludeDocument(this.documentsToShow, newDocument)) {
                this.attacheOneDocument(newDocument);
              }
            }
          },
        );
      });
  }

  private isDocumentsArrayIncludeDocument(documentsArray: Document[], document: Document): boolean {
    return Boolean(documentsArray.find(item => item.uuid === document.uuid));
  }

  private calculateDocumentsQuantity(): void {
    let quantity = 0;
    if (this.documentsToShow) {
      quantity = this.documentsToShow.length;
    }
    if (this.documentsToShowByGroup) {
      this.documentsToShowByGroup.forEach(item => quantity = quantity + item.documents.length);
    }
    this.documentsQuantity = quantity;
  }

  private attacheOneDocument(newDocument: Document): void {
    this.documentsToShow.push(newDocument);
    this.attachDocument.emit(newDocument);
    this.currentDocumentList.emit(this.documentsToShow);
  }


  private attacheOneDocumentInGroup(newDocument: Document, index: number): void {
    this.documentsToShowByGroup[index].documents.push(newDocument);
    this.attachDocument.emit(newDocument);
    this.currentDocumentList.emit(this.documentsToShowByGroup);
  }
}
