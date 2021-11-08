import { Component, OnInit } from '@angular/core';
import { TimerDate } from '../../../interfaces/interface';
import { EventTableDataService } from '../../../services/event-table-data.service';

@Component({
  selector: 'app-event-timer',
  templateUrl: './event-timer.component.html',
  styleUrls: ['./event-timer.component.scss']
})
export class EventTimerComponent implements OnInit {

  public date: TimerDate = {
    month: 0,
    day: 0,
    hour: 0,
    minute: 0,
  }

  public secondsInMonth: number = 2592000;
  public secondsInDay: number = 86400;
  public secondsInHour: number = 3600;
  public secondsInMinute: number = 60;

  public timeLeft: number = 4592000;

  constructor(
    public dataService: EventTableDataService,
  ) { }

  public ngOnInit(): void {
    this.setDate();
  }

  public startTimer(): void {
    const interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.setDate();
      }
    }, 1000)
  }

  public setDate(): void {
    this.setMonth();
    this.setDays();
    this.setHour();
    this.setSeconds();
    this.dataService.timeLeft.next(this.timeLeft);
  }

  public setMonth(): void {
    const remainder = this.timeLeft % this.secondsInMonth;
    const month = (this.timeLeft - remainder) / this.secondsInMonth;
    this.date.month = month;
  }

  public setDays(): void {
    const month = this.date.month;
    const remainder = (this.timeLeft - month * this.secondsInMonth)
    const day = (remainder - remainder % this.secondsInDay) / this.secondsInDay;
    this.date.day = day;
  }

  public setHour(): void {
    const month = this.date.month;
    const day = this.date.day;
    const remainder = this.timeLeft - month * this.secondsInMonth - day * this.secondsInDay;
    const hour = (remainder - remainder % this.secondsInHour) / this.secondsInHour;
    this.date.hour = hour;
  }

  public setSeconds(): void {
    const month = this.date.month;
    const day = this.date.day;
    const hour = this.date.hour;
    const remainder = this.timeLeft - month * this.secondsInMonth - day * this.secondsInDay - hour * this.secondsInHour;
    const minute = (remainder - remainder % this.secondsInMinute) / this.secondsInMinute;
    this.date.minute = minute;
  }

}
