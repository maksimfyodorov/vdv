import {Component, OnInit} from '@angular/core';
import {Period} from '../../../../../../common-pages/settings/interfaces';
import {EducationYearService} from '../../../services/education-year.service';

@Component({
  selector: 'app-filter-desant-events',
  templateUrl: './filter-desant-events.component.html',
  styleUrls: ['./filter-desant-events.component.scss'],
  providers: [EducationYearService],
})

export class FilterDesantEventsComponent implements OnInit {
  public indications = [];
  public periods: Period[] = [];
  public filteredPeriods = [];
  public years = new Set();
  public selectedPeriod: Period[];
  public startDate: number;
  public endDate: number;
  public eventState: boolean;
  public departureAerodrome: [];
  public allAerodrome: [];
  public landingArea: [];
  public allLandingArea: [];
  private _selectedYear: number;



  constructor(private educationYearService: EducationYearService) {
  }

  ngOnInit(): void {
    this.getPeriods();
  }

  public onChange(event: { value: number; }): void {
    this.filteredPeriods = this.periods.filter((period) => period.year === event.value);
    console.log(this.filteredPeriods);
  }

  public unicYears(): void {
    this.periods.forEach(period => this.years.add(period.year));
  }

  set selectedYear(year: number) {
    this._selectedYear = year;
  }

  private getPeriods(): void {
    this.educationYearService.getPeriods().subscribe(res => {
        this.periods = res.data;
        this.unicYears();
      }
    );
  }
}
