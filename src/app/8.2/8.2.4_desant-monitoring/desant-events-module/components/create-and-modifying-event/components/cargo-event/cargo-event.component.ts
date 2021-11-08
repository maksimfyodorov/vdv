import { Component, OnInit } from '@angular/core';
import {NewEventDataService} from '../../services/new-event-data.service';
import {DialogService} from 'primeng/dynamicdialog';
import {NewCargoTaskDialogComponent} from './dialogs/new-cargo-task-dialog/new-cargo-task-dialog.component';

@Component({
  selector: 'app-cargo-event',
  templateUrl: './cargo-event.component.html',
  styleUrls: ['./cargo-event.component.scss'],
  providers: [DialogService],
})
export class CargoEventComponent implements OnInit {
  public tasksCount: number;
  public row: number;
  public allPage: number;

  constructor(public newEventDataService: NewEventDataService,
              public dialogService: DialogService,
              ) { }

  ngOnInit(): void {
    this.newEventDataService.activeTab = 3;
  }

  public addNewCargoTask(): void {
    this.dialogService.open(NewCargoTaskDialogComponent, {
      dismissableMask: true,
      width: '720px',
      header: 'Задача десантирования грузов',
      data: {eventUUID: this.newEventDataService.eventUUID},
    });
  }
  showNextPage(page: number): void {
    // TODO: Реализовать метод, после готовности  бэка
  }

  public changeCargoTask(): void {
    // TODO: Реализовать метод, после готовности ручки на бэке
  }

  public deleteCargoTask(): void {
    // TODO: Реализовать метод, после готовности ручки на бэке
  }

  public setStaffCompleteStatus(): void {
    // TODO: Реализовать метод, после готовности ручки на бэке
  }

  public addNewSubTask(): void {
    // TODO: Реализовать метод, после готовности ручки на бэке
  }

}
