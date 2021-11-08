import { Component, OnDestroy, OnInit, Self } from '@angular/core';
import {
  DocumentKind,
  Group,
  DocumentMode,
  DocumentPreview,
  QueryParams,
  AttachDialogMode, DocumentType,
} from './attach-document-dialog.types';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormControl, FormGroup } from '@angular/forms';
import { debounce, filter } from 'rxjs/operators';
import { SubscriptionLike, timer } from 'rxjs';
import { AttachDocumentDialogService } from './attach-document-dialog.service';
import { HttpParams } from '@angular/common/http';
import { LoaderService } from '../../../loader/loader.service';
import { Document } from '../documents.types';
import { IrzGroupService } from '../../../../services/irz-group.service';

@Component({
  selector: 'app-attach-document-dialog',
  templateUrl: './attach-document-dialog.component.html',
  styleUrls: ['./attach-document-dialog.component.scss'],
  providers: [LoaderService]
})
export class AttachDocumentDialogComponent implements OnInit, OnDestroy {

  public set selectedDocuments(value: DocumentPreview | DocumentPreview[]) {
    if (Array.isArray(value)) {
      this._selectedDocuments = value;
    } else {
      this._selectedDocuments = [value];
    }
  }

  public get selectedDocuments(): DocumentPreview | DocumentPreview[] {
    return this._selectedDocuments;
  }

  public _selectedDocuments: DocumentPreview[] = [];
  public dialogMode: AttachDialogMode = 'multiple';
  public groups: Group[];
  public kinds: DocumentKind[];
  public types: DocumentType[];
  public mus: any;
  public documents: DocumentPreview[];
  public filterForm: FormGroup;
  public totalDocuments: any;
  public documentMode: DocumentMode = 'create';
  public currentDocumentId: string;
  public documentsPerPage = 10;
  public showControls = true;
  private subscriptionFilter: SubscriptionLike;
  private queryParams: QueryParams = {};
  private attachableDocuments: Document[] = [];
  private subFilterKind: SubscriptionLike;


  constructor(
    @Self() public loaderService: LoaderService,
    private documentService: AttachDocumentDialogService,
    private dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private irzGroupService: IrzGroupService,
  ) {
  }

  public ngOnInit(): void {
    this.checkConfigControls();
    this.checkAttachDialogMode();
    this.createFilerForm();
    this.subscribeToFilterForm();
    this.getKinds();
    this.getGroups();
    this.defineSelectedParams();
    this.defineDisableFilters();
  }

  public ngOnDestroy(): void {
    this.subscriptionFilter.unsubscribe();
    this.subFilterKind.unsubscribe();
  }

  private defineSelectedParams(): void {
    enum selectableParams {
      militaryUnitId= 'military_unit_id',
      kindUuid = 'kind_uuid',
      typeUuid = 'type_uuid',
      repeat = 'repeat',
      irzGroupUuid = 'group_uuid',
    }

    for (const key in selectableParams) {
      if (this.config.data[key]) {
        this.filterForm.get(selectableParams[key]).setValue(this.config.data[key]);
      }
    }
  }

  private defineDisableFilters(): void {
    if (this.config.data.disableFilters) {
      this.filterForm.disable();
      this.filterForm.get('name').enable();
    }
  }

  private getGroups(): void {
    this.groups = this.irzGroupService.irzGroups as Group[];
  }

  private getDocuments(httpParams?: HttpParams): void {
    this.loaderService.startLoading(this.documentService.getDocuments(httpParams))
      .subscribe(res => {
        this.documents = res.result;
        this.totalDocuments = res.count;
        if (this.config.data?.selectedDocuments) {
          this.pushPreselectedDocuments(this.config.data?.selectedDocuments);
        }
      });
  }

  private getKinds(): void {
    this.loaderService.startLoading(this.documentService.getKinds())
      .subscribe(res => {
        this.kinds = res.result;
      });
  }

  private createFilerForm(): void {
    this.filterForm = new FormGroup({
      group_uuid: new FormControl(),
      kind_uuid: new FormControl(),
      type_uuid: new FormControl({ value: null, disabled: true}),
      military_unit_id: new FormControl(),
      name: new FormControl(),
    });
    this.subFilterKind = this.filterForm.get('kind_uuid').valueChanges
      .pipe(filter(res => !!res))
      .subscribe(kindUuid => this.getTypes(kindUuid));
  }

  private subscribeToFilterForm(): void {
    this.subscriptionFilter = this.filterForm.valueChanges.pipe(
      filter(query => !query.name || query.name?.length > 3 || query.name.length === 0),
      debounce(() => timer(500)))
      .subscribe(res => {
        this.applyFilter(res);
      });
  }

  public cancelDialog(): void {
    this.dialogRef.close();
  }

  public attachChosenDocuments(): void {
    this.prepareAttachableDocuments();
    if (this.config.data?.addRegulation) {
      const uuid = {
        document_uuid: this.attachableDocuments[0].uuid
      }
      this.documentService.postRegulation(uuid).subscribe(() => this.dialogRef.close(this.attachableDocuments))
    }
    else{
      this.dialogRef.close(this.attachableDocuments);
    }
  }

  private prepareAttachableDocuments(): void {
    this._selectedDocuments?.forEach(document => this.attachableDocuments
      .push({
        uuid: document.uuid,
        name: document.name,
        files: document.files,
        date: document.date,
        number: document.number,
        user: document.user,
        created_at: document.created_at,
      }));
  }

  public applyFilter(params?: QueryParams): void {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        if (params[key] === null) {
          delete params[key];
        }
      }
    }
    this.queryParams = { ...this.queryParams, ...params, limit: this.documentsPerPage };
    if (params.military_unit_id) {
      this.queryParams = {...this.queryParams, repeat: 'Admittance' };
    }
    this.getDocuments(this.createHttpParams());
  }

  private createHttpParams(): HttpParams {
    let httpParams = new HttpParams();
    for (const key in this.queryParams) {
      if (this.queryParams.hasOwnProperty(key)) {
        httpParams = httpParams.append(key, this.queryParams[key]);
      }
    }
    return httpParams;
  }

  public lazyLoadDocuments(event: any): void {
    this.determineSort(event);
    this.applyFilter({
      limit: this.documentsPerPage,
      offset: event.first,
    });
  }

  private determineSort(event): void {
    if (event.sortField) {
      this.queryParams['order_by'] = (`${event.sortField}:${event.sortOrder === 1 ? 'asc' : 'desc'}`);
    }
  }

  public showDocument($event: any): void {
    this.currentDocumentId = $event.uuid;
    this.documentMode = 'view';
  }

  public changeDocumentMode($event: any): void {
    this.documentMode = $event;
  }

  public reloadDocumentsList(): void {
    this.getDocuments(this.createHttpParams());
  }

  private pushPreselectedDocuments(preselected: DocumentPreview | DocumentPreview[]): void {
    if (Array.isArray(preselected)) {
      this._selectedDocuments = this._selectedDocuments.concat(preselected as DocumentPreview[]);
    } else {
      this._selectedDocuments.push(preselected as DocumentPreview);
    }
  }

  private checkAttachDialogMode(): void {
    if (this.config?.data?.attachMode) {
      this.dialogMode = this.config.data.attachMode;
    }
  }

  private checkConfigControls(): void {
    if (this.config?.data?.hasOwnProperty('showControls')) {
      this.showControls = this.config?.data?.showControls;
    }
  }

  public getTypes($event: any): void {
    this.loaderService.startLoading(this.documentService
      .getTypes(new HttpParams()
        .append('document_kind_id', $event.value)))
      .subscribe(res => {
        this.types = res.result;
        this.filterForm.get('type_uuid').enable();
      });
  }
}
