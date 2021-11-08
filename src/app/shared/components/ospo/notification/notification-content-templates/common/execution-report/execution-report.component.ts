import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationLink } from '../../../services/notification.service';
import { ExecutionReportData } from './types';
import { EXECUTION_REPORT_DATA } from './mock';

@Component({
  selector: 'app-execution-report',
  templateUrl: './execution-report.component.html',
  styleUrls: ['./execution-report.component.scss']
})
export class ExecutionReportComponent implements OnInit {

  @Input() data;
  @Output() public clickLink: EventEmitter<NotificationLink> = new EventEmitter<NotificationLink>();
  public executionReportData: ExecutionReportData = EXECUTION_REPORT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

  public emitClickLink(link): void {
    this.clickLink.emit(link);
  }
}
