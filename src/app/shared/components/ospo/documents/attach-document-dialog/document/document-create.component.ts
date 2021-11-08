import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  Document,
  DocumentKind,
  DocumentType,
  Group,
} from '../attach-document-dialog.types';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AttachedFiles, FileToShow } from './components/upload-files/uploaded-files.types';
import { AttachDocumentDialogService } from '../attach-document-dialog.service';
import { HttpParams } from '@angular/common/http';
import { LoaderService } from '../../../../loader/loader.service';
import { PromptDialogComponent } from '../../../../prompt-dialog/prompt-dialog.component';
import { mergeMap, takeWhile } from 'rxjs/operators';
import { DialogService } from 'primeng/dynamicdialog';
import { DeleteTypeErrorComponent } from './components/delete-type-error/delete-type-error.component';
import { IrzGroupService } from '../../../../../services/irz-group.service';

@Component({
  selector: 'app-document-create',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
})
export class DocumentCreateComponent implements OnInit {

  @Input() public kinds: DocumentKind[];
  @Output() public changeDocumentModeEvent = new EventEmitter<string>();
  @Output() public reloadDocumentsList = new EventEmitter<void>();
  public title = 'Новый документ';
  public mode = 'create';
  public groups: Group[];
  public documents: Document[];
  public types: DocumentType[];
  public selectedType: DocumentType;
  public defaultDate: Date = new Date();
  public newDocumentForm: FormGroup;
  public attachedFiles: AttachedFiles;
  public filesToShow: FileToShow[] = [];
  public isTypeDisabled = true;
  protected groupId: string;
  protected formData: FormData;

  constructor(
    public loaderService: LoaderService,
    public irzGroupService: IrzGroupService,
    protected documentService: AttachDocumentDialogService,
    protected dialogService: DialogService,
  ) {
    this.createForm();
  }

  public ngOnInit(): void {
    this.determineGroupId();
  }

  private createForm(): void {
    this.newDocumentForm = new FormGroup({
      kind: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      military_unit_id: new FormControl('', Validators.required),
      summary: new FormControl(''),
    });
  }

  public applyFiles($event: AttachedFiles): void {
    this.attachedFiles = $event;
  }

  public save(): void {
    this.createFormData();
    this.formData.append('group_uuid', this.groupId);
    this.loaderService.startLoading(this.documentService.postDocument(this.formData))
      .subscribe(() => {
        this.reloadDocumentsList.emit();
      });
    this.newDocumentForm.reset();
    this.resetCustomFields();
    this.filesToShow = [] as FileToShow[];
  }

  private resetCustomFields(): void {
    this.selectedType = null;
  }

  protected createFormData(): void {
    this.formData = new FormData();
    this.appendValuesInFormDataFromForm();
    this.attachedFiles?.uploaded.forEach((res, index) => {
      this.formData.append(`new_file_${index}`, res);
    });
  }

  protected appendValuesInFormDataFromForm(): void {
    const notRequiredFields: string[] = ['kind', 'type'];
    for (const key in this.newDocumentForm.value) {
      if (this.newDocumentForm.value.hasOwnProperty(key) && !notRequiredFields.includes(key)) {
        this.formData.append(key, this.newDocumentForm.get(key).value);
      }
    }
    this.formData.append('type_uuid', this.newDocumentForm.get('type').value);
  }

  public switchDocumentMode(value: string): void {
    this.changeDocumentModeEvent.emit(value);
  }

  public setKind($event): void {
    this.getTypes($event.value);
    this.newDocumentForm.get('type').setValue('');
  }

  protected getTypes(kind_id: string): void {
    this.loaderService.startLoading(this.documentService
      .getTypes(new HttpParams()
        .append('document_kind_id', kind_id)))
      .subscribe(res => {
        this.types = res.result;
        this.enableForm();
      });
  }

  protected enableForm(): void {
    if (this.mode === 'edit' || this.mode === 'create') {
      this.isTypeDisabled = false;
    }
  }

  private determineGroupId(): void {
    this.groupId = this.irzGroupService.determineIrzGroup(window.location.pathname.slice(1));
  }

  public createType($event: any): void {
    this.documentService.createType({ name: $event, kind_uuid: this.newDocumentForm.get('kind').value })
      .subscribe(res => {
        this.types.push(res);
        this.selectedType = res;
      });
  }

  public deleteType($event: any): void {
    this.documentService.deleteType($event.uuid).subscribe(() => {
      this.types = this.types.filter(item => item.uuid !== $event.uuid);
    }, error => {
      if (error.error.message.includes('foreign key violation')) {
        this.dialogService.open(DeleteTypeErrorComponent, { header: 'Ошибка' });
      }
    });
  }

  public editType($event: any): void {
    this.dialogService.open(PromptDialogComponent, {
      header: 'Изменение типа документа',
      data: $event.name,
    }).onClose.pipe(
      takeWhile(res => res),
      mergeMap(newName => this.documentService.patchType($event.uuid, { name: newName })))
      .subscribe((res) => {
        const edited = this.types.find(item => res.uuid === item.uuid);
        edited.name = res.name;
        this.selectedType = res;
      });
  }

  public selectType($event: any): void {
    this.newDocumentForm.get('type').setValue($event?.uuid);
  }

}

