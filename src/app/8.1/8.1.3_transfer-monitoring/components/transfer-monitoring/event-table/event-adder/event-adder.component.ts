import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EventTableDataService } from '../../../../services/event-table-data.service';
import { DialogService } from 'primeng/dynamicdialog';
import { filter, tap } from 'rxjs/operators'
import { AddEventModalComponent } from './add-event-modal/add-event-modal.component'
import { Subscription } from 'rxjs';
import { TableColumns } from '../../../../interfaces/interface';
import { EventCompleteComponent } from './event-complete/event-complete.component';
@Component({
  selector: 'app-event-adder',
  templateUrl: './event-adder.component.html',
  styleUrls: ['./event-adder.component.scss'],
})
export class EventAdderComponent implements OnInit, OnDestroy {

  @Input() header: string;
  @Input() editFlag: boolean;

  public cols: TableColumns[];
  public fieldsArray: string[] = ['time', 'name', 'normal_time'];

  public products: any[] = [
    {
      name: 'asfasfasfas',
      time: '00:00:01:00:00',
      normal_time: '1 month'
    },
    {
      name: 'gs3g23geg',
      time: '00:00:01:00:00',
      normal_time: '1 month'
    },
    {
      name: '421533',
      time: '00:00:01:00:00',
      normal_time: '1 month'
    },
  ];

  private subscriptions: Subscription[] = [];

  constructor(
    private dataService: EventTableDataService,
    private dialog: DialogService,
  ) { }

  public ngOnInit(): void {
    this.initColumns();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(el => el.unsubscribe());
  }

  public pushRow(): void {
    this.subscriptions.push(this.dialog.open(AddEventModalComponent, {
      header: 'Добавление мероприятия',
      width: '35%'
    }).onClose.pipe(filter(res => res)).subscribe(res => {
      let event = {}
      this.cols.forEach(el => {
        event[el.field] = null;
      })
      event['name'] = res.name;
      event['time'] = res.time;
      event['normal_time'] = res.normal_time;
      this.products.push(event);
    }))
  }

  public initColumns(): void {
    this.subscriptions.push(this.dataService.returnCols().subscribe(res => {
      this.cols = res
      this.products.forEach(element => {
        this.cols.forEach(key => {
          if (!element[key.field]) element[key.field] = null;
        })
      })
    }));
  }

  public deleteRow(index: number) {
    this.products.splice(index, 1);
  }

  public completeEvent(data: string, index: any) {
    if (this.editFlag) {
      this.subscriptions.push(this.dialog.open(EventCompleteComponent, {
        header: `Выполнение мероприятия ${this.products[index].name}`,
        width: '20%',
        data: {
          time: this.products[index].time,
        }
      }).onClose.pipe(
        filter(res => res),
      ).subscribe(res => {
        this.products[index][data] = res.time;
      }))
    }
  }

}
