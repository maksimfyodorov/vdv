import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { EventEmitter } from '@angular/core';;
import { AttachDocumentDialogComponent } from '../../../../../../shared/components/ospo/documents/attach-document-dialog/attach-document-dialog.component';
import { DocumentPreview } from '../../../../../../shared/components/ospo/documents/attach-document-dialog/attach-document-dialog.types';
import { BreadcrumbService } from '../../../services/breadcrumb.service';
import { CounterListService } from '../../../services/counter-list.service';
import { StateService } from '../../../services/state.service';
import { SubordinateReportComponent } from '../../subordinate-report/subordinate-report.component';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Summary } from '../../../../interfaces/interface';

@Component({
  selector: 'app-bill-tasks',
  templateUrl: './bill-tasks.component.html',
  styleUrls: ['./bill-tasks.component.scss']
})
export class BillTasksComponent implements OnInit, OnDestroy {

  @Input() completeCreationFlag: boolean = false;
  @Input() numberOfBill: number = 0;
  @Input() militaryUnitId: string;
  @Output() newSubordinate = new EventEmitter<Summary>();

  public documents: DocumentPreview[];
  public dateOfBill: Date;
  public id: string;
  public info: any;

  public firstTaskData: any = [
    {
      name: 'Руководящий состав',
      count: 'Не заполнено'
    },
    {
      name: 'Состав',
      count: 'Не заполнено'
    },
    {
      name: 'Вывод о наличии и опасности террористических угроз:',
      count: 'Не заполнено'
    },
    {
      name: 'Критически опасные объекты',
      count: 'Не заполнено'
    },
    {
      name: 'Районы с неблагоприятной обстановкой',
      count: 'Не заполнено'
    },
    {
      name: 'Криминальная обстановка',
      count: 'Не заполнено'
    },
    {
      name: 'Учения НАК',
      count: 'Не заполнено'
    },
    {
      name: 'Учения под руководством командующего ВДВ',
      count: 'Не заполнено'
    },
    {
      name: 'Командно-штабные учения',
      count: 'Не заполнено'
    },
    {
      name: 'Ежемесячные демонстративные тренировки',
      count: 'Не заполнено'
    },
    {
      name: 'План подготовки л/с по противодействию терроризму',
      count: 'Не заполнено'
    },
    {
      name: 'Работа по защищенности',
      count: 'Не заполнено'
    },
    {
      name: 'Источники информации',
      count: 'Не заполнено'
    },
  ]

  public secondTaskData: any = [
    {
      name: 'Пределы',
      count: 'Не заполнено'
    },
    {
      name: 'Командирская проверка',
      count: 'Не заполнено'
    },
    {
      name: 'Проверка военного управления',
      count: 'Не заполнено'
    },
    {
      name: 'Проверка начальником зоны',
      count: 'Не заполнено'
    },
    {
      name: 'Проверка местных гарнизонов',
      count: 'Не заполнено'
    },
    {
      name: 'Участие в международных учениях и тренировках',
      count: 'Не заполнено'
    },
    {
      name: 'Участие в штабных переговорах',
      count: 'Не заполнено'
    },
    {
      name: 'Участие в разработке международных документов',
      count: 'Не заполнено'
    },
    {
      name: 'Проблемные вопросы',
      count: 'Не заполнено'
    },
  ]

  private summaryUuid: string;
  private subscription: Subscription[] = [];


  constructor(
    public state: StateService,
    public dialogService: DialogService,
    private breadcrumb: BreadcrumbService,
    public http: CounterListService,
    private route: ActivatedRoute,
  ) {
    this.id = this.http.getQueryId();
  }

  public ngOnInit(): void {
    this.subscription.push(this.state.returnInfo().pipe(
      filter(res => res)
    ).subscribe(res => {
      this.info = res;
      this.firstTaskData = [];
      this.secondTaskData = [];
      res.forEach((element, index) => {
        index >= 14 ? this.secondTaskData.push(element) : this.firstTaskData.push(element);
      });
    }))
    this.initData();
  }

  public ngOnDestroy(): void {
    this.subscription.forEach(el => el.unsubscribe())
  }

  public initData(): void {
    this.subscription.push(this.state.returnCompleteCreationFlag().subscribe(res => {
      this.completeCreationFlag = res
    }))
    this.subscription.push(this.state.returnNewBillData().subscribe(res => {
      if (!this.numberOfBill) {
        this.numberOfBill = res.inputNumber;
        this.dateOfBill = res.inputDate;
      }
    }))
    this.breadcrumb.setCrumbs([{
      label: 'Ведомость'
    },
    ])
    this.subscription.push(this.state.returnSummaryUuid().subscribe(res => this.summaryUuid = res));
    this.loadDocuments();
  }

  public openDocumentDialog(): void {
    this.dialogService.open(AttachDocumentDialogComponent, {
      header: 'Добавление документов',
      data: { attachMode: 'single', }
    }).onClose.subscribe(res => {
      if (res) {
        this.http.addDocument(this.summaryUuid, res[0].uuid).subscribe(() => this.loadDocuments());
      }
    });
  }

  public loadDocuments(): void {
    this.http.getDocuments(this.summaryUuid).subscribe(res => this.documents = res.result);
  }

  public deleteDocument(documentUuid: string): void {
    this.http.deleteDocument(this.summaryUuid, documentUuid).subscribe(() => this.loadDocuments())
  }

  public openSubordinateDialog(): void {
    this.dialogService.open(SubordinateReportComponent, {
      header: 'Добавить подчиненного ВФ',
      data: {
        military_unit_id: this.militaryUnitId,
      }
    }).onClose.subscribe(res => {
      if (res) {
        this.newSubordinate.emit(res);
      }
    });
  }

}
