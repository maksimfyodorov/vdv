import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Actualization } from '../settings-information-array/interfaces/actualization';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  display = true;
  dialogProducts: Actualization[];
  statuses = [];
  uuid: string[] = [];
  green: string = '#82C91E';
  red: string = '#FA5252';

  constructor(public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.dialogProducts = this.config.data;
    for (let i = 0; i < this.dialogProducts.length; i++) {
      this.statuses[i] = this.checkStatus(this.dialogProducts[i]);
      this.uuid[i] = this.dialogProducts[i].uuid;
    }
  }

  checkStatus(informationArray: Actualization): string {
    let files = informationArray.files;
    let count = 0;
    let status;
    for (let i = 0; i < files?.length; i++) {
      if (files[i].status === "Не обновлён") {
        count++;
      }
    }
    if (count > 0 && files.length - count > 0) {
      status = `Обновлено ${files.length - count} из ${files.length}`;
    }
    else if (files.length - count == files.length) {
      status = `Обновлено`;
    }
    else {
      status = `Не обновлено`;
    };
    return status;
  }

  getStatus(status: string): string {
    return status == 'Обновлён' ? 'Обновлён' : 'Не Обновлён'
  }

  getBackgroundColor(status: string): string {
    return status == 'Обновлён' ? this.green : this.red
  }

  getBackgroundStatus(lengthOfStatus: number): string {
    return lengthOfStatus > 9 ? this.red : this.green
  }

}
