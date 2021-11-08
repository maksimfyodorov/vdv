import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { ExecutiveComponent } from '../../../../../../../shared/components/military/dialogs/select-shdk/shdk/executive.component';
import { Mode } from '../../../../../interfaces/interface';
import { BchsService } from '../../../../services/bchs.service';

@Component({
  selector: 'app-soldier-length-form',
  templateUrl: './soldier-length-form.component.html',
  styleUrls: ['./soldier-length-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SoldierLengthFormComponent),
      multi: true,
    },
  ],
})
export class SoldierLengthFormComponent implements OnInit, ControlValueAccessor {

  @Input() bchsGroup: Mode;
  @Input() bchsUuid: string;
  @Input() mode: string = '';
  @Input() amplificationUuid: string;

  public info = new FormControl(0);

  private onChange: ((value: string) => void);

  constructor(
    private dialogService: DialogService,
    private bchsService: BchsService,
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

  public openData(): void {
    if (!this.mode) {
      this.bchsService.getShdk(this.bchsGroup.uuid, this.bchsUuid).subscribe(res => {
        const shdk = res.data.map(el => el.shdk);
        this.openMilitary(shdk);
      })
    }
    if (this.mode === 'modeV') {
      this.bchsService.getModeV(this.bchsGroup.uuid, this.bchsUuid).subscribe(res => {
        const shdk = res.data.map(el => el.shdk);
        this.openMilitary(shdk);
      })
    }
    if (this.mode === 'modeA') {
      this.bchsService.getModeAB(this.bchsGroup.uuid, this.bchsUuid).subscribe(res => {
        const shdk = res.data.map(el => el.shdk);
        this.openMilitary(shdk);
      })
    }
    if (this.mode === 'amplification' && this.amplificationUuid) {
      this.bchsService.getAmplification(this.bchsUuid, this.amplificationUuid).subscribe(res => {
        const shdk = res.data.map(el => el.shdk);
        this.openMilitary(shdk);
      })
    }
  }

  public openMilitary(data: any): void {
    this.dialogService.open(ExecutiveComponent, {
      header: 'Выбрать военнослужащего',
      width: '1088px',
      data: {
        selectedPerson: data,
        mode: 'multiple',
      },
    }).onClose.subscribe(res => {
      if (res) {
        const shdk = res.map(element => element.uuid);
        if (!this.mode) {
          shdk ? this.bchsService.postShdk(this.bchsGroup.uuid, shdk, this.bchsUuid).subscribe() : null;
          this.writeValue(res);
        }
        if (this.mode === 'modeV') {
          shdk ? this.bchsService.postModeV(this.bchsGroup.uuid, shdk, this.bchsUuid).subscribe() : null;
          this.writeValue(res);
        }
        if (this.mode === 'modeA') {
          shdk ? this.bchsService.postModeAB(this.bchsGroup.uuid, shdk, this.bchsUuid).subscribe() : null;
          this.writeValue(res);
        }
        if (this.amplificationUuid) {
          shdk ? this.bchsService.addShdkToamplification(shdk, this.amplificationUuid, this.bchsUuid).subscribe() : null;
          this.writeValue(res);
        }
      }

    })
  }
}
