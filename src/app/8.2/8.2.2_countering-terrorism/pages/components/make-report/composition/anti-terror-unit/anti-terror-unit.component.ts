import { ChangeDetectorRef, Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InitTimeConfig } from '../../../../../../../shared/components/ospo/ospo-time/time.interface';
import { Mode } from '../../../../../interfaces/interface';
import { BchsService } from '../../../../services/bchs.service';


@Component({
  selector: 'app-anti-terror-unit',
  templateUrl: './anti-terror-unit.component.html',
  styleUrls: ['./anti-terror-unit.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AntiTerrorUnitComponent),
      multi: true,
    },
  ],
})
export class AntiTerrorUnitComponent implements OnInit, ControlValueAccessor {

  @Input() bchsGroup: Mode;
  @Input() bchsUuid: string;
  @Input() amplificationUuid: string;
  @Input() mode: string;

  public initConfig: InitTimeConfig = {
    month: false,
    day: true,
    hour: true,
    minute: true,
    seconds: false,
  };

  public work_time: string;
  public not_work_time: string;

  public divisionForm: FormGroup = new FormGroup({
    soldiers: new FormControl(''),
    work_time: new FormControl(''),
    not_work_time: new FormControl(''),
    autoTransport: new FormControl(''),
    armoredTransport: new FormControl(''),
  });

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private bchsService: BchsService,
  ) { }

  private onChange: ((value: any) => void);

  public ngOnInit(): void {
    this.divisionForm.valueChanges
      .subscribe(value => {
        if (this.onChange) {
          this.onChange(value);
          this.cdr.detectChanges();
        }
      })
  }

  public writeValue(value): void {
    if (value) {
      this.divisionForm.setValue(value);
      this.work_time = value.work_time;
      this.not_work_time = value.not_work_time;
    }
    else {
      this.divisionForm.reset();
    }
  }

  public registerOnChange(fn: (param: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(): void { }

  public sendNotWorkTime(event: any) {
    if (this.amplificationUuid) this.bchsService.setNotWorkTimeAmplification(this.amplificationUuid, event, this.bchsUuid).subscribe();
    else this.bchsService.setNotWorkTime(this.bchsGroup.uuid, event, this.bchsUuid).subscribe();
  }

  public sendWorkTime(event: any) {
    if (this.amplificationUuid) this.bchsService.setWorkTimeAmplification(this.amplificationUuid, event, this.bchsUuid).subscribe();
    else this.bchsService.setWorkTime(this.bchsGroup.uuid, event, this.bchsUuid).subscribe();
  }

}
