import { CategoriesService } from './../../settings-component/components/categories-of-units/service/categories.service';
import { LoaderService } from './../../../../../shared/components/loader/loader.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { MilitaryUnitService } from '../../../services/military-unit.service';
import { LandingVvstService } from './service/landing-vvst.service';
import { VVSTTABLE } from './table-mock';
import { CategoryDivisionHierarchy } from '../../../../../shared/types/category-division-interface';
import {DesantTech} from '../../../types/desant-monitoring.types';
import {MilitarySportInfo} from '../../sport-team/types/sport-team.types';
import {SPORT_INFO} from '../../sport-team/mock';

@Component({
  selector: 'app-landing-vvst',
  templateUrl: './landing-vvst.component.html',
  styleUrls: ['./landing-vvst.component.scss'],
  providers: [LandingVvstService]
})
export class LandingVvstComponent implements OnInit, OnDestroy {
  public tableData: DesantTech[] = VVSTTABLE;
  public selectedRow: number;
  private _sub: SubscriptionLike;
  public currentDivisionID: number;
  public divisions: CategoryDivisionHierarchy[];
  public selectedTech: DesantTech;
  public desantingCardInfo: MilitarySportInfo = SPORT_INFO;
  constructor(private militaryUnitService: MilitaryUnitService, private landingVvstService: LandingVvstService, public loader: LoaderService) { }

  public ngOnInit(): void {
    this.subscribe();
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  public subscribe(): void {
    this._sub = this.militaryUnitService.currentMilitaryUnit$.subscribe(value => {
      this.currentDivisionID = value?.id;
      this.getDivisions();
    });
  }

  public getRowIndex(ri: number): void {
    this.selectedRow = ri;
  }

  public getDivisions(): void {
    this.loader.startLoading(this.landingVvstService.getDivisionByMilitaryUnit(this.currentDivisionID)).subscribe(res => this.divisions = res);
  }
  public onRowSelect(event): void {
    this.selectedTech = event.data;
  }

  public onRowUnselect(event): void {
    this.selectedTech = null;
  }


}
