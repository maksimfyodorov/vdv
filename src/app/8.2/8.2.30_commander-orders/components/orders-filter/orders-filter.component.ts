import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddOrderDialogService } from '../../services/add-order-dialog.service';
import { OrdersFilterService } from '../../services/orders-filter.service';
import { LoaderService } from '../../../../shared/components/loader/loader.service';
import { HttpParams } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';

export interface OrdersFilterCheckbox {
  checked: boolean;
  label: string;
  status: string;
}

export const CHECKBOXES: OrdersFilterCheckbox[] = [
  { label: 'Выполнено', checked: false, status: 'green' },
  { label: 'Истекает', checked: false, status: 'yellow' },
  { label: 'Просрочено', checked: false, status: 'red' },
];

@Component({
  selector: 'app-orders-filter',
  templateUrl: './orders-filter.component.html',
  styleUrls: ['./orders-filter.component.scss'],
  providers: [OrdersFilterService],
})
export class OrdersFilterComponent implements OnInit {

  @Output() public orders = new EventEmitter<any[]>();

  public form: FormGroup;
  public checkboxes: OrdersFilterCheckbox[] = CHECKBOXES;
  public isFormEmpty = true;
  public statusesModel = new SelectionModel<string>(true);

  constructor(
    private readonly fb: FormBuilder,
    private readonly addOrderDialogService: AddOrderDialogService,
    private readonly ordersFilterService: OrdersFilterService,
    private readonly loader: LoaderService,
  ) { }

  public ngOnInit(): void {
    this.buildForm();
    this.updateStatusControl();

    this.form.valueChanges.subscribe(formValue => {
      this.checkForm(formValue);
    });
  }

  public filterOrders(): void {
    this.setFormValue();
    const params = this.createHttpParams();

    this.loader.startLoading(this.ordersFilterService.filterOrders(params))
      .subscribe(res => {
        this.orders.emit(res);
        this.resetForm();
      });
  }

  public resetForm(): void {
    this.setFormValue();
    this.form.reset();
    this.statusesModel.clear();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      rd_start: [null],
      rd_end: [null],
      ed_start: [null],
      ed_end: [null],
      status: [null],
      executor: [null],
      mu: [null],
    });
  }

  private updateStatusControl(): void {
    this.statusesModel.changed.subscribe(() => {
      const statusesSelected = this.statusesModel.selected;
      const statuses = statusesSelected.length ? statusesSelected : null;

      this.form.get('status').setValue(statuses);
    });
  }

  private checkForm(formValue: unknown): void {
    this.isFormEmpty = true;

    Object.values(formValue).forEach(item => {
      if (item !== null) {
        this.isFormEmpty = false;
      }
    });
  }

  private setFormValue(): void {
    const formValues = {
      executor: this.form.get('executor').value?.shdk_uuid || null,
    };
    this.form.patchValue(formValues);
    this.addOrderDialogService.formatDate(this.form.value);
  }

  private createHttpParams(): HttpParams {
    let params = new HttpParams();

    Object.entries(this.form.value).forEach(([key, val]) => {
      if (val) {
        params = params.append(key, val.toString());
      }
    });

    return params;
  }
}
