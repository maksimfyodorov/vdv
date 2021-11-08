import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { DocumentPreview } from '../../../../../../shared/components/ospo/documents/attach-document-dialog/attach-document-dialog.types';
import { MilitaryUnitHierarchyItem } from '../../../../../../shared/components/ospo/military-units/military-units-sidebar/interfaces/interfaces';
import { ReportResults, Summary } from '../../../../interfaces/interface';
import { BreadcrumbService } from '../../../services/breadcrumb.service';
import { CounterListService } from '../../../services/counter-list.service';
import { StateService } from '../../../services/state.service';
import { reportResults } from '../../show-report/mock';

@Component({
  selector: 'app-bill-cell',
  templateUrl: './bill-cell.component.html',
  styleUrls: ['./bill-cell.component.scss']
})
export class BillCellComponent implements OnInit, OnDestroy {

  @Input() numberOfBill: number;
  @Input() selected: boolean = true;
  @Input() billData: Summary;

  public reportList = [];
  public reportResults: ReportResults = reportResults;
  public completeCreationFlag: boolean;
  public documents: DocumentPreview | any;
  public dateOfBill: Date = new Date();
  public militaryUnit: MilitaryUnitHierarchyItem;
  public subscriptions: Subscription[] = [];
  public militaryUnitId: string;
  private summaryUuid: string;

  constructor(
    public state: StateService,
    public dialogService: DialogService,
    private breadcrumb: BreadcrumbService,
    public http: CounterListService,
  ) { }

  public ngOnInit(): void {
    this.billData ? this.militaryUnit = this.billData.military_unit : this.subscriptions.push(this.state.returnMilitaryUnit().subscribe(res => this.militaryUnit = res));
    this.state.addResultsVF(reportResults);
    this.initFromState();
  }

  public ngOnDestroy(): void {
    this.state.reduceResultsVF(reportResults);
    this.subscriptions.forEach(el => el.unsubscribe());
  }

  public newSubordinateEvent(event: any): void {
    event.forEach(element => {
      this.reportList.push(element);
      const parentUuid = this.billData ? this.billData.uuid : this.summaryUuid;
      this.http.addChildReport(element.uuid, parentUuid).subscribe();
    });

  }

  public deleteItem(item: any): void {
    const index = this.reportList.indexOf(item);
    this.reportList.splice(index, 1);
  }

  public initFromState(): void {
    this.subscriptions.push(
      this.state.returnCompleteCreationFlag().subscribe(res => {
        this.completeCreationFlag = res;
      }))
    this.breadcrumb.setCrumbs([{
      label: 'Ведомость'
    },
    ])
    this.subscriptions.push(
      this.state.returnSummaryUuid().subscribe(res => {
        this.summaryUuid = res;
        this.loadDataHttp(res);
      }))
  }

  public loadDataHttp(uuid: string): void {
    this.http.getSummaryData(uuid).subscribe(res => {
      this.militaryUnitId = res.military_unit_id;
      if (res?.report?.uuid) {
        this.state.setReportUuid(res?.report?.uuid);
        this.completeCreationFlag = true;
      }
      this.state.setNewBillData({
        inputNumber: res.number,
        inputDate: new Date(res.date),
      })
      this.numberOfBill = res.number;
      this.dateOfBill = new Date(res.date);
      this.state.changeInfo(res.info);
      this.state.setMilitaryUnit(res.military_unit);
    })
  }

}
