import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DialogsService } from '../services/dialogs.service';
import { SelectionTreeService } from '../../../8.1/8.1.4_uav-information/components/uav-node-folder/services/selection-tree.service';
import { CommanderOrdersService } from '../services/commander-orders.service';
import { StepperService } from '../services/stepper.service';
import { MilitaryUnitTreeItem } from '../types/military-unit-tree-item.types';
import { Order, PrintInfo } from '../types/order.types';
import { LoaderService } from '../../../shared/components/loader/loader.service';
import { isEmpty } from 'lodash';
import { ExecuteOrderDialogService } from '../services/execute-order-dialog.service';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { HttpApiService } from '../services/api.service';
import { HttpParams } from '@angular/common/http';
import { Decision } from '../types/decision.types';
import { DocumentsFormalizedService } from '../../../shared/components/ospo/documents-formalized/services/documents-formalized.service';
import { DocumentConfig } from '../../../shared/components/ospo/documents-formalized/interfaces/document-config.interfaces';
import * as moment from 'moment';
import { Document } from '../../../shared/components/ospo/documents/documents.types';
import { MilitaryMen } from '../../../shared/components/military/interfaces';

export interface TableCols {
  field: string;
  header: string;
}

export const NESTED_TABLES = [
  'По решению Министра обороны Российской Федерации',
  'По решению начальника Генерального штаба ВС РФ',
  'По предложениям ОВУ',
];

export const DECISION_STATUSES = {
  ['Исполнение решения']: 'green',
  ['Не исполнение решения']: 'red',
  ['Новый']: 'blue',
  default: 'green',
};

@Component({
  selector: 'app-commander-orders',
  templateUrl: './commander-orders.component.html',
  styleUrls: ['./commander-orders.component.scss'],
  providers: [SelectionTreeService, DialogsService, CommanderOrdersService, StepperService, LoaderService, ExecuteOrderDialogService],
})
export class CommanderOrdersComponent implements OnInit, OnDestroy {

  public get isLoading$(): Observable<boolean> {
    return this.loader.isLoading$;
  }

  public get signers(): MilitaryMen[] {
    return this.documentService.signers;
  }

  public get approvers(): MilitaryMen[] {
    return this.documentService.approvers;
  }

  public get coordinators(): MilitaryMen[] {
    return this.documentService.coordinators;
  }

  @ViewChild('listOfOrdersExecutionTemplate') private listOfOrdersExecutionTemplate: TemplateRef<HTMLElement>;
  @ViewChild('controlOfExecutionTemplate') private controlOfExecutionTemplate: TemplateRef<HTMLElement>;
  @ViewChild('notesAboutExecutionTemplate') private notesAboutExecutionTemplate: TemplateRef<HTMLElement>;
  @ViewChild('reportTemplate') private reportTemplate: TemplateRef<HTMLElement>;

  public militaryUnitTree: MilitaryUnitTreeItem[] = [];
  public orders: Order[] = [];
  public selectedMilitaryUnit: number;
  public orderSearching = new FormControl();
  public documentConfig: DocumentConfig;
  public cols: TableCols[];
  public notesTableCols: TableCols[];
  public year = new Date().getFullYear();
  public date = new Date();
  public columnNumbers: string[] = [];
  public nestedTables: string[] = NESTED_TABLES;
  public decisions: any[] = [];
  private totalOfOrders: number;
  private count = 0;
  private gettingOrders = false;
  private subscriptions: Subscription;

  constructor(
    private readonly dialogsService: DialogsService,
    private readonly selectionTreeService: SelectionTreeService,
    private readonly commanderOrdersService: CommanderOrdersService,
    private readonly stepperService: StepperService,
    private readonly loader: LoaderService,
    private readonly apiService: HttpApiService,
    private readonly documentService: DocumentsFormalizedService,
  ) {
  }

  public ngOnInit(): void {
    this.selectionTreeService.createHierarchy();
    this.getTree();
    this.getOrders();
    this.editOrder();
    this.deleteOrder();
    this.addExecutionDetailsToOrder();
    this.getSelectedMilitaryUnit();
    this.updateOrdersByOrderSearching();
    this.getCols();
    this.printDocument();
    this.getColumnNumbers();
    this.getNotesTableCols();

    this.orders.forEach(order => {
      this.configOrder(order);
      this.decisions.push(...order.decisions);
    });

    this.decisions.forEach(decision => {
      decision.date = moment(decision.date).format('DD.MM.YYYY');
      decision.state = decision.status.name;
    });
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public openAddOrderDialog(): void {
    this.commanderOrdersService.openAddOrderDialog(this.selectedMilitaryUnit)
      .subscribe(res => {
        this.configOrder(res);
        this.orders.unshift(res);
      });
  }

  public editOrder(): void {
    this.stepperService.editOrderSubject.subscribe(res => {
      this._editOrder(res);
    });
  }

  public deleteOrder(): void {
    this.stepperService.deleteOrderSubject.subscribe(res => {
      const currentOrderIndex = this.orders.findIndex(order => order.uuid === res);
      this.orders.splice(currentOrderIndex, 1);
    });
  }

  public addExecutionDetailsToOrder(): void {
    this.commanderOrdersService.editOrder$.subscribe(res => {
      this._editOrder(res);
    });
  }

  public updateOrders($event: any[]): void {
    // this.orders = $event;
  }

  public scroll(): void {
    const yOffset = window.pageYOffset;
    let scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight,
    );
    const offsetHeight = document.documentElement.offsetHeight;
    const limit = scrollHeight - offsetHeight - 1;

    if (yOffset > limit && !this.gettingOrders) {
      this.count++;
      // // if (this.totalOfOrders > this.orders.length) {
      const afterScroll = true;
      this.getOrders(afterScroll);
      // }
    }
  }

  public getTemplate(): TemplateRef<HTMLElement> {
    const templates = {
      list: this.listOfOrdersExecutionTemplate,
      control: this.controlOfExecutionTemplate,
      notes: this.notesAboutExecutionTemplate,
      report: this.reportTemplate,
    };

    return templates[this.documentService.currentDocument?.mode];
  }

  public setCellSize(cellName: string): string {
    const cellNames = ['orderDocuments', 'reportDocuments', 'description', 'executor'];
    if (cellNames.includes(cellName)) return 'table__large-cell';
  }

  public setCellBackground(cellName: string, backgroundColor: string): string {
    const cellNames = ['status', 'executionDate'];
    if (cellNames.includes(cellName)) return backgroundColor;
  }

  public setCellClass(cellName: string): string {
    const cellNames = ['rowIndex', 'description'];
    if (cellNames.includes(cellName)) {
      const className = cellName === 'rowIndex' ? 'table__row-index' : 'table__order-description';
      return className;
    }
  }

  public setColSpanValue(index: number): number {
    const numbers = [18, 23, 27];
    if (numbers.includes(index)) return 2;
  }

  private getTree(): void {
    this.subscriptions = this.selectionTreeService.selectionTreeSubject.subscribe(res => {
      this.militaryUnitTree = res;
    });
  }

  private getSelectedMilitaryUnit(): void {
    this.subscriptions.add(
      this.selectionTreeService.selectionTreeSelectItemSubject.subscribe(res => {
        this.selectedMilitaryUnit = res.uuid;
        this.setDocumentConfig();
      }),
    );
  }

  private getOrders(afterScroll?: boolean): void {
    this.gettingOrders = true;

    this.loader.startLoading(this.commanderOrdersService.getOrders()).subscribe(res => {
      res.result.forEach(order => {
        this.configOrder(order);
      });

      this.totalOfOrders = res.count;
      !afterScroll ? this.orders = res.result.reverse() : this.orders = [...this.orders, ...res.result.reverse()];
      this.gettingOrders = false;
    });
  }

  private configOrder(order: Order): void {
    order.document = [order.document];
    order.documentsAreHidden = true;
    order.orderDocumentsTotal = order.document.length + order.additional_documents.length;
    order.decisionsDocumentsTotal = this.countDocuments(order.decisions) || 0;
    if (!isEmpty(order.report)) order.report.document = [order.report.document];
    !isEmpty(order.report) ? order.hasReport = true : order.hasReport = false;
    order.executionDocumentsTotal = order.report?.document?.length + order.report?.additional_documents?.length || 0;
    order.isExecuted = order.status?.color === 'red' || order.status?.color === 'green';
    order.decisions.forEach(item => item.status.code = DECISION_STATUSES[item.status.name] || DECISION_STATUSES.default);

    if (this.documentService.currentDocument?.mode) order.printInfo = this.setPrintInfoValue(order);
  }

  private setPrintInfoValue(order: Order): PrintInfo {
//TODO: !!!
    const printInfo: PrintInfo = {
      creationDate: moment(order.date_of_receipt).format('DD.MM.YYYY'),
      incomingNumber: order.incoming_number,
      description: order.description,
      executionDate: moment(order.term_of_execution).format('DD.MM.YYYY'),
      militaryUnit: order.executor.military_unit.complicated_name,
      orderDocuments: this.getArrayToRenderDocuments(order.document, order.additional_documents),

      executor: `${order.executor.shdk.rank.name} ${order.executor.shdk.military_man.name.substr(0, 1)}.${order.executor.shdk.military_man.surname}`,
      reportDate: order.hasReport ? moment(order.report.execution_date).format('DD.MM.YYYY') : 'Дата доклада не указана',
      reportNumber: order.incoming_number, // todo: заменить поле, отдающее данные

      reportDocuments: order.hasReport ? this.getArrayToRenderDocuments(order.report.document, order.report.additional_documents) : [], // todo: проверить, когда будет возможность создать report
      status: this.getOrderStatus(order.status.color),
    };

    return order.printInfo = printInfo;
  }

  private getOrderStatus(orderStatus: string): string {
    const statuses = {
      blue: 'На исполнении',
      green: 'Исполнено',
      yellow: 'На исполнении',
      red: 'Не исполнено',
    };

    return statuses[orderStatus];
  }

  private getArrayToRenderDocuments(mainDocumentArray: Document[], additionalDocumentsArray: any[]): string[] {
    const mappedMainDocumentArray = mainDocumentArray.map(document => {
      return `${document.name} от ${moment(document.created_at).format('DD.MM.YYYY')}`;
    });

    const mappedAdditionalDocumentsArray = additionalDocumentsArray.map(document => {
      return `${document.name} от ${moment(document.created_at).format('DD.MM.YYYY')}`;
    });

    const arrayToRenderDocuments = [...mappedMainDocumentArray, ...mappedAdditionalDocumentsArray];

    return arrayToRenderDocuments;
  }

  private _editOrder(res: Order): void {
    this.configOrder(res);
    this.orders = this.orders.map(order => order.uuid === res.uuid ? res : order);
  }

  private updateOrdersByOrderSearching(): void {
    let httpParams = new HttpParams();

    this.subscriptions.add(
      this.orderSearching.valueChanges
        .pipe(
          debounceTime(1000),
          distinctUntilChanged(),
          filter(value => value.trim()),
          switchMap(value => this.loader.startLoading(this.apiService.filterOrders(httpParams.append('q', value)))),
        )
        .subscribe(res => {
          this.orders = res;
          this.orderSearching.setValue('');
        }),
    );
  }

  private countDocuments(array: Decision[]): number {
    return array.reduce((acc, cur) => acc + cur.documents.length, 0);
  }

  private setDocumentConfig(): void {
    const config = {
      militaryUnit: this.selectedMilitaryUnit
    };

    this.documentConfig = config;
  }

  private getCols(): void {
    this.cols = [
      { field: 'rowIndex', header: '№' },
      { field: 'creationDate', header: 'Дата поступления документа' },
      { field: 'incomingNumber', header: 'Входящий номер документа' },
      { field: 'description', header: 'Краткое содержание' },
      { field: 'executionDate', header: 'Срок исполнения' },
      { field: 'militaryUnit', header: 'Управление (отдел, служба)' },
      { field: 'executor', header: 'Исполнитель' },
      { field: 'orderDocuments', header: 'Прикрепленные документы' },
      { field: 'reportDate', header: 'Дата доклада о выполнении' },
      { field: 'reportNumber', header: 'Исходящий номер доклада о выполнении' },
      { field: 'reportDocuments', header: 'Прикрепленные документы' },
      { field: 'status', header: 'Отметка о выполнении' },
    ];
  }

  private getNotesTableCols(): void {
    this.notesTableCols = [
      { field: 'rowIndex', header: '№' },
      { field: 'name', header: 'Принятые решения' },
      { field: 'date', header: 'Срок исполнения' },
      { field: 'executor', header: 'Ответственный исполнитель' },
      { field: 'progress', header: 'Ход исполнения поручения' },
      { field: 'state', header: 'Статус' },
    ];
  }

  private printDocument(): void {
    this.subscriptions.add(
      this.documentService.actionType$.subscribe(res => {
        res === 'print' && window.print();
      }),
    );
  }

  private getColumnNumbers(): void {
    for (let i = 0; i < 31; i++) {
      this.columnNumbers.push('');
    }
  }

}
