import {Component, OnInit} from '@angular/core';
import {NewEventDataService} from '../create-and-modifying-event/services/new-event-data.service';

@Component({
  selector: 'app-desant-events-main',
  templateUrl: './desant-events-main.component.html',
  styleUrls: ['./desant-events-main.component.scss']
})
export class DesantEventsMainComponent implements OnInit {

  constructor(private newEventService: NewEventDataService) {
  }

  ngOnInit(): void {
  }

  public addDesantEvent(): void {
    this.newEventService.eventInfo = null;
  }
}
