import { ChangeDetectorRef, Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormArray, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BchsService } from '../../../../services/bchs.service';
import { Mode } from '../../../../../interfaces/interface';

@Component({
  selector: 'app-garrison-strength',
  templateUrl: './garrison-strength.component.html',
  styleUrls: ['./garrison-strength.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GarrisonStrengthComponent),
      multi: true,
    },
  ],
})
export class GarrisonStrengthComponent implements OnInit, ControlValueAccessor {

  @Input() amplificationsUuid: string[] = [];
  @Input() bchsGroup: Mode;
  @Input() bchsUuid: string;
  @Input() militaryCity: string;

  public uuids: string[] = [];
  public garrisonForm: FormGroup = new FormGroup({
    garrisonArray: new FormArray([])
  });

  public get ads(): FormArray {
    return this.garrisonForm.controls.garrisonArray as FormArray;
  }

  private onChange: ((value: any) => void);

  constructor(
    private bchsService: BchsService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    this.garrisonForm.valueChanges
      .subscribe(value => {
        if (this.onChange) {
          this.onChange(value);
        }
      })
    this.uuids = this.amplificationsUuid ? this.amplificationsUuid : [];
  }

  public writeValue(value): void {
    if (value?.length) {
      value.forEach(element => {
        (this.garrisonForm.controls["garrisonArray"] as FormArray).push(new FormGroup({
          name: new FormControl(element.name),
          garrisonStr: new FormControl(element.garrisonStr),
        }));
      });
    }
    else {
      const len = (this.garrisonForm.controls["garrisonArray"] as FormArray).length;
      for (let i = len; i >= 0; i--) {
        this.deleteArray(i);
      }
      this.garrisonForm.reset();
    }
  }

  public registerOnChange(fn: (param: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(): void { }

  public deleteArrayHttp(index: number): void {
    if (this.uuids[index]) {
      this.bchsService.deleteAmplification(this.uuids[index]).subscribe(
        res => {
          this.deleteArray(index);
          this.uuids.splice(index, 1);
          this.changeDetectorRef.detectChanges();
        }
      );
    }
  }

  public deleteArray(index: number): void {
    (this.garrisonForm.controls["garrisonArray"] as FormArray).removeAt(index);
  }

  public addArray(): void {
    this.bchsService.makeAmplification(String(this.militaryCity), '').subscribe(res => {
      (this.garrisonForm.controls["garrisonArray"] as FormArray).push(new FormGroup({
        name: new FormControl(),
        garrisonStr: new FormControl(),
      }));
      this.uuids.push(res.uuid);
      this.changeDetectorRef.detectChanges();
    })
  }

  public onBlurMethod(index: number): void {
    const name = (this.garrisonForm.controls["garrisonArray"] as FormArray).value[index].name;
    const uuid = this.uuids[index];
    this.bchsService.editAmplification(uuid, name).subscribe();
  }

}
