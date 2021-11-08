import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpApiService } from './api.service';
import { HttpParams } from '@angular/common/http';
import { Order } from '../types/order.types';

@Injectable()
export class OrdersFilterService {

  constructor(
    private apiService: HttpApiService,
  ) {
  }

  public filterOrders(params: HttpParams): Observable<Order[]> {
    return this.apiService.filterOrders(params);
  }
}
