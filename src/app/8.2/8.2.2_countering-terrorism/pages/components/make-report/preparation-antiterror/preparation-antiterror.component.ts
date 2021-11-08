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
  'Ежемесячные демонстративные тренировки' = 'monthlyDemonstrationWorkouts',
  'Командно-штабные учения' = 'commandPostExercise',
  'Учение под руководством командующего ВДВ' = 'teachingsComander',
  'Учения НАК' = 'teachingsNak',
}

enum ReportsName {
  teachingsNak,
  teachingsComander,
  commandPostExercise,
  monthlyDemonstrationWorkouts,
}
@Component({
  selector: 'app-preparation-antiterror',
  templateUrl: './preparation-antiterror.component.html',
  styleUrls: ['./preparation-antiterror.component.scss']
})
export class PreparationAntiterrorComponent implements OnInit, OnDestroy {


  public preparationForm: FormGroup = new FormGroup({
    teachingsNak: new FormControl(''),
    teachingsComander: new FormControl(''),
    commandPostExercise: new FormControl(''),
    monthlyDemonstrationWorkouts: new FormControl(''),
    monthlyDemonstrationWorkoutsFlag: new FormControl(true),
    commandPostExerciseFlag: new FormControl(true),
    teachingsComanderFlag: new FormControl(true),
    teachingsNakFlag: new FormControl(true),
  });

  public reportTypes: Mode[];
  public militaryItemId: string;
  public id: string;
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
    this.stateService.changePageIndex(3);
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
      this.preparationForm.controls[ReportsName[index]].setValue(res);
    })
  }

  public reducePageIndex(): void {
    this.stateService.changePageIndex(2)
  }

  public addPageIndex(): void {
    this.stateService.changePageIndex(4)
  }

  public sendSingleReportRecord(reportName: string, templateUuid?: string): void {
    const text: string = this.preparationForm.controls[Reports[reportName]].value;
    const flag: boolean = this.preparationForm.controls[Reports[reportName] + 'Flag'].value;
    const report: Mode = this.findReport(reportName)
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

  public sendTemplate(templateType: string, text: string): void {
    this.reportTypes.forEach(element => {
      if (element.name === templateType) {
        const template: TextTemplate = {
          text: text,
          report_type_uuid: element.uuid,
        }
        this.http.postReportTemplate(template).subscribe()
      }
    });
  }

  private getReportType(): void {
    this.subscriptions.push(this.http.getReportType().subscribe(res => {
      this.reportTypes = res.result;
    }))
  }

  private findReport(reportName: string): Mode {
    return this.reportTypes ? this.reportTypes.find((r: Mode) => r.name === reportName) : null
  }

  private updateForm(reportName: string, value: string): void {
    if (this.preparationForm.controls[Reports[reportName]]) {
      this.preparationForm.controls[Reports[reportName]].patchValue(value);
    }
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
          this.updateForm(element.report_type.name, element.text)
        }
      });
    }))
  }

}
