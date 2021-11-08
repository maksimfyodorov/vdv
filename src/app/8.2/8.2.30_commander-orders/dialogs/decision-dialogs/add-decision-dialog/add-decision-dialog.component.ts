import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Document } from '../../../../../shared/components/ospo/documents/documents.types';
import { AddOrderDialogService } from '../../../services/add-order-dialog.service';
import { Order } from '../../../types/order.types';
import { Decision } from '../../../types/decision.types';
import { LoaderService } from '../../../../../shared/components/loader/loader.service';
import { AddDecisionDialogService } from '../../../services/add-decision-dialog.service';

@Component({
  selector: 'app-add-decision-dialog',
  templateUrl: './add-decision-dialog.component.html',
  styleUrls: ['./add-decision-dialog.component.scss'],
})
export class AddDecisionDialogComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public order: Order = this.config.data.order;
  public orderDescription: string = this.order?.description;
  public decisionToEdit: Decision;
  public isViewMode = false;

  constructor(
    protected config: DynamicDialogConfig,
    protected fb: FormBuilder,
    protected dialogRef: DynamicDialogRef,
    protected addOrderDialogService: AddOrderDialogService,
    public loader: LoaderService,
    protected addDecisionDialogService: AddDecisionDialogService,
    protected renderer: Renderer2,
  ) {
  }

  public ngOnInit(): void {
    this.buildForm();
    this.form.get('date').setValue(new Date(new Date()));
    this.addClassToBody();
  }

  public ngOnDestroy(): void {
    this.removeClassFromBody();
  }

  public documentsChanged(event: Document[]) {
    this.form.get('documents').setValue(event);
  }

  public addDecision(): void {
    this.setFormValue();

    this.loader.startLoading(this.addDecisionDialogService.addDecision(this.form.value, this.order.uuid))
      .subscribe(res => {
        this.dialogRef.close(res);
      });
  }

  public cancelChanges(): void {
    this.dialogRef.close();
  }

  protected setFormValue(): void {
    const formValues = {
      documents: this.form.value.documents.map(item => ({ uuid: item.uuid })),
    };

    this.form.patchValue(formValues);
    !this.form.value.progress && delete this.form.value.progress;
    this.addOrderDialogService.formatDate(this.form.value);
  }

  private buildForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      date: [null, Validators.required],
      decision: [null, Validators.required],
      progress: [null],
      documents: [[]],
    });
  }

  private addClassToBody(): void {
    this.renderer.addClass(document.body, 'commander-orders-overflow-hidden');
  }

  private removeClassFromBody(): void {
    this.renderer.removeClass(document.body, 'commander-orders-overflow-hidden');
  }
}
