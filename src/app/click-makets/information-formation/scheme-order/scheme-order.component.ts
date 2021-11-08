import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scheme-order',
  templateUrl: './scheme-order.component.html',
  styleUrls: ['./scheme-order.component.scss']
})
export class SchemeOrderComponent implements OnInit {

  bp1 = false;
  display1 = false;
  display2 = false;
  display3 = false;
  display4 = false;
  display5 = false;

  visibleReport: boolean = false;
  visibleReport1: boolean = false;
  visibleChannel: boolean = false;
  visibleControl: boolean = false;
  visibleNetworkControl: boolean = false;
  visibleCreateSchemeOrder: boolean = false;
  editSchema: boolean = false;

  isGeneratedReport: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  generateReport(): void {
    this.visibleReport = true;
    this.isGeneratedReport = true;

    setTimeout(() => (this.visibleReport = false), 3000);
  }

  generateReport1(): void {
    this.visibleReport1 = true;

    setTimeout(() => (this.visibleReport1 = false), 3000);
  }

}
