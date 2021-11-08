import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { DialogsService } from './dialogs.service';
import { takeWhile } from 'rxjs/operators';
import { Order } from '../types/order.types';

@Injectable()
export class OrdersListService {

  public getDocumentsAmountSubject = new ReplaySubject<any>(1);

  constructor(
    private dialogsService: DialogsService,
  ) {
  }

  public openExecuteOrderDialog(order: Order, isViewMode?: boolean): Observable<any> {
    return this.dialogsService.openExecuteOrderDialog(order, isViewMode).pipe(
      takeWhile(res => Boolean(res)),
    );
  }
}
