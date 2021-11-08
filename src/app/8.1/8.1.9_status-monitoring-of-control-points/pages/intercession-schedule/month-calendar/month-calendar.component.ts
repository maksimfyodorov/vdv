import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IntercessionScheduleServiceApi } from '../services/intercession-schedule.service-api';
import { IntercessionScheduleDataService } from '../services/intercession-schedule-data.service';

@Component({
  selector: 'app-month-calendar',
  templateUrl: './month-calendar.component.html',
  styleUrls: ['./month-calendar.component.scss'],
})
export class MonthCalendarComponent implements OnInit {

  selectedYear = new Date().getFullYear();
  currentMonths;
  monthsNames = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];

  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private intercessionScheduleServiceApi: IntercessionScheduleServiceApi,
    public intercessionScheduleDataService: IntercessionScheduleDataService,
  ) {
  }

  ngOnInit(): void {
    this.yearChanged();
  }

  selectMonth(month): void {
    this.dialogRef.close(month);
  }

  yearChanged(year?): void {
    if (year) {
      this.selectedYear = year;
    }
    this.intercessionScheduleServiceApi.getMonthByYearAndPostUuid(this.selectedYear, this.intercessionScheduleDataService.selectedPost.uuid)
      .subscribe(res => {
        this.currentMonths = res;
        this.prepareMonths(res);
      });
  }

  prepareMonths(existingMonths): void {
    const preparedMonths = [];

    for (let i = 1; i <= 12; i++) {
      preparedMonths.push(
        {
          uuid: null,
          name: this.monthsNames[i - 1],
          month: `${i < 10 ? 0 : ''}${i}.${this.selectedYear}`,
          month_status: 'new',
        },
      );
    }

    if (existingMonths?.length !== 0) {
      for (let i = 0; i < preparedMonths.length; i++) {
        for (const item of existingMonths) {
          if (preparedMonths[i].month == item.month) {
            console.log(item);
            preparedMonths[i].uuid = item.uuid;
            preparedMonths[i].month_status = item.month_status;
            break;
          }
        }
      }
    }
    console.log(preparedMonths);
    this.currentMonths = preparedMonths;
  }

  getMonthColor(status): string {
    switch (status) {
      case 'new':
        return '#C7CDD3';
      case 'Закреплен':
        return '#D0EBFF';
      case 'Не закреплен':
        return '#2196f3';
    }
  }

}
