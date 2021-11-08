import { Aircraft, AircraftType } from './../../../../types/aircraftInterface';
import { Component, OnInit } from '@angular/core';
import { AircraftService } from './services/aircraft.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderService } from '../../../../../../shared/components/loader/loader.service';
@Component({
  selector: 'app-aircraft',
  templateUrl: './aircraft.component.html',
  styleUrls: ['./aircraft.component.scss'],
  providers: [AircraftService],
})
export class AircraftComponent implements OnInit {

  public newAircraft = false;
  public aircrafts: Aircraft[];
  public aircraftType: AircraftType[];
  public cloneAircraft: { [uuid: string]: Aircraft; } = {};
  constructor(private aircraftService: AircraftService, public loader: LoaderService) { }

  ngOnInit(): void {
    this.getAircraft();
    this.getAircraftType();
  }

  public addAircraft(): void {
    this.newAircraft = true;
  }

  public deleteNewAircraft(): void {
    this.newAircraft = false;
  }

  public getNewAircraft(): void {
    this.newAircraft = false;
    this.getAircraft();
  }

  public onRowEditInit(aircraft: Aircraft): void {
    this.cloneAircraft[aircraft.uuid] = { ...aircraft };
  }

  public onRowEditCancel(aircraft: Aircraft, index: number): void {
    this.aircrafts[index] = this.cloneAircraft[aircraft.uuid];
    delete this.cloneAircraft[aircraft.uuid];
  }
  public onRowEditSave(aircraft: Aircraft): void {
    const temp = {
      uuid: aircraft['uuid'],
      type_uuid: aircraft.type.uuid,
      name: aircraft['name'],
      capacity_vvst: aircraft['capacity_vvst'],
      capacity_ls: aircraft['capacity_ls']
    };
    this.aircraftService.putAircraft(temp).subscribe(
      (data) => {
        console.log('Task edited successfully');
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  public deleteAircraft(aircraft: Aircraft): void {
    this.loader.startLoading(this.aircraftService.deleteAircraft(aircraft)).subscribe(
      (data) => {
        this.getAircraft();
        console.log('Task deleted successfully');
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  private getAircraft(): void {
    this.loader.startLoading(this.aircraftService.getAircrafts()).subscribe(res => {
      this.aircrafts = res;
    });
  }

  private getAircraftType(): void {
    this.aircraftService.getAircraftType().subscribe(res => {
      this.aircraftType = res;
    });
  }
}
