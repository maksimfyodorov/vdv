import { ChangeDetectorRef, Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InitTimeConfig } from '../../../../../../../shared/components/ospo/ospo-time/time.interface';
import { Mode } from '../../../../../interfaces/interface';
import { BchsService } from '../../../../services/bchs.service';

@Component({
  selector: 'app-anti-terror-unit-mode',
  templateUrl: './anti-terror-unit-mode.component.html',
  styleUrls: ['./anti-terror-unit-mode.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AntiTerrorUnitModeComponent),
      multi: true,
    },
  ],
})
export class AntiTerrorUnitModeComponent implements OnInit, ControlValueAccessor {

  @Input() bchsGroup: Mode;
  @Input() bchsUuid: string;

  public initConfig: InitTimeConfig = {
    month: false,
    day: true,
    hour: true,
    minute: true,
    seconds: false,
  }

  public modeForm: FormGroup = new FormGroup({
    soldiers: new FormControl(''),
    secondSoldiers: new FormControl(''),
    work_time: new FormControl(''),
    not_work_time: new FormControl(''),
  });

  public work_time: string;
  public not_work_time: string;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private bchsService: BchsService,
  ) { }

  private onChange: ((value: any) => void);

  public ngOnInit(): void {
    this.modeForm.valueChanges
      .subscribe(value => {
        if (this.onChange) {
          this.onChange(value);
          this.cdr.detectChanges();
        }
      })
  }

  public writeValue(value): void {
    value ? this.modeForm.setValue(value) : this.modeForm.reset();
  }

  public registerOnChange(fn: (param: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(): void { }

  public sendNotWorkTime(event: any) {
    this.bchsService.setNotWorkTime(this.bchsGroup.uuid, event, this.bchsUuid).subscribe();
  }

  public sendWorkTime(event: any) {
    this.bchsService.setWorkTime(this.bchsGroup.uuid, event, this.bchsUuid).subscribe();
  }

}
