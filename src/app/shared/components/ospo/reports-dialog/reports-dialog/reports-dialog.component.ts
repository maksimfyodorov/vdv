import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ReportService } from '../../../../services/reports.service';
import { Report } from '../../../../types/interfaceReport';

@Component({
  selector: 'app-reports-dialog',
  templateUrl: './reports-dialog.component.html',
  styleUrls: ['./reports-dialog.component.scss'],
  providers: [ReportService],
})
export class ReportsDialogComponent implements OnInit {
  public reports: Report[];
  public loading: boolean;
  public totalRecords: number;
  public selectedReport: Report;
  public cloneReports: { [uuid: string]: Report; } = {};

  constructor(
    public config: DynamicDialogConfig,
    public dialog: DynamicDialogRef,
    private ref: DynamicDialogRef,
    private reportService: ReportService,
    private cdr: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    this.loading = true;

  }

  public onRowEditInit(report): void {
    this.cloneReports[report.uuid] = { ...report };
  }

  public onRowEditSave(product: any): void {
    console.log('product :>> ', product);
  }

  public onRowEditCancel(report: Report, index: number): void {
    this.reports[index] = this.cloneReports[report.uuid];
    delete this.cloneReports[report.uuid];
  }

  public loadReports(event: LazyLoadEvent): void {
    if (this.config?.data?.uuid) {
      this.loadTemplates(this.config?.data?.uuid);
    }
    else {
      this.reportService.getReports().subscribe((res) => {
        this.reports = res.value;
        this.totalRecords = res.total;
      });
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  public loadTemplates(uuid: string) {
    this.reportService.getTemplates(uuid).subscribe(res => {
      this.reports = res.result
      this.totalRecords = res.count;
      this.loading = false;
      this.cdr.detectChanges();
    })
  }

  public chooseReport(report: Report): void {
    this.selectedReport = report;
  }

  public close(): void {
    this.dialog.close();
  }

  public save(): void {
    this.ref.close(this.config?.data?.uuid ? this.selectedReport.text : this.selectedReport.report);
  }

}
