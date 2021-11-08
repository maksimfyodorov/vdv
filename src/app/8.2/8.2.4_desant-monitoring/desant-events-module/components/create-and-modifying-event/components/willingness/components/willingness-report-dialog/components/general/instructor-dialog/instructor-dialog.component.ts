import { Report } from './../../../../../../../../../../../../shared/types/interfaceReport';
import { Component, OnInit } from '@angular/core';
import { Executive } from '../../../../../../../../../../../../shared/components/military/interfaces';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ReportsDialogComponent } from '../../../../../../../../../../../../shared/components/ospo/reports-dialog/reports-dialog/reports-dialog.component';

@Component({
  selector: 'app-instructor-dialog',
  templateUrl: './instructor-dialog.component.html',
  styleUrls: ['./instructor-dialog.component.scss']
})
export class InstructorDialogComponent implements OnInit {

  public selectedReport: Report;
  public instructor: Executive;
  public date;
  public time;
  public title = 'Шаблоны отчетов: Подготовительные мероприятия';

  constructor(private dialogService: DialogService, private ref: DynamicDialogRef ) { }

  ngOnInit(): void {
  }

  public getRapporteurVDP(event: Executive): void {
    this.instructor = event;
  }

  public show(): void {
    const ref = this.dialogService.open(ReportsDialogComponent, {
      header: this.title,
      width: '1066px',
      dismissableMask: true,
    }).onClose.subscribe(res => {
      this.selectedReport = res;
    });
  }

  public save(): void {
    const tableData: any = {
      selectedReport: this.selectedReport,
      instructor: this.instructor,
      date: this.date,
      time: this.time,
    };
    this.ref.close(tableData);
  }

  public close(): void {
    this.ref.close();
  }

}
