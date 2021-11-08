import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { DocumentDialogComponent } from '../../../../../shared/components/ospo/documents-formalized/components/document-dialog/document-dialog.component';
import { MilitaryUnitHierarchyItem } from '../../../../../shared/components/ospo/military-units/military-units-sidebar/interfaces/interfaces';
import { FilterTable, PageParams, Summary } from '../../../interfaces/interface';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { CounterListService } from '../../services/counter-list.service';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-counter-list-table',
  templateUrl: './counter-list-table.component.html',
  styleUrls: ['./counter-list-table.component.scss']
})
export class CounterListTableComponent implements OnInit, OnDestroy {

  public selectedBill: Summary;
  public list: Summary[];
  public totalRecords: number = 10;
  public pageSize: number = 15;
  public militaryUnit: MilitaryUnitHierarchyItem;
  public currentPage: number = 0;
  public militaryItemId: string;
  public subscription: Subscription[] = [];
  public tableFilterForm: FormGroup;

  private querySubscription: Subscription;

  constructor(
    public http: CounterListService,
    private breadcrumb: BreadcrumbService,
    public dialogService: DialogService,
    private state: StateService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.querySubscription = route.queryParams.subscribe(
      (queryParam: any) => {
        this.militaryItemId = queryParam['militaryItem'];
      }
    );
    this.tableFilterForm = new FormGroup({
      date_from: new FormControl(null),
      date_until: new FormControl(null),
      number: new FormControl(null),
    });
  }

  public ngOnInit(): void {
    this.state.changeEditDataFlag(false);
    this.state.changeCompleteCreationFlag(false);
    this.state.setReportUuid(null);
    this.initList();
    this.breadcrumb.setCrumbs([{
      label: 'Ведомость'
    },
    ])
  }

  public ngOnDestroy() {
    this.subscription.forEach(el => el.unsubscribe());
  }

  public initList(): void {
    this.subscription.push(this.state.returnMilitaryUnit().subscribe(res => {
      this.militaryUnit = res;
      if (this.militaryUnit) this.getList(this.getPageParams())
    }))
  }

  public changeTypeOfDate(date: string): string {
    return (date.substr(8, 2) + '.' + date.substr(5, 2) + '.' + date.substr(0, 4));
  }

  public onSearch(): void {
    this.getList(this.getPageParams(), this.tableFilterForm.value);
  }

  public paginate(event: any): void {
    this.currentPage = event.first / this.pageSize;
    this.getList(this.getPageParams(), this.tableFilterForm.value);
  }

  public editProduct(bill: Summary): void {
    this.state.changeEditDataFlag(true);
    this.state.changeCompleteCreationFlag(true);
    this.state.setSummaryUuid(bill.uuid);
    this.router.navigate(['/countering-terrorism/create'], {
      queryParams: {
        uuid: bill.uuid,
        militaryItem: this.militaryItemId,
      }
    });

  }

  public deleteProduct(bill: Summary): void {
    this.http.deleteSummary(bill.uuid).subscribe(() => this.getList(this.getPageParams()));
  }

  public openDocument(): void {
    this.dialogService.open(DocumentDialogComponent, {});
  }

  private getList(pageParams: any, filter?: FilterTable): void {
    this.changeDateFormat(filter);
    this.http.getSummary(pageParams, this.checkNullValue(filter)).subscribe(res => {
      this.list = res.result;
      this.totalRecords = res.count;
    })
  }

  private getPageParams(): PageParams {
    return {
      page: this.currentPage,
      page_size: this.pageSize,
      military_unit_id: this.militaryUnit.id
    }
  }

  private checkNullValue(filter: FilterTable): FilterTable {
    if (filter) {
      Object.keys(filter).forEach(key => !filter[key] && delete filter[key])

      return filter
    }
  }

  private changeDateFormat(filter: FilterTable): void {
    if (filter) {
      Object.keys(filter).forEach(key => {
        if (filter[key] instanceof Date) {
          filter[key] = filter[key].toISOString();
        }
      })
    }
  }
}
