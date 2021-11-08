import { Injectable } from '@angular/core';
import { SchedulerEvent, ViewOptionValue } from './scheduler-table.types';
import { Inspection } from '../../types/check-combat-readiness.types';
import { Data } from '@angular/router';

@Injectable()
export class SchedulerTableService {
  private startDate: Date = new Date();
  private viewMode: ViewOptionValue;

  public setStartDate(value: Date): void {
    this.startDate = value;
  }

  public turnViewPage(forward: boolean, step: ViewOptionValue): void {
    switch (step) {
      case 'week': {
        this.startDate.setDate(this.startDate.getDate() + (forward ? 7 : -7));
        break;
      }
      case 'month': {
        this.startDate.setMonth(this.startDate.getMonth() + (forward ? 1 : -1));
        break;
      }
      case 'year': {
        this.startDate.setFullYear(this.startDate.getFullYear() + (forward ? 1 : -1));
        break;
      }
    }
  }

  public determineRangeByMode(mode: ViewOptionValue): Date[] {
    this.viewMode = mode;

    let range: Date[] = [];
    switch (mode) {
      case 'week': {
        this.goToMonday();
        range = this.determineWeekFromDate();
        break;
      }
      case 'month': {
        range = this.determineMonthFromDate();
        break;
      }
      case 'year': {
        range = this.determineYearFromDate();
        break;
      }
    }

    return range;
  }

  private determineWeekFromDate(): Date[] {
    const displayedWeek = [];
    for (let i = 0; i < 7; i++) {
      displayedWeek.push(new Date(this.startDate).setDate(this.startDate.getDate() + i));
    }

    return displayedWeek;
  }

  private determineMonthFromDate(): Date[] {
    const currentDay = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), 1);
    this.startDate = new Date(currentDay);
    const displayedMonth = [];
    while (currentDay.getMonth() === this.startDate.getMonth()) {
      displayedMonth.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }

    return displayedMonth;
  }

  private determineYearFromDate(): Date[] {
    const currentDay = new Date(this.startDate.getFullYear(), 0, 1);
    this.startDate = new Date(currentDay);
    const displayedYear = [];
    while (currentDay.getFullYear() === this.startDate.getFullYear()) {
      displayedYear.push(new Date(currentDay));
      currentDay.setMonth(currentDay.getMonth() + 1);

    }

    return displayedYear;
  }

  public takeEventsInRange(events: Inspection[], displayedRange: Date[]): any {
    const filteredEvents = events.filter((item: Inspection) => this.filterByDateOverlap(item, displayedRange));
    return filteredEvents.map((item: Inspection) => {
      const eventFrom = new Date(this.dateConverterForFirefox(item.dt_start));
      const eventTo = new Date(this.dateConverterForFirefox(item.dt_end));
      if (this.viewMode === 'year') {
        const duration = this.getDurationInMonths(eventFrom, eventTo);
        return {
          ...item,
          startColumn: this.getYearStartColumn(eventFrom),
          duration,
        };
      } else {
        const duration =
          this.startDate < eventFrom
            ? this.getDurationInDays(eventFrom, eventTo)
            : this.getDurationInDays(this.startDate, eventTo);
        return {
          ...item,
          startColumn: Math.max(2, this.getDurationInDays(this.startDate, eventFrom) + 2),
          duration,
        };
      }
    });
  }

  private filterByDateOverlap(event: Inspection, period: Date[]): boolean {
    const currentFrom = period[0];
    const currentTo = period[period.length - 1];
    if (this.viewMode === 'year') {
      currentTo.setDate(currentTo.getDay() + 30 );
    }
    if (currentFrom <= (new Date(this.dateConverterForFirefox(event.dt_start)) && new Date(this.dateConverterForFirefox(event.dt_end))) && currentTo >=
      (new Date(this.dateConverterForFirefox(event.dt_start)) && new Date(this.dateConverterForFirefox(event.dt_end)))) {
      return true;
    } else {
      return false;
    }
  }

  private getYearStartColumn(startDate: Date){
    let startColumn: any = startDate.toLocaleDateString();
    startColumn = startColumn.split('.');
    startColumn = startColumn[1];
    startColumn = parseInt(startColumn) + 1;
    return startColumn;
  }

  private getDurationInDays(from: Date, to: Date): number {
    return +((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)).toFixed(0);
  }

  private getDurationInMonths(from: Date, to: Date): number {
    return to.getFullYear() === from.getFullYear()
      ? to.getMonth() - from.getMonth() + 1
      : to.getMonth() - from.getMonth() + 12;
  }

  private getDaysAmountInMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  }

  private goToMonday(): void {
    while (this.startDate.getDay() > 1) {
      this.startDate.setDate(this.startDate.getDate() + 1);
    }
  }

  dateConverterForFirefox(date: string): string {
    const newDate = ['', '', ''];
    const convertedDate = date.split('.');
    newDate[0] = convertedDate[1];
    newDate[1] = convertedDate[2];
    newDate[2] = convertedDate[0];
    return newDate.join(',');
  }
}


