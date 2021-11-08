import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CoordinateConvertorService } from '../../../../services/coordinate-convertor.service';
import { OlApiService } from '../../../../services/ol-api.service';
import { HDMSCoordinates } from '../../../../types/hdmscoordinates';


const TYPE_COORDINATE = {
  N: 'с.ш.',
  S: 'ю.ш.',
  W: 'з.д.',
  E: 'в.д.',
};

@Component({
  selector: 'app-coordinates',
  templateUrl: './coordinates.component.html',
  styleUrls: ['./coordinates.component.scss'],
})
export class CoordinatesComponent implements OnInit {
  @Input()
  public isReadOnly: boolean;

  @Input()
  public isSetCoordinates = true;

  @Input()
  public formCoordinates: FormGroup;

  @Input()
  public modeCoordinate = 'degrees';

  @Input()
  public isShowTitle = true;

  public isModal = false;
  public stringHDMSForm: FormGroup;
  public isCoordinateSelected: boolean;

  public formMode = this.fb.group({
    mode: this.modeCoordinate,
  });

  private subscription: Subscription;
  private oldCoordinate: number[];

  public get coordinates3857(): FormArray {
    return this.formCoordinates.get('coordinates') as FormArray;
  }

  public get longitudeControl(): FormControl {
    return this.coordinates3857?.controls[0] as FormControl;
  }

  public get latitudeControl(): FormControl {
    return this.coordinates3857?.controls[1] as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private convertor: CoordinateConvertorService,
    private olService: OlApiService,
  ) {
    this.createStringHDMSForm();
  }

  public ngOnInit(): void {
    const latitude3857 = this.latitudeControl?.value;
    const longitude3857 = this.longitudeControl?.value;
    this.formMode.get('mode').setValue(this.modeCoordinate);

    if (!latitude3857 && !longitude3857 && latitude3857 !== 0 && longitude3857 !== 0) {
      this.changeValueCoordinates3857Form();
      this.changeValueStringHDMSForm();

      return;
    }


    this.changeValueCoordinates3857Form();
    this.changeValueStringHDMSForm();

    this.setHDMSCoordinates(latitude3857, longitude3857, true);
    this.setDegreesString('longitude');
    this.setDegreesString('latitude');

  }

  public selectCoordinatesOnMap(): void {
    this.oldCoordinate = [this.longitudeControl?.value, this.latitudeControl?.value];
    this.isCoordinateSelected = true;

    this.subscription = this.olService.mouseMove().subscribe({
      next: coordinates3857 => {

        this.setHDMSCoordinates(coordinates3857[1], coordinates3857[0], true);
        this.coordinates3857.patchValue(coordinates3857, { emitEvent: true });
      },
      complete: () => {
        this.isCoordinateSelected = false;
        this.subscription.unsubscribe();
        // this.cancelSelectCoordinatesOnMap();
      },
    });
  }

  public cancelSelectCoordinatesOnMap(): void {
    this.isCoordinateSelected = false;

    if (this.oldCoordinate) {
      this.coordinates3857.patchValue(this.oldCoordinate);
    }

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private setHDMSCoordinates(latitude: number, longitude: number, emitEvent: boolean = false): void {
    const mapMercator = this.convertor.mapMercatorToHDMS([latitude, longitude]);

    this.stringHDMSForm.get('latitude').patchValue(mapMercator.latitude, { emitEvent });
    this.stringHDMSForm.get('longitude').patchValue(mapMercator.longitude, { emitEvent });
  }

  private setMercatorCoordinates(coordinates, emitEvent: boolean = false): void {
    const mercatorCoordinates = this.convertor.mapStringHDMSToMercator(coordinates).reverse();
    this.coordinates3857.patchValue(mercatorCoordinates, { emitEvent });

    this.setDegreesString('longitude');
    this.setDegreesString('latitude');
  }

  private setDegreesString(coordinatesName: string, emitEvent: boolean = false): void {
    const coordinate: HDMSCoordinates = this.stringHDMSForm?.get(coordinatesName)?.value;
    const degree = coordinate?.degree ? coordinate?.degree : 0;
    const minute = coordinate?.minute ? coordinate?.minute : 0;
    const second = coordinate?.second ? coordinate?.second : 0;
    const type = coordinate?.type ? TYPE_COORDINATE[coordinate.type] : '';

    this.stringHDMSForm?.get(coordinatesName)?.get('str')?.setValue(`${degree}° ${minute}′ ${second}″ ${type || ''}`, { emitEvent });
  }

  private changeValueCoordinates3857Form(): void {
    this.coordinates3857.valueChanges.subscribe(coordinates => {
      if (!this.isReadOnly) {
        this.setHDMSCoordinates(coordinates[1], coordinates[0], false);
      } else {
        this.setHDMSCoordinates(coordinates[1], coordinates[0], true);
      }
    });
  }

  private changeValueStringHDMSForm(): void {
    this.stringHDMSForm.valueChanges.subscribe(coordinates => {
      this.setMercatorCoordinates(coordinates);
    });
  }

  private createStringHDMSForm(): void {
    this.stringHDMSForm = this.fb.group({
      longitude: this.fb.group({
        degree: [null],
        minute: [null],
        second: [null],
        type: ['E'],
        str: [''],
      }),
      latitude: this.fb.group({
        degree: [null],
        minute: [null],
        second: [null],
        type: ['N'],
        str: [''],
      }),
    });
  }
}
