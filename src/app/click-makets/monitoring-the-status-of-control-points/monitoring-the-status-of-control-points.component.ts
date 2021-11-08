import { Component, OnInit } from '@angular/core';
import { DocumentLinks } from '../../shared/components/document-links-list/document-links-list.component';

@Component({
  selector: 'app-monitoring-the-status-of-control-points',
  templateUrl: './monitoring-the-status-of-control-points.component.html',
  styleUrls: ['./monitoring-the-status-of-control-points.component.scss']
})
export class MonitoringTheStatusOfControlPointsComponent implements OnInit {

  ds = false;
  display1 = false;
  table = 1;
  table2 = false;
  page = 1;
  jornualStatus = 1;
  display2 = false;
  display3 = false;
  display4 = false;
  display5 = false;
  displayJournalDialog  = false;
  row  = false;
  displayTab1  = false;
  displayDownloadDialog  = false;
  disabledBtn = false;
  flag = false;
  editBtnActive = false;
  btnVisible = false;
  constructor() { }

  ngOnInit(): void {}


  co($event): void {
    this.page = $event.index + 1;

  }
}
