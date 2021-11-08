import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { ReportsDialogComponent } from '../../../../../../shared/components/ospo/reports-dialog/reports-dialog/reports-dialog.component';
import { Mode, ReportData, TextTemplate } from '../../../../interfaces/interface';
import { CounterListService } from '../../../services/counter-list.service';
import { StateService } from '../../../services/state.service';

enum Reports {
  'План подготовки личнного состава по противодействию терроризму' = 'plan'
}

enum ReportsName {
  plan,
}

@Component({
  selector: 'app-annual-plan',
  templateUrl: './annual-plan.component.html',
  styleUrls: ['./annual-plan.component.scss']
})
export class AnnualPlanComponent implements OnInit, OnDestroy {

  public planForm: FormGroup = new FormGroup({
    plan: new FormControl(''),
    planFlag: new FormControl(true),
  });

  public militaryItemId: string;
  public id: string;
  private subscriptions: Subscription[] = [];
  public reportTypes: Mode[];
  private reportUuid: string;

  constructor(
    public dialogService: DialogService,
    private stateService: StateService,
    private http: CounterListService,
  ) {
    this.id = this.http.getQueryId();
    this.militaryItemId = this.http.getQueryMilitaryItemId();
  }

  public ngOnInit(): void {
    this.stateService.changePageIndex(4);
    this.subscriptions.push(this.stateService.returnReportUuid().subscribe(res => {
      this.getReportType();
      this.reportUuid = res;
      this.getReportRecord(this.reportUuid);
    }));
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(element => {
      element.unsubscribe();
    });
  }

  public reducePageIndex(): void {
    this.stateService.changePageIndex(3);
  }

  public addPageIndex(): void {
    this.stateService.changePageIndex(5);
  }

  public openReportDialog(index: number, reportName: string): void {
    const report = this.findReport(reportName);
    this.dialogService.open(ReportsDialogComponent, {
      header: `Шаблоны отчётов: ${reportName}`, width: '60%',
      data: {
        uuid: report.uuid,
      }
    }).onClose.subscribe(res => {
      this.planForm.controls[ReportsName[index]].setValue(res);
    })
  }

  public sendTemplate(templateType: string, text: string): void {
    this.reportTypes.forEach(element => {
      if (element.name === templateType) {
        const template: TextTemplate = {
          text: text,
          report_type_uuid: element.uuid,
        }
        this.http.postReportTemplate(template).subscribe();
      }
    });
  }

  public getReportType(): void {
    this.http.getReportType().subscribe(res => {
      this.reportTypes = res.result;
    })
  }

  public sendAllReportRecords(): void {
    this.sendSingleReportRecord('План подготовки личнного состава по противодействию терроризму');
  }

  private sendSingleReportRecord(reportName: string, templateUuid?: string): void {
    const text: string = this.planForm.controls[Reports[reportName]].value;
    const flag: boolean = this.planForm.controls[Reports[reportName] + 'Flag'].value;
    const report: Mode = this.findReport(reportName);
    if (report) {
      const record: ReportData = {
        text: flag ? text : null,
        report_uuid: this.reportUuid,
        access: flag,
        report_template_uuid: templateUuid ? templateUuid : null,
        report_type_uuid: report.uuid,
      };
      this.http.postReportRecord(record).subscribe();
    }
  }

  private findReport(reportName: string): Mode {
    return this.reportTypes ? this.reportTypes.find((r: Mode) => r.name === reportName) : null;
  }

  private getReportRecord(reportUuid: string): void {
    if (reportUuid) this.httpRequestToReportRecord(reportUuid);
  }

  private httpRequestToReportRecord(reportUuid: string): void {
    this.subscriptions.push(this.http.getReportRecord(reportUuid).subscribe(res => {
      res.result.forEach(element => {
        if (element?.report_type?.name) {
          this.updateForm(element.report_type.name, element.text);
        }
      });
    }))
  }

  private updateForm(reportName: string, value: string): void {
    if (this.planForm.controls[Reports[reportName]]) {
      this.planForm.controls[Reports[reportName]].patchValue(value);
    }
  }
}
