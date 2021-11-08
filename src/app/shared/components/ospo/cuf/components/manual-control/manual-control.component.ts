import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { Status } from '../../interfaces/interfaces';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CufService } from '../../services/cuf.service';
import { map } from 'rxjs/operators';
import { MANUAL_STATUSES_DATA } from './constants';
import { LoaderService } from '../../../../loader/loader.service';

@Component({
  selector: 'app-manual-control',
  templateUrl: './manual-control.component.html',
  styleUrls: ['./manual-control.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ManualControlComponent),
    multi: true,
  }],
})
export class ManualControlComponent implements OnInit, ControlValueAccessor {

  @Input() public manualFormControl: FormControl;
  public statuses: Status[];
  public selectedStatus: string;
  private manualStatusesData = MANUAL_STATUSES_DATA;

  constructor(private cufService: CufService, public loader: LoaderService) {
  }

  public ngOnInit(): void {
    this.loader.startLoading(this.cufService.getStatuses().pipe(map(res => this.addIconsToStatus(res.data))))
      .subscribe(res => this.statuses = res);
  }

  public selectStatus(statusValue: Status): void {
    this.updateValue(statusValue.uuid);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
  }

  public writeValue(outsideValue: string): void {
    this.selectedStatus = outsideValue;
  }

  public updateValue(insideValue: string): void {
    this.selectedStatus = insideValue;
    this.onChange(insideValue);
  }

  private onChange = (value: any) => {
  }

  private addIconsToStatus(statuses: Status[]): Status[] {
    return statuses.map(srcStatus => {
      const manualStatusData = this.manualStatusesData.find(manStat => manStat.name === srcStatus.name);
      for (const key in manualStatusData) {
        if (manualStatusData.hasOwnProperty(key)) {
          srcStatus[key] = manualStatusData[key];
        }
      }
      return srcStatus;
    });
  }

}
