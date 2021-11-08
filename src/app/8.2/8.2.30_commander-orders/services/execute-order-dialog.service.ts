import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpApiService } from './api.service';
import { switchMap } from 'rxjs/operators';
import { Order } from '../types/order.types';

@Injectable()
export class ExecuteOrderDialogService {

  constructor(
    private apiService: HttpApiService,
  ) {
  }

  public addExecution(orderUuid: string, execution: any): Observable<Order> {
    return this.apiService.addExecution(orderUuid, execution).pipe(
      switchMap(_ => this.apiService.getOrder(orderUuid)),
    );
  }

  public reportOnSuccess(orderUuid: string, mode: {status: string}): Observable<Order> {
    return this.apiService.reportOnExecutionStatus(orderUuid, mode).pipe(
      switchMap(_ => this.apiService.getOrder(orderUuid)),
    )
  }

  public reportOnFailure(orderUuid: string, mode: {status: string}): Observable<Order> {
    return this.apiService.reportOnExecutionStatus(orderUuid, mode).pipe(
      switchMap(_ => this.apiService.getOrder(orderUuid)),
    )
  }

}
