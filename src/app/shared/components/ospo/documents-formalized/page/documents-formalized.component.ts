import { Component, Input, OnInit } from '@angular/core';
import { DocumentsFormalizedService } from '../services/documents-formalized.service';
import { FormalizedDocument } from '../interfaces/document-formalized.interfaces';
import { DialogService } from 'primeng/dynamicdialog';
import { DocumentDialogComponent } from '../components/document-dialog/document-dialog.component';
import { takeWhile } from 'rxjs/operators';
import { DOCUMENT_CONFIG, DocumentConfig } from '../interfaces/document-config.interfaces';

@Component({
  selector: 'app-documents-formalized',
  templateUrl: './documents-formalized.component.html',
  styleUrls: ['./documents-formalized.component.scss'],
  providers: [DialogService],
})
export class DocumentsFormalizedComponent implements OnInit {

  @Input()
  public documentConfig: DocumentConfig;

  public get groupName(): string {
    return this.documentService.currentGroupName;
  }

  @Input()
  public set groupName(value: string) {
    this.documentService.currentGroupName = value;
  }

  public documents: FormalizedDocument[];

  constructor(
    private readonly documentService: DocumentsFormalizedService,
    private readonly dialogService: DialogService,
  ) {
  }

  public ngOnInit(): void {
    this.getDocuments();
  }

  public openDocument(document: FormalizedDocument): void {
    const documentConfig = this.defineDocumentConfig();

    if (!document.disabled) {
      this.documentService.currentDocument = document;
      this.dialogService.open(DocumentDialogComponent, {
        width: '1000px',
        header: document.name,
        data: documentConfig,
      }).onClose
        .pipe(takeWhile(res => Boolean(res)));
    }
  }

  private defineDocumentConfig(): DocumentConfig {
    return {
      periods: {
        ...DOCUMENT_CONFIG.periods,
        ...this.documentConfig?.periods,
      },
      militaryUnits: {
        ...DOCUMENT_CONFIG.militaryUnits,
        ...this.documentConfig?.militaryUnits,
      },
      signers: {
        ...DOCUMENT_CONFIG.signers,
        ...this.documentConfig?.signers,
      },
      approvers: {
        ...DOCUMENT_CONFIG.approvers,
        ...this.documentConfig?.approvers,
      },
      coordinators: {
        ...DOCUMENT_CONFIG.coordinators,
        ...this.documentConfig?.coordinators,
      },
      militaryUnit: this.documentConfig?.militaryUnit ? this.documentConfig.militaryUnit : null,
    };
  }

  private getDocuments(): void {
    this.documentService.getDocuments(this.groupName).subscribe(res => {
      this.documentService.documents = res;
      this.documents = this.documentService.documents;
    });
  }
}
