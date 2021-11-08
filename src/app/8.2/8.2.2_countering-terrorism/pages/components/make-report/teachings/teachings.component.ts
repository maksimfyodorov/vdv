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
  'Участие в международных учениях и тренировках' = 'internationalExercises',
  'Участие в штабных переговорах' = 'participationStaff',
  'Участие в разработке международных нормативно-правовых и иных документов' = 'developmentParticipation',
  'Проблемные вопросы' = 'problematicIssues',
}

enum ReportsName {
  internationalExercises,
  participationStaff,
  developmentParticipation,
  problematicIssues,
}

@Component({
  selector: 'app-teachings',
  templateUrl: './teachings.component.html',
  styleUrls: ['./teachings.component.scss']
})
export class TeachingsComponent implements OnInit, OnDestroy {

  public teachingForm: FormGroup = new FormGroup({
    internationalExercises: new FormControl(''),
    participationStaff: new FormControl(''),
    developmentParticipation: new FormControl(''),
    problematicIssues: new FormControl(''),
    internationalExercisesFlag: new FormControl(true),
    participationStaffFlag: new FormControl(true),
    developmentParticipationFlag: new FormControl(true),
    problematicIssuesFlag: new FormControl(true),
  });

  public id: string;
  public militaryItemId: string;
  public reportTypes: Mode[];
  private reportUuid: string;
  private subscriptions: Subscription[] = [];

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
    this.stateService.changePageIndex(7);
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
      this.teachingForm.controls[ReportsName[index]].setValue(res);
    })
  }

  public reducePageIndex(): void {
    this.stateService.changePageIndex(6);
  }

  public create(): void {
    this.stateService.changeCompleteCreationFlag(true);
    this.stateService.changePageIndex(0);
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

  public sendSingleReportRecord(reportName: string, templateUuid?: string): void {
    const text: string = this.teachingForm.controls[Reports[reportName]].value;
    const flag: boolean = this.teachingForm.controls[Reports[reportName] + 'Flag'].value;
    const report: Mode = this.findReport(reportName)
    if (report) {
      const record: ReportData = {
        text: flag ? text : null,
        report_uuid: this.reportUuid,
        access: flag,
        report_template_uuid: templateUuid ? templateUuid : null,
        report_type_uuid: report.uuid,
      };
      this.subscriptions.push(this.http.postReportRecord(record).subscribe());
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
    if (this.teachingForm.controls[Reports[reportName]]) {
      this.teachingForm.controls[Reports[reportName]].patchValue(value);
    }
  }
}
