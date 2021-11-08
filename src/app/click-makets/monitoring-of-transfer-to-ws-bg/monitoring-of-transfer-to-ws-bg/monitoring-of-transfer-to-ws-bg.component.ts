import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-monitoring-of-transfer-to-ws-bg',
  templateUrl: './monitoring-of-transfer-to-ws-bg.component.html',
  styleUrls: ['./monitoring-of-transfer-to-ws-bg.component.scss'],
})
export class MonitoringOfTransferToWsBGComponent implements OnInit {

  table = 1;
  display1 = false;
  display2 = false;
  display3 = false;
  display4 = false;
  display5 = false;
  display6 = false;
  display7 = false;
  varInDialog = 0;
  isContact = false;
  constructor() { }

  ngOnInit(): void {
  }

  contactClick(): void {
    this.table = 6;
    this.isContact = true;
  }


}
