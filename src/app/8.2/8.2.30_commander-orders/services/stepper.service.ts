import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { mergeMap, switchMap, takeWhile } from 'rxjs/operators';
import { DialogsService } from './dialogs.service';
import { HttpApiService } from './api.service';
import { Order } from '../types/order.types';
import { Decision } from '../types/decision.types';
import { LoaderService } from '../../../shared/components/loader/loader.service';
import { ExecuteOrderDialogService } from './execute-order-dialog.service';

@Injectable()
export class StepperService {

  public editOrderSubject = new ReplaySubject<Order>(1);
  public deleteOrderSubject = new ReplaySubject<string | number>(1);

  constructor(
    private dialogsService: DialogsService,
    private apiService: HttpApiService,
    public loader: LoaderService,
    private executeOrderDialogService: ExecuteOrderDialogService,
  ) { }

  public openEditOrderDialog(order: Order, selectedMilitaryUnit: number, isViewMode: boolean): Observable<Order> {
    return this.dialogsService.openEditOrderDialog(order, selectedMilitaryUnit, isViewMode).pipe(
      takeWhile(res => Boolean(res)),
    )
  }

  public openAddDecisionDialog(order: Order): Observable<Decision> {
    return this.dialogsService.openAddDecisionDialog(order).pipe(
      takeWhile(res => Boolean(res))
    )
  }

  public openEditDecisionDialog(order: Order, decision: Decision, isViewMode: boolean): Observable<Decision> {
    return this.dialogsService.openEditDecisionDialog(order, decision, isViewMode).pipe(
      takeWhile(res => Boolean(res)),
    )
  }

    public openConfirmDialog(uuid: string): Observable<any> {
    return this.dialogsService.openConfirmDialog().pipe(
      takeWhile(res => Boolean(res)),
      mergeMap(_ => this.loader.startLoading(this.deleteOrder(uuid)))
    )
  }

  public deleteOrder(uuid: string): Observable<void> {
    return this.apiService.deleteOrder(uuid)
  }

  public confirmToDeleteDecision(order: Order, decision: Decision): Observable<void> {
    return this.dialogsService.confirmToDeleteDecision().pipe(
      takeWhile(res => Boolean(res)),
      mergeMap(_ => this.loader.startLoading(this.deleteDecision(order.uuid, decision.uuid)))
    )
  }

  private deleteDecision(orderUuid: string, decisionUuid: string):Observable<void> {
    return this.apiService.deleteDecision(orderUuid, decisionUuid)
  }

  public confirmToDeleteExecution(orderUuid: string, requestBody: any): Observable<Order> {
    return this.dialogsService.confirmToDeleteExecution().pipe(
      takeWhile(res => Boolean(res)),
      switchMap(_ => this.loader.startLoading(this.executeOrderDialogService.addExecution(orderUuid, requestBody)))
    )
  }
}
