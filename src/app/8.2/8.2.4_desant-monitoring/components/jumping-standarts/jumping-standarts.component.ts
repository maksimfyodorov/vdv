import { Period } from './../../../../common-pages/settings/interfaces';
import { JumpingStandard } from './jumping-standart-interface';
import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { JumpingStandardService } from './service/jumping-standard.service';
import { DialogService } from 'primeng/dynamicdialog';
import { SubscriptionLike } from 'rxjs';
import { MilitaryUnitService } from '../../services/military-unit.service';
import { LoaderService } from '../../../../shared/components/loader/loader.service';
import { HttpErrorResponse } from '@angular/common/http';
import {DesantTabsService} from '../../services/desant-tabs.service';
@Component({
  selector: 'app-jumping-standarts',
  templateUrl: './jumping-standarts.component.html',
  styleUrls: ['./jumping-standarts.component.scss'],
  providers: [JumpingStandardService],
})
export class JumpingStandartsComponent implements OnInit, OnDestroy {
  public selectedUuid: string;
  public title = 'Нормативы';
  public standards: JumpingStandard[];
  public periods: Period[] = [];
  public filteredPeriods = [];
  public years = new Set();
  private _selectedYear: number;
  private _sub: SubscriptionLike;
  public currentDivisionID: number;
  public selectedPeriod: any;
  public newCategoryComponentStatus = false;
  public jumpCount: number;
  public currentJump: number;

  constructor(
    private jumpingStandardService: JumpingStandardService,
    public dialogService: DialogService,
    private militaryUnitService: MilitaryUnitService,
    public loader: LoaderService,
    private desantTabsService: DesantTabsService
  ) { }

  ngOnInit(): void {
    this.desantTabsService.activeTabIndex = 7;
    this.getJumpingStandarts();
    this.getPeriods();
    this.subscribe();
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  public subscribe(): void {
    this._sub = this.militaryUnitService.currentMilitaryUnit$.subscribe(value => this.currentDivisionID = value?.id);
  }

  public unicYears(): void {
    this.periods.forEach(period => this.years.add(period.year));
  }

  set selectedYear(year: number) {
    this._selectedYear = year;
  }

  get selectedYear(): number {
    return this._selectedYear;
  }

  public changeYearUuid(event: { value: number; }): void {
    this.selectedYear = event.value;
  }

  public onChange(event: { value: number; }): void {
    this.filteredPeriods = this.periods.filter((period) => period.year === event.value);
  }

  public getJumpingStandarts(): void {
    this.loader.startLoading(this.jumpingStandardService.getJumpingStandarts())
      .subscribe(res => this.standards = res.data);
  }

  public getPeriods(): void {
    this.loader.startLoading(this.jumpingStandardService.getPeriods())
      .subscribe(res => {
        this.periods = res.data;
        this.unicYears();
      }
      );
  }

  public jumpOnChange(event: { target: { value: number; }; }, standart: { uuid: string; }): void {
    this.jumpCount = event.target.value;
    const putBody = {
      uuid: standart.uuid,
      jump_count: +this.jumpCount,
    };
    if (this.jumpCount !== this.currentJump && this.jumpCount) {
      this.loader.startLoading(this.jumpingStandardService.putJumpCount(putBody)).subscribe();
    }
  }

  public getCurrentJumpNumber(event: { target: { value: number; }; }): void {
    this.currentJump = event.target.value;
  }

  public updateAfterPost(): void {
    this.newCategoryComponentCondition();
    this.getJumpingStandarts();
  }

  public newCategoryComponentCondition(): void {
    this.newCategoryComponentStatus = !this.newCategoryComponentStatus;
  }

  public getSelectedRowUuid(standart: { uuid: string; }): void {
    this.selectedUuid = standart.uuid;
  }

  public closeOverlay(event: any, el: any): void {
    el.hide();
  }
}
