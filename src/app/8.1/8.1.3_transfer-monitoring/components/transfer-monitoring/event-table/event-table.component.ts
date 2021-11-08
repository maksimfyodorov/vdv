import { OnDestroy, Component, Input, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { EventTableDataService } from '../../../services/event-table-data.service';
import { AddMilitaryFormationComponent } from './add-military-formation/add-military-formation.component';
import { filter } from 'rxjs/operators'
import { Subscription } from 'rxjs';
import { TableColumns } from '../../../interfaces/interface';

@Component({
  selector: 'app-event-table',
  templateUrl: './event-table.component.html',
  styleUrls: ['./event-table.component.scss']
})
export class EventTableComponent implements OnInit, OnDestroy {

  @Input() editFlag: boolean;

  public headers: string[] = [];
  public cols: TableColumns[] = [
    { field: 'name', header: 'Наименование' },
    { field: 'time', header: 'Время Ч+' },
    { field: 'normal_time', header: 'Нормативное время' },
  ];

  private subscriptions: Subscription[] = [];

  constructor(
    private dialog: DialogService,
    private dataService: EventTableDataService,
  ) { }

  public ngOnInit(): void {
    this.dataService.cols.next(this.cols);
    this.subscriptions.push(this.dataService.returnSelectedType().pipe(filter(res => res)).subscribe(res => {
      this.headers = [];
      this.setHeaders(res.name);
    }))
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(el => el.unsubscribe());
  }

  public pushVf(): void {
    this.dialog.open(AddMilitaryFormationComponent, {
      header: 'Добавить ВФ',
      width: '30%'
    }).onClose.pipe(filter(res => res)).subscribe(res => {
      this.cols.push({ field: res.field, header: res.name, })
      this.dataService.cols.next(this.cols);
    })
  }

  public setHeaders(str: string): void {
    const firstArrowIndex = str.indexOf('->');
    const secondArrowIndex = str.indexOf('->', firstArrowIndex + 2);
    if (secondArrowIndex >= 0) {
      const header = str.substr(0, secondArrowIndex);
      this.headers.push(header);
      this.setHeaders(str.substr(firstArrowIndex + 2));
    } else if (firstArrowIndex >= 0) {
      const header = str;
      this.headers.push(header);
    }
  }

}
