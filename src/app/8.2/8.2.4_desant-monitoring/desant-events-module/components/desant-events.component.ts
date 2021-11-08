import {Component, OnDestroy, OnInit} from '@angular/core';
import {MilitaryUnitService} from '../../services/military-unit.service';
import {Subscription, SubscriptionLike} from 'rxjs';
import {MilitaryUnitHierarchyItem} from '../../../../shared/components/ospo/military-units/military-units-sidebar/interfaces/interfaces';
import {DesantEventsService} from '../services/desant-events.service';
import {NewEventDataService} from './create-and-modifying-event/services/new-event-data.service';
import {DesantTabsService} from '../../services/desant-tabs.service';
import {NewEventApiService} from './create-and-modifying-event/services/new-event-api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-desant-events',
  templateUrl: './desant-events.component.html',
  styleUrls: ['./desant-events.component.scss'],
})
export class DesantEventsComponent implements OnInit, OnDestroy {

  public showMain = true;
  public changeEventInfo: object;
  public newEventInfo: object;
  private sub: SubscriptionLike;
  public selectedMilitaryUnit: MilitaryUnitHierarchyItem;

  constructor(public desantTabsService: DesantTabsService,
              private militaryUnitService: MilitaryUnitService,
              private newEventService: NewEventDataService,
              private readonly activeRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.sub = this.militaryUnitService.currentMilitaryUnit$.subscribe(value => {
      this.newEventService.selectedMilitaryUnit = value;
    });
    this.desantTabsService.activeTabIndex = 0;
  }

  public showNewEventPage(event): void {
    this.newEventInfo = event;
    this.showMain = false;
    this.changeEventInfo = null;
  }

  public changeEventPage(event: any): void {
    this.showMain = false;
    this.changeEventInfo = event;
    this.newEventInfo = null;
  }

  public showMainPage(): void {
    this.showMain = true;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
