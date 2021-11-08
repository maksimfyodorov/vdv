import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { DialogsService } from './dialogs.service';
import { HttpApiService } from './api.service';
import { Order, OrderResponse } from '../types/order.types';

@Injectable()
export class CommanderOrdersService {

  public editOrder$ = new ReplaySubject<any>(1);

  constructor(
    private dialogsService: DialogsService,
    private apiService: HttpApiService,
  ) {
  }

  public openAddOrderDialog(selectedMilitaryUnit: number): Observable<Order> {
    return this.dialogsService.openAddOrderDialog(selectedMilitaryUnit).pipe(
      takeWhile(res => Boolean(res)),
    );
  }

  public getOrders(): Observable<OrderResponse> {
    return this.apiService.getOrders();
  }

}
