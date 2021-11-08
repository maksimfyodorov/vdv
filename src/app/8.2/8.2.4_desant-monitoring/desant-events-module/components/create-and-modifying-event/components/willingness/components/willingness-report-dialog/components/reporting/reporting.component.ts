import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent implements OnInit {

  public traningStatus = false;
  public startTime;
  public endTime;
  public date;

  constructor() { }

  ngOnInit(): void {
  }


  public changeTraningStatus(): void {
    this.traningStatus = true;
  }

}
