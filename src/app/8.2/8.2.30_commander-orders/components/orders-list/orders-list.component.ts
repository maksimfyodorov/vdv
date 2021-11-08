import { Component, Input, OnInit } from '@angular/core';
import { OrdersListService } from '../../services/orders-list.service';
import { Document } from '../../../../shared/components/ospo/documents/documents.types';
import { Order } from '../../types/order.types';
import { Decision } from '../../types/decision.types';
import { CommanderOrdersService } from '../../services/commander-orders.service';
import * as _ from 'lodash';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DECISION_STATUSES } from '../../commander-orders/commander-orders.component';

@Component({
  selector: 'app-orders-list',
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '*',
      })),
      state('closed', style({
        height: '0px',
        overflow: 'hidden',
      })),
      transition('open => closed', [
        animate('.4s'),
      ]),
      transition('closed => open', [
        animate('.4s'),
      ]),
    ]),
  ],
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
  providers: [OrdersListService],
})
export class OrdersListComponent implements OnInit {

  @Input() public orders: Order[] = [];

  constructor(
    private ordersListService: OrdersListService,
    private commanderOrdersService: CommanderOrdersService,
  ) {
  }

  public ngOnInit(): void {
    this.getDocumentsAmount();
  }

  public openExecuteOrderDialog(order: Order): void {
    const orderClone = _.cloneDeep(order);

    this.ordersListService.openExecuteOrderDialog(orderClone)
      .subscribe(res => {
        this.commanderOrdersService.editOrder$.next(res);
      });
  }

  public addDecision(newDecision: Decision, order: Order): void {
    order.decisions.push(newDecision);
    order.decisionsDocumentsTotal += newDecision.documents.length;
    order.documentsAreHidden = true;
    newDecision.status.code = DECISION_STATUSES[newDecision.status.name] || DECISION_STATUSES.default;
  }

  public updateDecision(editedDecision: Decision, order: Order) {
    order.decisionsDocumentsTotal = order.decisionsDocumentsTotal - editedDecision.previous_amount_of_documents + editedDecision.documents.length;
    order.documentsAreHidden = true;
    editedDecision.status.code = DECISION_STATUSES[editedDecision.status.name] || DECISION_STATUSES.default;
    order.decisions = order.decisions.map(decision => decision.uuid === editedDecision.uuid ? editedDecision : decision);
  }

  public orderInDocumentsChanged(event: Document[], order: Order): void {
    order.document = event;
  }

  public orderDocumentsChanged(event: Document[], order: Order): void {
    order.additional_documents = event;
  }

  public decisionDocumentsChanged(event: Document[], order: Order, decision: Decision): void {
    decision.documents = event;
    this.countDocuments(order);
  }

  private getDocumentsAmount(): void {
    this.ordersListService.getDocumentsAmountSubject.subscribe(res => {
      this.countDocuments(this.orders[res]);
    });
  }

  private countDocuments(order: Order): void {
    order.decisions_documents_total = 0;
    order.decisions.forEach(decision => {
      order.decisions_documents_total += decision.documents.length;
    });
  }

  public reportInDocumentsChanged(event: Document[], order: Order): void {
    order.report_document = event;
  }

  public executionDocumentsChanged(event: Document[], order: Order): void {
    order.report_additional_documents = event;
  }

  public updateOrder($event: Order, order: Order) {
    const editedOrder = $event;
    editedOrder.document = [editedOrder.document]
    editedOrder.hasReport = false;
    editedOrder.orderDocumentsTotal = order.orderDocumentsTotal;
    editedOrder.decisionsDocumentsTotal = order.decisionsDocumentsTotal;
    editedOrder.executionDocumentsTotal = 0;
    editedOrder.documentsAreHidden = true;
    editedOrder.isExecuted = false;
    editedOrder.decisions.forEach(item => item.status.code = DECISION_STATUSES[item.status.name] || DECISION_STATUSES.default);
    this.orders = this.orders.map(order => order.uuid === editedOrder.uuid ? editedOrder : order);
  }
}
