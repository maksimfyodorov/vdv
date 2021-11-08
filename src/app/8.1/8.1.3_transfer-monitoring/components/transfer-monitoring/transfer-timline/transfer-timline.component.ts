import { Component, OnInit } from '@angular/core';
import { TransferType } from '../../../interfaces/interface';
import { EventTableDataService } from '../../../services/event-table-data.service';
import { EventTableService } from '../../../services/event-table.service';

@Component({
  selector: 'app-transfer-timline',
  templateUrl: './transfer-timline.component.html',
  styleUrls: ['./transfer-timline.component.scss']
})
export class TransferTimlineComponent implements OnInit {

  public showEvent: any[] = [];

  public selectedType: TransferType = {
    uuid: 'safsafasfa',
    name: 'Постоянная всБГ -> Повышенная всБГ -> Военная опасность всБГ -> Полная всБГ',
    index: [1, 2, 3, 4],
  }

  public events: any[] = [
    {
      type: "Постоянная",
      status: 'Не заполнено',
      index: 1,
    },
    {
      type: "Повышенная",
      status: 'Не заполнено',
      index: 2,
    },
    {
      type: "Военная опасность",
      status: 'Не заполнено',
      index: 3,
    },
    {
      type: "Полная",
      status: 'Не заполнено',
      index: 4,
    },
  ]

  public selectedTypeCopy: TransferType;
  public transferTypes: TransferType[];

  constructor(
    public eventTableDataService: EventTableDataService,
    public httpService: EventTableService,
  ) { }

  public ngOnInit(): void {
    this.showEvent = this.events;
    this.getTransferSet();
  }

  public selectType(data: any): void {
    const event = data.value;
    const arr = [];
    event.index.forEach(element => {
      arr.push(this.events[element - 1])
    });
    this.showEvent = arr;
    if (this.selectedType != this.selectedTypeCopy) {
      this.selectedTypeCopy = this.selectedType;
      this.eventTableDataService.selectedType.next(this.selectedType)
    };
  }

  public getTransferSet(): void {
    this.httpService.getTransferSet().subscribe(res => {
      this.transferTypes = res;
      this.selectedType = res[0];
      this.selectedTypeCopy = this.selectedType;
    this.eventTableDataService.selectedType.next(this.selectedType);
    })
  }

}
