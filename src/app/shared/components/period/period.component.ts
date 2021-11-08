import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { DayOfWeek, MonthOfYear, Period, PeriodType } from './interfaces';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { DAYS, DAYS_OF_WEEK, MONTH_OF_YEAR, PERIOD_TYPES, PERIOD_TYPES_YEARS } from './constants';
import { SubscriptionLike } from 'rxjs';


@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PeriodComponent),
      multi: true,
    },
  ],
})
export class PeriodComponent implements OnInit, OnDestroy, ControlValueAccessor {
  get period(): Period {
    return this._period;
  }

  @Input()
  set period(p: Period) {
    if (p === null) {
      this.form.reset();
    } else {
      this._period = p;
      this.onChange(this._period);
    }
  }

  @Input() isActualization = false;

  get type() {
    return this.form.get("type").value;
  }

  public form: FormGroup;
  public periodTypes: PeriodType[] = PERIOD_TYPES;
  public periodArr: PeriodType[];
  public daysOfWeek: DayOfWeek[] = DAYS_OF_WEEK;
  public monthsOfYear: MonthOfYear[] = MONTH_OF_YEAR;
  public days: number[] = DAYS;
  public time: string;
  private _period: Period;
  private subscriptionForm: SubscriptionLike;


  constructor() {
    this.createForm();
    this.subscribeToForm();
  }

  public ngOnInit(): void {
    this.periodTypes = this.isActualization ? PERIOD_TYPES_YEARS : PERIOD_TYPES;
  }

  public ngOnDestroy(): void {
    this.subscriptionForm.unsubscribe();
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
    if (!this.period) {
      this.emitCurrentFormValue();
    }
  }

  public onChange(_: any): void {
  }

  public registerOnTouched(fn: any): void {
  }

  public writeValue(period: Period): void {
    this.period = period;
    this.fillForm(period);
  }

  private checkFieldsNegotiate(period: Period): Period {

    switch (period.type) {
      case 'monthly':
        delete period.monthOfYear;
        delete period.day_of_week;
        delete period.minute;
        break;
      case 'weekly':
        delete period.day;
        delete period.monthOfYear;
        delete period.minute;
        break;
      case 'daily':
        delete period.day;
        delete period.monthOfYear;
        delete period.day_of_week;
        delete period.minute;
        break;
      case 'hourly':
        delete period.time;
        delete period.day;
        delete period.monthOfYear;
        delete period.day_of_week;
    }
    return period;
  }

  private createForm(): void {
    this.form = new FormGroup({
      uuid: new FormControl(),
      type: new FormControl(this.periodTypes[0].value, Validators.required),
      time: new FormControl('12:00', Validators.required),
      day_of_week: new FormControl(this.daysOfWeek[0].value),
      day: new FormControl(this.days[0]),
      monthOfYear: new FormControl(this.monthsOfYear[0]),
      minute: new FormControl(30),
    });
  }

  private subscribeToForm(): void {
    this.subscriptionForm = this.form.valueChanges.subscribe(res => {
      this.period = this.checkFieldsNegotiate(res);
    });
  }

  private fillForm(period): void {
    for (const key in period) {
      if (period.hasOwnProperty(key)) {
        this.form.get(key)?.setValue(period[key]);
      }
    }
  }

  private emitCurrentFormValue(): void {
    this.onChange(this.checkFieldsNegotiate(this.form.value));
  }
}
