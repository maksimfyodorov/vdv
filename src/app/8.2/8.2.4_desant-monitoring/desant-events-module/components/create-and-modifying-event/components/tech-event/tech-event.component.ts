import { Component, OnInit } from '@angular/core';
import {NewEventDataService} from '../../services/new-event-data.service';
import {DialogService} from 'primeng/dynamicdialog';
import {NewTechTaskDialogComponent} from './dialogs/new-tech-task-dialog/new-tech-task-dialog.component';
import {NewTechTaskService} from './services/new-tech-task.service';

@Component({
  selector: 'app-tech-event',
  templateUrl: './tech-event.component.html',
  styleUrls: ['./tech-event.component.scss'],
  providers: [NewTechTaskService],
})
export class TechEventComponent implements OnInit {
  public row: number;
  public tasksCount: number;
  public allPage: number;

  constructor(public newEventDataService: NewEventDataService,
              private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.newEventDataService.activeTab = 2;
  }

  public addNewTechTask(): void {
    this.dialogService.open(NewTechTaskDialogComponent, {
      dismissableMask: true,
      width: '720px',
      header: 'Задача десантирования ВВСТ',
      data: {eventUUID: this.newEventDataService.eventUUID},
    });
  }

 public showNextPage(page: any): void {
  }

  public changeTechTask(): void {
    this.dialogService.open(NewTechTaskDialogComponent, {
      dismissableMask: true,
      width: '720px',
      header: 'Задача десантирования ВВСТ',
      data: {eventUUID: this.newEventDataService.eventUUID, techTaskUUID: 'uuid'},
    });
  }

  public deleteTechTask(): void {
  // TODO: Реализовать метод после готовности ручки на бэке
  }

 public setTechCompleteStatus(): void {
   // TODO: Реализовать метод после готовности ручки на бэке
  }

 public addNewTechSubTask(): void {
   // TODO: Реализовать метод после готовности ручки на бэке
  }
}
