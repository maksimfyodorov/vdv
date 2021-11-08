import { Injectable } from '@angular/core';
import { mergeMap, takeWhile, map } from 'rxjs/operators';
import { CoordinatesDialogService } from '../../../shared/components/ospo/ospo-coordinates/services/coordinates-dialog.service';
import { forkJoin, Observable, of } from 'rxjs';
import { HttpApiService } from './api.service';
import * as moment from 'moment';
import { Order } from '../types/order.types';
import { Customer } from '../types/customer.types';
import { PromptDialogComponent } from '../../../shared/components/prompt-dialog/prompt-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { LoaderService } from '../../../shared/components/loader/loader.service';

const DATE_FIELD = [
  'date_of_receipt',
  'term_of_execution',
  'date',
  'execution_date',
  'rd_start',
  'rd_end',
  'ed_start',
  'ed_end',
  'periodValue',
];

@Injectable({ providedIn: 'root' })
export class AddOrderDialogService {

  constructor(
    private coordinatesService: CoordinatesDialogService,
    private dialogService: DialogService,
    private apiService: HttpApiService,
    public loader: LoaderService,
  ) {
  }

  public addOrder(order): Observable<any> {
    return this.apiService.addOrder(order).pipe(
      takeWhile(res => Boolean(res)),
    );
  }

  public editOrder(uuid: string, value: any): Observable<any> {
    return this.apiService.editOrder(uuid, value).pipe(
      mergeMap(_ => this.getOrder(uuid)),
    );
  }

  private getOrder(uuid: string): Observable<Order> {
    return this.apiService.getOrder(uuid);
  }

  public createCustomer(requestBody: { name: string }): Observable<Customer> {
    return this.apiService.createCustomer(requestBody);
  }

  public openEditCustomerNameDialog(customer: Customer): Observable<any> {
    return this.dialogService.open(PromptDialogComponent, {
      header: 'Редактирование наименования',
      data: customer.name,
    }).onClose.pipe(
      takeWhile(res => Boolean(res)),
      mergeMap(res => {
        return forkJoin({
          msg: of(res),
          req: this.loader.startLoading(this.editCustomer(customer.uuid, { name: res })),
        });
      }),
    );
  }

  private editCustomer(customerUuid: string, customerName: { name: string }): Observable<void> {
    return this.apiService.editCustomer(customerUuid, customerName);
  }

  public deleteCustomer(customerUuid: string): Observable<void> {
    return this.apiService.deleteCustomer(customerUuid);
  }

  public formatDate(value: any, format?: string): void {
    DATE_FIELD.forEach(field => {
      const date = value?.[field];
      if (date) {
        value[field] = moment(date).format(format);
      }
    });
  }

  public getCustomers(): Observable<Customer[]> {
    return this.apiService.getCustomers().pipe(
      map(res => res.result),
    );
  }

  public makeReport(orderUuid: string, formValue: any): Observable<any> {
    return this.apiService.makeReport(orderUuid, formValue).pipe(
      mergeMap(_ => this.getOrder(orderUuid)),
    );
  }
}
