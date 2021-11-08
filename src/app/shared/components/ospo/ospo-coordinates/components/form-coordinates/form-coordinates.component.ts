import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarkDataService } from '../../services/mark-data.service';
import { ApiService } from '../../services/api.service';

export interface MarkPost {
  element_geom: ElementGeom;
  height: number;
  mark: string;
  type: string;
}

export interface ElementGeom {
  coordinates: number;
  type: string;
}

@Component({
  selector: 'app-form-coordinates',
  templateUrl: './form-coordinates.component.html',
  styleUrls: ['./form-coordinates.component.scss'],
})
export class FormCoordinatesComponent {

  @Input() public height: boolean;

  public form: FormGroup;
  public mode = 'view';
  public stringHDMSForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private markData: MarkDataService,
  ) {
    this.form = this.fb.group({
      mark: this.fb.control(''),
      height: this.fb.control(null),
      element_geom: this.fb.group({
        coordinates: this.fb.array(['', '']),
        type: ['Point'],
      }),
      type: this.fb.control(''),
    });
  }

  public save(): void {
    const formValue: MarkPost = this.form.value;

    const objForBackend = {
      height: formValue.height,
      mark: formValue.mark,
      type: this.markData.markTypes$?.value[0]?.uuid,
      x: formValue.element_geom.coordinates[0],
      y: formValue.element_geom.coordinates[1],
    };

    this.api.postMark(objForBackend).subscribe(res => {
      if (res) {
        this.markData.update();
        this.form.reset();
      }
    });
  }
}
