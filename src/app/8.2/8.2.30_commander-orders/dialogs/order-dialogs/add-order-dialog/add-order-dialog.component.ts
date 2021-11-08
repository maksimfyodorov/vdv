import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Document } from '../../../../../shared/components/ospo/documents/documents.types';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddOrderDialogService } from '../../../services/add-order-dialog.service';
import { Customer } from '../../../types/customer.types';
import { Order } from '../../../types/order.types';
import { MilitaryUnit } from '../../../../../shared/components/ospo/military-units/military-units-modal/interfaces/interface';
import { takeWhile } from 'rxjs/operators';
import { CoordinatesDialogService } from '../../../../../shared/components/ospo/ospo-coordinates/services/coordinates-dialog.service';
import { MilitaryMen } from '../../../../../shared/components/military/interfaces';
import { SelectionTreeService } from '../../../../../8.1/8.1.4_uav-information/components/uav-node-folder/services/selection-tree.service';
import { environment } from '../../../../../../environments/environment';
import { utils } from 'ues';
import { Mark } from '../../../../../shared/components/ospo/ospo-coordinates/types/mark';
import { LoaderService } from '../../../../../shared/components/loader/loader.service';

@Component({
  selector: 'app-add-order-dialog',
  templateUrl: './add-order-dialog.component.html',
  styleUrls: ['./add-order-dialog.component.scss'],
  providers: [AddOrderDialogService, LoaderService],
})
export class AddOrderDialogComponent implements OnInit, OnDestroy {

  public selectedMilitaryUnit: number = this.config.data.selectedMilitaryUnit;
  public customers: Customer[] = [];
  public editedCustomer: Customer;
  public form: FormGroup;
  public coExecutors: FormArray;
  public orderToEdit: Order;
  public dislocationPoint: Mark;
  public militaryUnit: MilitaryUnit;
  public coExecutorMilitaryUnit: MilitaryUnit;
  public appointment: MilitaryMen;
  public executorMilitaryUnitId: number;
  public isViewMode = false;

  constructor(
    protected fb: FormBuilder,
    protected dialogRef: DynamicDialogRef,
    protected addOrderDialogService: AddOrderDialogService,
    protected config: DynamicDialogConfig,
    protected coordinatesService: CoordinatesDialogService,
    protected selectionTreeService: SelectionTreeService,
    public loader: LoaderService,
    protected renderer: Renderer2,
  ) {
  }

  public ngOnInit(): void {
    this.getCustomers();
    this.buildForm();
    this.setProxyUesMapUrl();
    this.addClassToBody();
  }

  public ngOnDestroy(): void {
    this.removeClassFromBody();
  }

  public getCustomers(): void {
    !this.isViewMode && this.loader.startLoading(this.addOrderDialogService.getCustomers()).subscribe(res => {
      this.customers = res;
    });
  }

  private buildForm(): void {
    this.form = this.fb.group({
      customer_uuid: [null, Validators.required],
      name: [null, Validators.required],
      description: [null, Validators.required],
      date_of_receipt: [null, Validators.required],
      incoming_number: [null, Validators.required],
      term_of_execution: [null, Validators.required],
      coordinate_uuid: [null],
      military_unit_id: [null],
      executor: this.fb.group({
        shdk_uuid: [null, Validators.required],
        military_unit_id: [null, Validators.required],
      }),
      co_executors: this.fb.array([this.createCoExecutor()]),
      document_uuid: [null],
      document: [[], Validators.required],
      additional_documents: [[]],
    });
  }

  protected createCoExecutor(): FormGroup {
    return this.fb.group({
      shdk_uuid: null,
      military_unit_id: null,
    });
  }

  public addCoExecutor(): void {
    this.coExecutors = this.form.get('co_executors') as FormArray;
    this.coExecutors.push(this.createCoExecutor());
  }

  public deleteCoExecutor(): void {
    this.coExecutors.controls.pop();
    this.coExecutors.value.pop();
  }

  public resetCoExecutor(): void {
    const militaryMan = {
      shdk_uuid: { military_man: null },
    };
    const resetedCoExecutor = {
      shdk_uuid: null,
      military_unit_id: null,
    };

    this.coExecutors = this.form.get('co_executors') as FormArray;
    this.coExecutors.controls[0].patchValue(militaryMan);
    this.coExecutors.controls[0].patchValue(resetedCoExecutor);
  }

  public openOSPOCoordinatesWithHeight(): void {
    this.coordinatesService.openOSPOCoordinatesWithHeight().pipe(
      takeWhile(res => Boolean(res)),
    ).subscribe(res => {
      this.dislocationPoint = res;
    });
  }

  private setProxyUesMapUrl(): void {
    utils.setProxyUrl(environment.pkrooUrl);
  }

  public orderInDocumentsChanged($event: Document[]) {
    this.form.get('document').setValue($event);
  }

  public documentsChanged($event: Document[]): void {
    this.form.get('additional_documents').setValue($event);
  }

  protected setFormValue(): void {
    const formValues = {
      customer_uuid: this.form.get('customer_uuid').value.uuid,
      military_unit_id: this.selectedMilitaryUnit,
      coordinate_uuid: this.dislocationPoint?.uuid || this.orderToEdit?.coordinate?.uuid,
      executor: {
        shdk_uuid: this.form.get('executor').value?.shdk_uuid?.shdk_uuid,
      },
      document_uuid: this.form.value?.document[0]?.uuid,
      additional_documents: this.form.value.additional_documents.map(item => ({ uuid: item.uuid })),
    };

    this.form.patchValue(formValues);
    this.setCoExecutorsValue();
    this.checkForNullCoExecutor();
    delete this.form.value.document;
    this.addOrderDialogService.formatDate(this.form.value);
  }

  private setCoExecutorsValue(): void {
    this.form.get('co_executors').value.forEach(item => {
      if (item.shdk_uuid?.shdk_uuid) {
        item.shdk_uuid = item.shdk_uuid.shdk_uuid;
        return;
      }
      item.shdk_uuid = null;
    });
  }

  private checkForNullCoExecutor(): void {
    const coExecutors = this.form.get('co_executors').value;
    const lastCoExecutor = coExecutors[coExecutors.length - 1];

    if (coExecutors.length > 1 && !lastCoExecutor.shdk_uuid && !lastCoExecutor.military_unit_id) {
      coExecutors.splice(coExecutors.length - 1, 1);
    }
  }

  public addOrder(): void {
    this.setFormValue();

    this.loader.startLoading(
      this.addOrderDialogService.addOrder(this.form.value))
      .subscribe(res => {
        this.dialogRef.close(res);
      });
  }

  public createCustomer($event: string): void {
    const requestBody = { name: $event };
    this.loader.startLoading(this.addOrderDialogService.createCustomer(requestBody)).subscribe(res => {
      this.customers.push(res);
      const customer = res;
      this.editedCustomer = { ...customer };
    });
  }

  public editCustomer($event: Customer): void {
    const customer = $event;
    this.addOrderDialogService.openEditCustomerNameDialog($event).subscribe(res => {
      customer.name = res.msg;
      this.customers = this.customers.map(item => item.uuid === customer.uuid ? customer : item);
      this.editedCustomer = { ...customer };
    });
  }

  public deleteCustomer($event: Customer): void {
    const customerUuid = $event.uuid;
    this.loader.startLoading(this.addOrderDialogService.deleteCustomer(customerUuid)).subscribe(_ => {
      this.customers = this.customers.filter(item => item.uuid !== customerUuid);
    });
  }

  private addClassToBody(): void {
    this.renderer.addClass(document.body, 'commander-orders-overflow-hidden');
  }

  private removeClassFromBody(): void {
    this.renderer.removeClass(document.body, 'commander-orders-overflow-hidden');
  }

}
