import { Component, Input, OnInit } from '@angular/core';
import { DocumentCreateComponent } from './document-create.component';
import { Document } from '../attach-document-dialog.types';
import { ConfirmationDialogComponent } from '../../../../confirmation-dialog/confirmation-dialog.component';
import { mergeMap, takeWhile } from 'rxjs/operators';
import { FileToShow } from './components/upload-files/uploaded-files.types';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentEditComponent extends DocumentCreateComponent implements OnInit{

  @Input() set currentDocumentId(value: string) {
    this._documentId = value;
    this.getDocument();
  }

  get currentDocumentId(): string {
    return this._documentId;
  }

  private _documentId: string;
  public document: Document;
  public mode = 'edit';
  public title = 'Редактор документа';

  public save(): void {
    this.createFormData();
    this.formData.append('deleted_files', JSON.stringify(this.attachedFiles?.deleted ? this.attachedFiles?.deleted : []));
    this.loaderService.startLoading(this.documentService.patchDocument(this.document.uuid, this.formData))
      .subscribe(() => {
        this.reloadDocumentsList.emit();
        this.switchDocumentMode('create');
      });
    this.filesToShow = [] as FileToShow[];
    this.newDocumentForm.reset();
  }

  protected appendValuesInFormDataFromForm(): void {
    const notRequiredFields: string[] = ['kind', 'type'];
    for (const key in this.newDocumentForm.value) {
      if (this.newDocumentForm.value.hasOwnProperty(key) && !notRequiredFields.includes(key)) {
        if (this.newDocumentForm.get(key).value !== this.document[key]) {
          this.formData.append(key, this.newDocumentForm.get(key).value);
        }
      }
    }
  }

  public delete(): void {
    this.dialogService.open(ConfirmationDialogComponent,
      {
        header: `Удалить ${this.document.name}?`,
        data: {
          message: `Документ будет удален.`
        }
      }).onClose.pipe(
      takeWhile(res => res),
      mergeMap(_ => this.documentService.deleteDocument(this.document.uuid)))
      .subscribe(() => {
        this.reloadDocumentsList.emit();
        this.changeDocumentModeEvent.emit('create');
      });
  }

  private updateFormValues(): void {
    if (this.newDocumentForm) {
      this.newDocumentForm.setValue({
        kind: this.document.kind.uuid,
        type: this.document.type.uuid,
        name: this.document.name,
        date: this.document.date,
        number: this.document.number,
        military_unit_id: this.document.military_unit.id,
        summary: this.document.summary
      });
      this.updateCustomFields();
      this.enableForm();
    }
  }
  private getDocument(): void{
    this.loaderService.startLoading(this.documentService.getDocument(this._documentId))
      .subscribe(res => {
      this.document = res;
      this.filesToShow = res.files;
      this.getTypes(this.document.kind?.uuid);
      this.updateFormValues();
    });
  }

  private updateCustomFields(): void {
    this.selectedType = this.document.type;
  }
}
