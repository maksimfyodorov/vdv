import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { InitTimeConfig, TimeData } from '../time.interface';

@Component({
  selector: 'app-choose-time',
  templateUrl: './choose-time.component.html',
  styleUrls: ['./choose-time.component.scss'],
})
export class ChooseTimeComponent implements OnInit, OnDestroy {

  @Input() initConfig: InitTimeConfig;
  @Input() timeStr: string = '';
  @Input() time: string = '';
  @Output() timeChange = new EventEmitter<string>();

  public data: TimeData = {
    day: 0,
    hour: 0,
    minute: 0,
    month: 0,
    seconds: 0,
  }

  constructor(
  ) { }

  public ngOnInit(): void {
    this.initTime();
  }

  public ngOnDestroy(): void {
    this.sendData();
  }

  public changeMinute(additionFlag: boolean): void {
    additionFlag ? this.addMinute() : this.reduceMinute();
  }

  public changeHour(additionFlag: boolean): void {
    additionFlag ? this.addHour() : this.reduceHour();
  }

  public changeDay(additionFlag: boolean): void {
    additionFlag ? this.addDay() : this.reduceDay();
  }

  public changeMonth(additionFlag: boolean): void {
    additionFlag ? this.addMonth() : this.reduceMonth();
  }

  public changeSecond(additionFlag: boolean): void {
    additionFlag ? this.addSecond() : this.reduceSecond();
  }

  public addZeroToString(nums: number): string {
    return nums > 9 ? `${nums}` : `0${nums}`
  }

  private sendData(): void {
    let time: string = ''
    for (let key in this.initConfig) {
      if (this.initConfig[key]) time += this.addPointsZeroToString(this.data[key]);
    }
    time = time.slice(1);
    this.timeChange.emit(time);
  }

  private addPointsZeroToString(nums: number): string {
    return nums > 9 ? `:${nums}` : `:0${nums}`
  }

  private initTime(): void {
    if (this.time) {
      let time = this.time;
      for (let key in this.initConfig) {
        if (this.initConfig[key]) {
          this.data[key] = Number(time.slice(0, 2));
          time = time.slice(3)
        }
      }
    }
  }

  private addMonth(): void {
    this.data.month == 12 ? this.data.month = 0 : this.data.month++;
  }

  private reduceMonth(): void {
    this.data.month == 0 ? this.data.month = 12 : this.data.month--;
  }

  private addSecond(): void {
    this.data.seconds == 59 ? this.data.seconds = 0 : this.data.seconds++;
  }

  private reduceSecond(): void {
    this.data.seconds == 0 ? this.data.seconds = 59 : this.data.seconds--;
  }

  private addDay(): void {
    this.data.day == 31 ? this.data.day = 0 : this.data.day++;
  }

  private reduceDay(): void {
    this.data.day == 0 ? this.data.day = 31 : this.data.day--;
  }

  private addHour(): void {
    this.data.hour == 23 ? this.data.hour = 0 : this.data.hour++;
  }

  private reduceHour(): void {
    this.data.hour == 0 ? this.data.hour = 23 : this.data.hour--;
  }

  private addMinute(): void {
    this.data.minute == 59 ? this.data.minute = 0 : this.data.minute++;
  }

  private reduceMinute(): void {
    this.data.minute == 0 ? this.data.minute = 59 : this.data.minute--;
  }

}