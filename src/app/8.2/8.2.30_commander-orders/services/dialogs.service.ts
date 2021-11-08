import { Injectable } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { AddOrderDialogComponent } from '../dialogs/order-dialogs/add-order-dialog/add-order-dialog.component';
import { ExecuteOrderDialogComponent } from '../dialogs/execute-order-dialog/execute-order-dialog.component';
import { AddDecisionDialogComponent } from '../dialogs/decision-dialogs/add-decision-dialog/add-decision-dialog.component';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { Order } from '../types/order.types';
import { Decision } from '../types/decision.types';
import { EditDecisionDialogComponent } from '../dialogs/decision-dialogs/edit-decision-dialog/edit-decision-dialog.component';
import { EditOrderDialogComponent } from '../dialogs/order-dialogs/edit-order-dialog/edit-order-dialog.component';

@Injectable()
export class DialogsService {

  constructor(
    private dialogService: DialogService,
  ) {
  }

  public openAddOrderDialog(selectedMilitaryUnit: number): Observable<Order> {
    return this.dialogService.open(AddOrderDialogComponent, {
      header: 'Добавить поручение',
      data: { selectedMilitaryUnit },
      contentStyle: { padding: '0 1rem 2rem', overflow: 'unset' },
      dismissableMask: true,
    }).onClose;
  }

  public openEditOrderDialog(order: Order, selectedMilitaryUnit: number, isViewMode: boolean): Observable<Order> {
    return this.dialogService.open(EditOrderDialogComponent, {
      header: !isViewMode ? 'Редактировать поручение' : 'Просмотр поручения',
      data: {
        order,
        selectedMilitaryUnit,
        isViewMode,
      },
      dismissableMask: true,
      contentStyle: { padding: '0 1rem 2rem', overflow: 'unset' },
    }).onClose;
  }

  public openExecuteOrderDialog(order: Order, isViewMode?: boolean): Observable<any> {
    return this.dialogService.open(ExecuteOrderDialogComponent, {
      header: 'Выполнение поручения',
      data: { order, isViewMode },
      contentStyle: { width: '770px', padding: '0 1rem 2rem', overflow: 'unset' },
      dismissableMask: true,
    }).onClose;
  }

  public openAddDecisionDialog(order: Order): Observable<Decision> {
    return this.dialogService.open(AddDecisionDialogComponent, {
      header: 'Создание решения',
      data: { order },
      dismissableMask: true,
      contentStyle: { width: '770px', overflow: 'unset', padding: '0 1rem 2rem ' },
    }).onClose;
  }

  public openEditDecisionDialog(order: Order, decision: Decision, isViewMode: boolean): Observable<Decision> {
    return this.dialogService.open(EditDecisionDialogComponent, {
      header: !isViewMode ? 'Выполнение решения' : 'Просмотр решения',
      data: { order, decision, isViewMode },
      dismissableMask: true,
      contentStyle: { width: '770px', overflow: 'unset', padding: '0 1rem 2rem' },
    }).onClose;
  }

  public openConfirmDialog(): Observable<any> {
    return this.dialogService.open(ConfirmationDialogComponent, {
      header: 'Подтвердите удаление',
      data: {
        message: 'Вы действительно хотите удалить поручение?',
      },
      dismissableMask: true,
    }).onClose;
  }

  public confirmToDeleteDecision(): Observable<any> {
    return this.dialogService.open(ConfirmationDialogComponent, {
      header: 'Подтвердите удаление',
      data: {
        message: 'Вы действительно хотите удалить это решение?',
      },
      dismissableMask: true,
    }).onClose;
  }

  public confirmToDeleteExecution(): Observable<any> {
    return this.dialogService.open(ConfirmationDialogComponent, {
      header: 'Подтвердите удаление',
      data: {
        message: 'Вы действительно хотите удалить все данные по исполнению поручения?',
      },
      dismissableMask: true,
    }).onClose;
  }

}
