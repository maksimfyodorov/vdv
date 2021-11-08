import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer, CustomerResponse } from '../types/customer.types';
import { Order, OrderResponse } from '../types/order.types';
import { Decision } from '../types/decision.types';

@Injectable({ providedIn: 'root' })
export class HttpApiService {

  constructor(
    private http: HttpClient,
  ) {
  }

  public getCustomers(): Observable<CustomerResponse> {
    return this.http.get<CustomerResponse>(`api/assignments/customers`);
  }

  public getOrders(): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`api/assignments`);
  }

  public getOrder(uuid: string): Observable<Order> {
    return this.http.get<Order>(`api/assignments/${uuid}`);
  }

  public addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`api/assignments`, order);
  }

  public editOrder(uuid: string, value: any): Observable<any> {
    return this.http.put<any>(`api/assignments/${uuid}`, value);
  }


  public deleteOrder(uuid: string): Observable<void> {
    return this.http.delete<void>(`api/assignments/${uuid}`);
  }

  public createCustomer(requestBody: { name: string }): Observable<Customer> {
    return this.http.post<Customer>(`api/assignments/customers`, requestBody);
  }

  public editCustomer(customerUuid: string, customerName: { name: string }): Observable<void> {
    return this.http.put<void>(`api/assignments/customers/${customerUuid}`, customerName);
  }

  public deleteCustomer(customerUuid: string): Observable<void> {
    return this.http.delete<void>(`api/assignments/customers/${customerUuid}`);
  }

  public addDecision(decision: Decision, orderUuid: string): Observable<Decision> {
    return this.http.post<Decision>(`api/assignments/${orderUuid}/decisions`, decision);
  }

  public editDecision(orderUuid: string, decisionUuid: string, requestBody: Decision): Observable<void> {
    return this.http.put<void>(`api/assignments/${orderUuid}/decisions/${decisionUuid}`, requestBody);
  }

  public getDecision(orderUuid: string, decisionUuid: string): Observable<Decision> {
    return this.http.get<Decision>(`api/assignments/${orderUuid}/decisions/${decisionUuid}`);
  }

  public deleteDecision(orderUuid: string, decisionUuid: string): Observable<void> {
    return this.http.delete<void>(`api/assignments/${orderUuid}/decisions/${decisionUuid}`);
  }

  public filterOrders(params: HttpParams): Observable<Order[]> {
    return this.http.get<Order[]>(`api/assignments`, {params});
  }

  public addExecution(orderUuid: string, execution: any): Observable<void> {
    return this.http.patch<void>(`api/assignments/${orderUuid}`, execution);
  }

  public reportOnExecutionStatus(orderUuid: string, mode: { status: string }): Observable<void> {
    return this.http.post<void>(`api/assignments/${orderUuid}/execute`, mode);
  }

  public changeDecisionStatus(orderUuid: string, decisionUuid: string, mode: { status: string }): Observable<void> {
    return this.http.patch<void>(`api/assignments/${orderUuid}/decisions/${decisionUuid}`, mode);
  }

  public makeReport(orderUuid: string, formValue: any): Observable<void> {
    return this.http.post<void>(`api/assignments/${orderUuid}/send`, formValue);
  }
}
