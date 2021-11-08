import {Component, OnDestroy, OnInit} from '@angular/core';
import {NewEventDataService} from './services/new-event-data.service';

import {MenuItem} from 'primeng/api';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {MilitaryUnitService} from '../../../services/military-unit.service';
import {DesantTabsService} from '../../../services/desant-tabs.service';

@Component({
  selector: 'app-desant-new-event',
  templateUrl: './create-and-modifying-event.component.html',
  styleUrls: ['./create-and-modifying-event.component.scss'],
})
export class CreateAndModifyingEventComponent implements OnInit, OnDestroy {
  public items: MenuItem[] = [
    {label: 'Общие сведения', routerLink: 'general', queryParams: {uuid: this.newEventService.eventUUID}},
    {label: 'Личный состав', routerLink: 'staff', queryParams: {uuid: this.newEventService.eventUUID}},
    {label: 'ВВСТ', routerLink: 'vvst', queryParams: {uuid: this.newEventService.eventUUID}},
    {label: 'Грузы', routerLink: 'cargo', queryParams: {uuid: this.newEventService.eventUUID}},
    {label: 'Готовность', routerLink: 'readiness', queryParams: {uuid: this.newEventService.eventUUID}},
    {label: 'Авиация', routerLink: 'airplanes', queryParams: {uuid: this.newEventService.eventUUID}},
  ];

  private subscriptions: Subscription;

  constructor(public newEventService: NewEventDataService,
              private route: ActivatedRoute,
              private militaryUnitService: MilitaryUnitService,
              private desantTabService: DesantTabsService,
  ) {
  }

  public ngOnInit(): void {
    if (this.newEventService.eventInfo) {
      this.setChangeEventInfo();
    } else {
      this.newEventService.newEventComponentState = 'create';
    }
    this.initEventUUID();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public showMain(): void {
    this.newEventService.eventUUID = null;
    this.newEventService.eventInfo = null;
    this.newEventService.title = null;
    this.newEventService.newEventComponentState = null;
  }

  private setChangeEventInfo(): void {
    this.newEventService.newEventComponentState = 'edit';
  }

  private initEventUUID(): void {
    this.subscriptions = this.newEventService.eventUUID$
      .subscribe(uuid => this.items.forEach(item => item.queryParams.uuid = uuid));
  }
}
