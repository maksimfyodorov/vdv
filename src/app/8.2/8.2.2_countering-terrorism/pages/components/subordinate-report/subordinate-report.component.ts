import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { FilterTable, PageParams, Summary } from '../../../interfaces/interface';
import { CounterListService } from '../../services/counter-list.service';

@Component({
  selector: 'app-subordinate-report',
  templateUrl: './subordinate-report.component.html',
  styleUrls: ['./subordinate-report.component.scss']
})
export class SubordinateReportComponent implements OnInit {

  public militaryUnitId: string;
  public pageSize: number = 10;
  public totalRecords: number = 3;
  public list: Summary[];
  public tableFilterForm: FormGroup;
  public subscription: Subscription[] = [];
  public currentPage: number = 0;

  public selectedBill: any;

  constructor(
    private dialogRef: DynamicDialogRef,
    public http: CounterListService,
    public config: DynamicDialogConfig,
  ) {
    this.tableFilterForm = new FormGroup({
      date_from: new FormControl(null),
      date_until: new FormControl(null),
      number: new FormControl(null),
    });
  }

  public ngOnInit(): void {
    this.initList();
  }

  public paginate(event: any): void {
    this.currentPage = event.first / this.pageSize;
    this.getList(this.getPageParams(), this.tableFilterForm.value);
  }

  public editProduct(event: any): void {

  }

  public deleteProduct(event: any): void {

  }

  public initList(): void {
    this.militaryUnitId = this.config.data.military_unit_id;
    this.getList(this.getPageParams(), this.tableFilterForm.value);
  }

  public changeTypeOfDate(date: string): string {
    return (date.substr(8, 2) + '.' + date.substr(5, 2) + '.' + date.substr(0, 4));
  }

  public addSubordinate(): void {
    this.dialogRef.close(this.selectedBill);
  }

  public cancelSubordinate(): void {
    this.dialogRef.close();
  }

  public onSearch(): void {
    this.getList(this.getPageParams(), this.tableFilterForm.value);
  }

  private getPageParams(): PageParams {
    return {
      page: this.currentPage,
      page_size: this.pageSize,
      military_unit_id: Number(this.militaryUnitId),
      military_near_tree: true,
    }
  }

  private getList(pageParams: any, filter?: FilterTable): void {
    this.changeDateFormat(filter);
    this.http.getSummary(pageParams, this.checkNullValue(filter)).subscribe(res => {
      this.list = res.result;
      this.totalRecords = res.count;
    })
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
