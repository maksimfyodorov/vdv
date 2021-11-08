import { AircraftType, PostAircraft } from './../../../../../../types/aircraftInterface';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AircraftService } from '../../services/aircraft.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderService } from '../../../../../../../../shared/components/loader/loader.service';

@Component({
  selector: 'app-new-aircraft',
  templateUrl: './new-aircraft.component.html',
  styleUrls: ['./new-aircraft.component.scss']
})
export class NewAircraftComponent implements OnInit {
  @Output() public addNewAircraft: EventEmitter<string> = new EventEmitter<string>();

  public aircraftType: AircraftType[];
  public aircraftForm: FormGroup = this.getAircraftForm();
  public form: PostAircraft ;

  constructor(private aircraftService: AircraftService, public loader: LoaderService) { }

  ngOnInit(): void {
    this.getAircraftType();
    this.aircraftForm = this.getAircraftForm();
  }

  public getAircraftType(): void {
    this.loader.startLoading(this.aircraftService.getAircraftType()).subscribe(res => {
      this.aircraftType = res;
    });
  }

  public onSubmit(): void {
    this.form = {
      name: this.aircraftForm.controls.name.value,
      type_uuid: this.aircraftForm.controls.type.value.uuid,
      capacity_vvst: this.aircraftForm.controls.capacity_vvst.value,
      capacity_ls: this.aircraftForm.controls.capacity_ls.value
    };
    this.loader.startLoading(this.aircraftService.submitForm(this.form)).subscribe(
      (data) => {
        this.addNewAircraft.emit();
        console.log('Form submitted successfully');
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  private getAircraftForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      capacity_vvst: new FormControl('', Validators.required),
      capacity_ls: new FormControl('', Validators.required)
    });
  }

}
