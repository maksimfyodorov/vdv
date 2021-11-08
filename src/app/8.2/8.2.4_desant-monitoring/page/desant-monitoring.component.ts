import {Component, OnDestroy, OnInit} from '@angular/core';
import {MilitaryUnitService} from '../services/military-unit.service';
import {MilitaryUnitHierarchyItem} from '../../../shared/components/ospo/military-units/military-units-sidebar/interfaces/interfaces';
import {MenuItem} from 'primeng/api';
import {DesantTabsService} from '../services/desant-tabs.service';
import {SubscriptionLike} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-desant-monitoring',
  templateUrl: './desant-monitoring.component.html',
  styleUrls: ['./desant-monitoring.component.scss']
})
export class DesantMonitoringComponent implements OnInit, OnDestroy {
  public items: MenuItem[];
  private sub: SubscriptionLike;

  constructor(public militaryUnitService: MilitaryUnitService,
              public desantTabsService: DesantTabsService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.getCurrentMilitaryUnit();
    this.items = [
      {label: 'Мероприятия', routerLink: 'events', queryParams: {id:  this.militaryUnitService.currentMilitaryUnit?.id}},
      {label: 'Указания на год', routerLink: 'indication-off-the-year', queryParams: {id:  this.militaryUnitService.currentMilitaryUnit?.id}},
      {label: 'Спортивная команда', routerLink: 'sport-team', queryParams: {id:  this.militaryUnitService.currentMilitaryUnit?.id}},
      {label: 'Личный состав', routerLink: 'staff', queryParams: {id:  this.militaryUnitService.currentMilitaryUnit?.id}},
      {label: 'ВВСТиГ', routerLink: 'vvst-and-cargo', queryParams: {id:  this.militaryUnitService.currentMilitaryUnit?.id}},
      {label: 'Готовность', routerLink: 'readiness', queryParams: {id:  this.militaryUnitService.currentMilitaryUnit?.id}},
      {label: 'Настройки', routerLink: 'settings', queryParams: {id:  this.militaryUnitService.currentMilitaryUnit?.id}},
      {label: 'Нормативы прыжков', routerLink: 'jump-standards', queryParams: {id:  this.militaryUnitService.currentMilitaryUnit?.id}},
    ];
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  public setCurrentMilitaryUnit(militaryUnit: MilitaryUnitHierarchyItem): void {
    this.militaryUnitService.currentMilitaryUnit = militaryUnit;
  }
  public getCurrentMilitaryUnit(): void {
    this.sub = this.militaryUnitService.currentMilitaryUnit$.subscribe(value => {
      if (value) {
        this.router.navigate(['.'], { relativeTo: this.activatedRoute, queryParams: {id: value.id}});
        this.items.forEach(item => item.queryParams.id  = value.id);
        this.desantTabsService.currentMilitaryUnitID = value.id;
      }
    });
  }
}
