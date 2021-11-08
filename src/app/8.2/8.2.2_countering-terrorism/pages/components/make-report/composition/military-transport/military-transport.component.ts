import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { MilitaryTransportDialogComponent } from './military-transport-dialog/military-transport-dialog.component';
import { take } from 'rxjs/operators';
import { CounterListService } from '../../../../services/counter-list.service';
import { Mode, VvstBchs } from '../../../../../interfaces/interface';
@Component({
  selector: 'app-military-transport',
  templateUrl: './military-transport.component.html',
  styleUrls: ['./military-transport.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MilitaryTransportComponent),
      multi: true,
    },
  ],
})
export class MilitaryTransportComponent implements OnInit {

  @Input() mode: string;
  @Input() bchsGroup: Mode;
  @Input() bchsUuid: string;
  @Input() amplificationUuid: string;

  public info = new FormControl();

  private onChange: ((value: string) => void);

  constructor(
    private http: CounterListService,
    private dialogService: DialogService,
  ) { }

  public ngOnInit(): void {
    this.info.valueChanges
      .subscribe(value => {
        if (this.onChange) {
          this.onChange(value);
        }
      })
  }

  public writeValue(value: string): void {
    this.info.setValue(value);
  }

  public registerOnChange(fn: (param: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(): void { }

  public openMilitary(data: VvstBchs): void {
    this.dialogService.open(MilitaryTransportDialogComponent, {
      header: 'Обеспеченность ВВТ',
      width: '1088px',
      data: {
        selectedPerson: data,
        mode: this.mode,
      }
    }).onClose.pipe(take(1))
      .subscribe(res => {
        if (res) {
          const vvst: string[] = res.map(element => element.uuid);
          this.amplificationUuid ? this.http.postVvstAmplification(vvst, this.amplificationUuid, this.bchsUuid).subscribe() : this.http.postVvst(vvst, this.bchsGroup.uuid, this.bchsUuid).subscribe();
          this.info.patchValue(res);
        }
      })
  }

  public initData() {
    let data;
    if (this.amplificationUuid) {
      this.http.getVvstAmplification(this.amplificationUuid, this.bchsUuid, this.mode).subscribe(res => {
        data = res;
        this.openMilitary(data);
        this.writeValue(data);
      });
    }
    else {
      this.http.getVvst(this.bchsGroup.uuid, this.bchsUuid, this.mode).subscribe(res => {
        data = res;
        this.openMilitary(data);
        this.writeValue(data.data);
      });
    }
  }

}
