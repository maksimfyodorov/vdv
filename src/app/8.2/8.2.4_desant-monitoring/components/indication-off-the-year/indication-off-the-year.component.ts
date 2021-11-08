import { Period } from './../../../../common-pages/settings/interfaces';
import { Component, OnInit } from '@angular/core';
import { YearsService } from './components/services/years.service';
import {DesantTabsService} from '../../services/desant-tabs.service';
@Component({
  selector: 'app-indication-off-the-year',
  templateUrl: './indication-off-the-year.component.html',
  styleUrls: ['./indication-off-the-year.component.scss'],
  providers: [YearsService],
})
export class IndicationOffTheYearComponent implements OnInit {

  public indications = [];
  public periods: Period[] = [];
  public filteredPeriods = [];
  public years = new Set();
  private _selectedYear: number;

  public unicYears(): void {
    this.periods.forEach(period => this.years.add(period.year));
  }

  set selectedYear(year: number) {
    this._selectedYear = year;
  }

  get selectedYear(): number {
    return this._selectedYear;
  }

  constructor(private yearsService: YearsService,
              private desantTabsService: DesantTabsService) { }

  ngOnInit(): void {
    this.desantTabsService.activeTabIndex = 1;
    this.getPeriods();
  }

  public addIndication(): void {
    this.indications.push({});
  }

  public deleteIndication(index: number): void {
    this.indications.splice(index, 1);
  }

  private getPeriods(): void {
    this.yearsService.getPeriods().subscribe(res => {
      this.periods = res.data;
      this.unicYears();
    }
    );
  }

  public changeYearUuid(event: { value: number; }): void {
    this.selectedYear = event.value;
  }

  public onChange(event: { value: number; }): void {
    this.filteredPeriods = this.periods.filter((period) => period.year === event.value);
  }
}
