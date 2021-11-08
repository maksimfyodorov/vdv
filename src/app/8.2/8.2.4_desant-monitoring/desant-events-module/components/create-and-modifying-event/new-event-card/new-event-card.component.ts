import {Component, OnInit} from '@angular/core';
import {StaffTask} from '../../../types/desant-events.type';

@Component({
  selector: 'app-new-event-card',
  templateUrl: './new-event-card.component.html',
  styleUrls: ['./new-event-card.component.scss']
})
export class NewEventCardComponent implements OnInit {
  public expandOpenStateEvent = false;
  public tasks: StaffTask[];
  public selectedTask: StaffTask;
  public openStateAirdrome = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  public changeOpenState(): void {
    this.expandOpenStateEvent = !this.expandOpenStateEvent;
  }

  public changeOpenStateAirdrome(): void {
    this.openStateAirdrome = !this.openStateAirdrome;
  }

  public  showAllMilitaryUnit(): void {
  }
}
