import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, Renderer2, Self } from '@angular/core';
import { DocumentsFormalizedService } from '../../services/documents-formalized.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AddOrderDialogService } from '../../../../../../8.2/8.2.30_commander-orders/services/add-order-dialog.service';
import { Observable } from 'rxjs';
import { LoaderService } from '@app/shared/components/loader/loader.service';

@Component({
  selector: 'app-document-dialog',
  templateUrl: './document-dialog.component.html',
  styleUrls: ['./document-dialog.component.scss'],
  providers: [LoaderService],
})
export class DocumentDialogComponent implements OnInit, AfterViewInit, OnDestroy {

  public get configData(): unknown {
    return this.config.data;
  }

  public get isLoading$(): Observable<boolean> {
    return this.loader.isLoading$;
  }

  public templateMenuItems: { label: string, url: string }[];
  public currentDocumentPrintLink;
  public documentDialogControl = new FormControl(null, Validators.required);

  constructor(
    private readonly documentService: DocumentsFormalizedService,
    private readonly config: DynamicDialogConfig,
    private readonly dialogRef: DynamicDialogRef,
    private readonly fb: FormBuilder,
    private readonly addOrderDialogService: AddOrderDialogService,
    private readonly renderer: Renderer2,
    private readonly changeDetectorRef: ChangeDetectorRef,
    @Self()
    private readonly loader: LoaderService,
  ) {
  }

  public ngOnInit(): void {
    this.templateMenuItems = this.generateTemplateLinksList();
    this.generateCurrentDocumentLink();
    this.addClassToBody();
  }

  public ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  public ngOnDestroy(): void {
    this.removeClassFromBody();
  }

  public downloadFile(url: string): void {
    window.open(url);
  }

  public printDocument(): void {
    window.open(this.currentDocumentPrintLink);
  }

  public handleAction(actionType: string): void {
    this.setPeriodsValue(this.documentDialogControl.value?.periods);
    this.documentService.periods = this.documentDialogControl.value.periods;
    this.documentService.military_units = this.documentDialogControl.value.military_units;
    this.documentService.signers = this.documentDialogControl.value.signers;
    this.documentService.approvers = this.documentDialogControl.value.approvers;
    this.documentService.coordinators = this.documentDialogControl.value.coordinators;

    setTimeout(() => this.documentService.actionType = actionType, 1);

    this.dialogRef.close();
  }

  private generateTemplateLinksList(): { label: string, url: string }[] {
    const files = this.documentService.currentDocument.files;
    const currentGroup = this.documentService.currentGroupName;
    return files.map(item => {
      return {
        label: item.type,
        url: `/assets/other/formalized_documents/${currentGroup}/${item.name}`,
      };
    });
  }

  private generateCurrentDocumentLink(): void {
    const fileName = this.documentService.currentDocument.files.find(item => item.type === 'PDF')?.name;
    const group = this.documentService.currentGroupName;
    this.currentDocumentPrintLink = fileName ? `/assets/other/formalized_documents/${group}/${fileName}` : undefined;
  }

  private setPeriodsValue(array: any): void {
    array && array.forEach(item => {
      item.periodValue = item.periodValue[item.period] || item.periodValue.year;
      if (item.period === 'day' || item.period === 'month') this.addOrderDialogService.formatDate(item);
      if (item.period === 'periods') {
        delete item.periodValue.periodsOfYear;
        delete item.periodValue.selectedPeriodUuid;
      }
    });
  }

  private addClassToBody(): void {
    this.renderer.addClass(document.body, 'overflow-hidden');
  }

  private removeClassFromBody(): void {
    this.renderer.removeClass(document.body, 'overflow-hidden');
  }
}
