import { Injectable } from '@angular/core';
import { Period, PeriodsOverTheYears } from '@app/8.1/8.1.4_uav-information/components/flight-plans/types/period';

@Injectable()
export class PlanDataService {

  constructor() { }

  createPeriodsByYear(periods: PeriodsOverTheYears[], year: number): Period[] {
    return periods
      .filter(period => {
        if (year && period.year === year) {
          return period;
        }
      })
      .map(period => period.period)[0];
  }
}
