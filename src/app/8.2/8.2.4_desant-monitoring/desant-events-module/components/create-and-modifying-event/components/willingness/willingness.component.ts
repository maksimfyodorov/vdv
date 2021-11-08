import { Report } from './../../../../../../../shared/types/interfaceReport';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { WillingnessReportDialogComponent } from './components/willingness-report-dialog/willingness-report-dialog.component';

@Component({
  selector: 'app-willingness',
  templateUrl: './willingness.component.html',
  styleUrls: ['./willingness.component.scss']
})
export class WillingnessComponent implements OnInit {
  public dialogTitle = 'Готовность к десантированию личного состава';
  public selectedReport: Report;
  constructor(private dialogService: DialogService) { }

  ngOnInit(): void {
  }

  public show(): void {
    const ref = this.dialogService.open(WillingnessReportDialogComponent, {
      header: this.dialogTitle,
      width: '1066px',
      dismissableMask: true,
      style: {'max-height': '93%'}
    }).onClose.subscribe(res => {
      this.selectedReport = res;
    });
  }
}
