import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { ReportsDialogComponent } from '../../../../../../shared/components/ospo/reports-dialog/reports-dialog/reports-dialog.component';
import { Mode, ReportData, TextTemplate } from '../../../../interfaces/interface';
import { CounterListService } from '../../../services/counter-list.service';
import { StateService } from '../../../services/state.service';

enum Reports {
  'Командирская проверка' = 'commandCheck',
  'Проверка военного управления' = 'militaryControlCheck',
  'Проверка начальником зоны' = 'zoneMasterCheck',
  'Проверка местных гарнизонов' = 'checkingLocalGarrisons',
}

enum ReportsName {
  commandCheck,
  militaryControlCheck,
  zoneMasterCheck,
  checkingLocalGarrisons,
}

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit, OnDestroy {

  public verificationForm: FormGroup = new FormGroup({
    commandCheck: new FormControl(''),
    militaryControlCheck: new FormControl(''),
    zoneMasterCheck: new FormControl(''),
    checkingLocalGarrisons: new FormControl(''),
    commandCheckFlag: new FormControl(true),
    militaryControlCheckFlag: new FormControl(true),
    zoneMasterCheckFlag: new FormControl(true),
    checkingLocalGarrisonsFlag: new FormControl(true),
  });

  public id: string;
  public militaryItemId: string;
  public reportTypes: Mode[];
  private subscriptions: Subscription[] = [];
  private reportUuid: string;

  constructor(
    private dialogService: DialogService,
    private stateService: StateService,
    private route: ActivatedRoute,
    private http: CounterListService,
  ) {
    this.id = this.http.getQueryId();
    this.militaryItemId = this.http.getQueryMilitaryItemId();
  }

  public ngOnInit(): void {
    this.stateService.changePageIndex(6);
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

  public openReportDialog(index: number, reportName: string): void {
    const report = this.findReport(reportName);
    this.dialogService.open(ReportsDialogComponent, {
      header: `Шаблоны отчётов: ${reportName}`, width: '60%',
      data: {
        uuid: report.uuid,
      }
    }).onClose.subscribe(res => {
      this.verificationForm.controls[ReportsName[index]].setValue(res);
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

  public reducePageIndex(): void {
    this.stateService.changePageIndex(5);
  }

  public addPageIndex(): void {
    this.stateService.changePageIndex(7);
  }

  public sendSingleReportRecord(reportName: string, templateUuid?: string): void {
    const text: string = this.verificationForm.controls[Reports[reportName]].value;
    const flag: boolean = this.verificationForm.controls[Reports[reportName] + 'Flag'].value;
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

  private getReportType(): void {
    this.subscriptions.push(this.http.getReportType().subscribe(res => {
      this.reportTypes = res.result;
    }))
  }

  private findReport(reportName: string): Mode {
    return this.reportTypes ? this.reportTypes.find((r: Mode) => r.name === reportName) : null;
  }

  private getReportRecord(reportUuid: string): void {
    if (reportUuid) {
      this.httpRequestToReportRecord(reportUuid);
    }
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
    if (this.verificationForm.controls[Reports[reportName]]) {
      this.verificationForm.controls[Reports[reportName]].patchValue(value);
    }
  }

}
