import { AfterContentChecked, ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InitTimeConfig } from '../time.interface';



@Component({
  selector: 'app-time-input',
  templateUrl: './time-input.component.html',
  styleUrls: ['./time-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeInputComponent),
      multi: true,
    },
  ],
})
export class TimeInputComponent implements OnInit, ControlValueAccessor, AfterContentChecked {

  @Input() initConfig: InitTimeConfig = {
    month: true,
    day: true,
    hour: true,
    minute: true,
    seconds: true,
  }
  @Input() timeChFlag: boolean = false;
  @Output() sendTime = new EventEmitter();

  public info = new FormControl();
  public flag: boolean = false;
  public timeStr: string;
  public formDataLength: number[] = [];

  private onChange: ((value: any) => void);

  constructor(
    private cdref: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    this.initClearForm();
    this.timeChFlag ? this.timeStr = 'Время Ч+' : this.timeStr = 'Время C+';
    this.info.valueChanges
      .subscribe(value => {
        if (this.onChange) {
          this.onChange(value);
        }
      })
      this.info.disable();
  }

  public ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  public writeValue(value: string): void {
    this.info.setValue(value);
  }

  public registerOnChange(fn: (param: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(): void { }

  public setTime(event: any): void {
    this.info.setValue(event);
    this.sendTime.emit(event)
  }

  private initClearForm(): void {
    let form = []
    for (let key in this.initConfig) {
      if (this.initConfig[key]) form.push(1);
    }
    this.formDataLength = form;
    this.formDataLength.splice(0, 2);
  }

}