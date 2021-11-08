import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StepperService } from '../../services/stepper.service';
import { Order } from '../../types/order.types';
import { Decision } from '../../types/decision.types';
import { OrdersListService } from '../../services/orders-list.service';
import * as _ from 'lodash';
import { CommanderOrdersService } from '../../services/commander-orders.service';
import { Customer } from '../../types/customer.types';
import { SelectionTreeService } from '../../../../8.1/8.1.4_uav-information/components/uav-node-folder/services/selection-tree.service';
import { LoaderService } from '../../../../shared/components/loader/loader.service';
import { AccessLevel } from '../../../../shared/services/auth.types';
import { RoleModelService } from '../../../../shared/services/role-model.service';

export const ACCESS_LEVEL = ['regiment', 'conjunction', 'command'];

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {

  @Input() public decisions: Decision[] = [];
  @Input() public order: Order;
  @Input() public orderTitle: string;
  @Input() public orderStatus: string;

  public currentAccessLevel: AccessLevel;
  public selectedMilitaryUnit: number;
  public customers: Customer[];

  @Output() public newDecision = new EventEmitter<Decision>();
  @Output() public editedDecision = new EventEmitter<Decision>();
  @Output() public orderWithoutReport = new EventEmitter<Order>();

  constructor(
    public loader: LoaderService,
    private stepperService: StepperService,
    private ordersListService: OrdersListService,
    private commanderOrdersService: CommanderOrdersService,
    private selectionTreeService: SelectionTreeService,
    private roleService: RoleModelService,
  ) {
  }

  public ngOnInit(): void {
    this.getCurrentAcceptLevel();
    this.selectionTreeService.selectionTreeSelectItemSubject.subscribe(res => this.selectedMilitaryUnit = res.uuid);
  }

  public openEditOrderDialog(): void {
    const orderClone = _.cloneDeep(this.order);
    const isViewMode = this.order.status && this.currentAccessLevel !== 'command';
    this.stepperService.openEditOrderDialog(orderClone, this.selectedMilitaryUnit, isViewMode)
      .subscribe(res => {
        this.stepperService.editOrderSubject.next(res);
      });
  }

  public deleteOrder(): void {
    this.stepperService.openConfirmDialog(this.order.uuid).subscribe(_ => {
      this.stepperService.deleteOrderSubject.next(this.order.uuid);
    });
  }

  public openAddDecisionDialog(): void {
    const orderClone = _.cloneDeep(this.order);

    this.stepperService.openAddDecisionDialog(orderClone)
      .subscribe(res => {
        this.newDecision.emit(res);
      });
  }

  public openEditDecisionDialog(decision: Decision): void {
    decision.description = this.order.description;
    const decisionClone = _.cloneDeep(decision);
    const isViewMode = decision.status.code !== 'blue' && this.currentAccessLevel !== 'command' || this.order.isExecuted && this.currentAccessLevel !== 'command';

    this.stepperService.openEditDecisionDialog(this.order, decisionClone, isViewMode)
      .subscribe(res => {
        res.previous_amount_of_documents = decision.documents.length;
        this.editedDecision.emit(res);
      });
  }

  public deleteDecision(decision: Decision): void {
    this.stepperService.confirmToDeleteDecision(this.order, decision).subscribe(_ => {
      this.order.decisions = this.order.decisions.filter(item => item.uuid !== decision.uuid);
      this.order.decisionsDocumentsTotal = this.order.decisionsDocumentsTotal - decision.documents.length;
      this.order.documentsAreHidden = true;
    });
  }

  public openExecuteOrderDialog(): void {
    const orderClone = _.cloneDeep(this.order);
    const isViewMode = this.order.isExecuted && this.currentAccessLevel !== 'command';

    this.ordersListService.openExecuteOrderDialog(orderClone, isViewMode)
      .subscribe(res => {
        this.commanderOrdersService.editOrder$.next(res);
      });
  }

  public deleteExecution(): void {
    const executor = this.order.executor;
    const executorValue = {
      shdk_uuid: executor.shdk?.uuid || null,
      military_unit_id: executor.military_unit?.id || null,
    };
    const coExecutors = this.order.co_executors.map(item => ({
      shdk_uuid: item.shdk?.uuid || null,
      military_unit_id: item.military_unit?.id || null,
    }));
    const requestBody = {
      report: null,
      executor: { ...executorValue },
      co_executors: [...coExecutors],
    };

    this.stepperService.confirmToDeleteExecution(this.order.uuid, requestBody).subscribe(res => {
      this.orderWithoutReport.emit(res);
    });
  }

  private getCurrentAcceptLevel(): void {
    const index = ACCESS_LEVEL.findIndex(item => item === this.roleService.userAccessLevel$.value);
    this.currentAccessLevel = ACCESS_LEVEL[index] as AccessLevel || ACCESS_LEVEL[0] as AccessLevel;
  }

}
