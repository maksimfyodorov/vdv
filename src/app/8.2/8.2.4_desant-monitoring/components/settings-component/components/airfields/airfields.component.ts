
import { Airfield, Coordinate } from './../../../../types/airfield';
import { Component, OnInit } from '@angular/core';
import { AirfieldService } from './services/airfield.service';
import { DialogService } from 'primeng/dynamicdialog';
import { OspoCoordinatesComponent } from '../../../../../../shared/components/ospo/ospo-coordinates/components/ospo-coordinates/ospo-coordinates.component';
import { COLS_WITHOUT_HEIGHT, COLS_WITH_HEIGHT } from '../../../../../../shared/components/ospo/ospo-coordinates/infrastucture/table-cols';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderService } from '../../../../../../shared/components/loader/loader.service';

@Component({
  selector: 'app-airfields',
  templateUrl: './airfields.component.html',
  styleUrls: ['./airfields.component.scss'],
  providers: [AirfieldService]
})
export class AirfieldsComponent implements OnInit {

  public newAirfields = false;
  public airfields: Airfield[];
  public cloneAirfields: { [uuid: string]: Airfield; } = {};
  public selectedCoordinate: Coordinate;

  constructor(private airfieldService: AirfieldService, public dialogService: DialogService, public loader: LoaderService) { }

  ngOnInit(): void {
    this.getAirfields();
  }

 public addAirfields(): void {
    this.newAirfields = true;
  }

  public deleteAirfields(): void {
    this.newAirfields = false;
  }

  public setCoordinate(index: number): void {
    this.dialogService.open(OspoCoordinatesComponent, {
      header: 'Координаты', width: '90%',
      data: {
        height: false,
        cols: COLS_WITHOUT_HEIGHT
      }
    }).onClose.subscribe(res => {
      if (res) {
        const coordinate = {
          mark: res.name,
          uuid: res.uuid,
          x: res.object_geom.coordinates[0],
          y: res.object_geom.coordinates[1],
        };
        this.selectedCoordinate = coordinate;
        this.airfields[index].coordinates.x = coordinate.x;
        this.airfields[index].coordinates.y = coordinate.y;
      }
    });
  }

  public getNewAirfield(): void {
    this.getAirfields();
    this.newAirfields = false;
  }

  public onRowEditInit(airfield: Airfield): void {
    this.cloneAirfields[airfield.uuid] = { ...airfield};
  }

  public onRowEditSave(airfield: Airfield): void {
    const temp = {
      uuid: airfield['uuid'],
      name: airfield['name'],
      coordinates_type: airfield.coordinates.uuid,
    };
    this.airfieldService.putAirfield(temp).subscribe(
      (data) => {
        console.log('Task edited successfully');
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  public onRowEditCancel(airfield: Airfield, index: number): void {
    this.airfields[index] = this.cloneAirfields[airfield.uuid];
    delete this.cloneAirfields[airfield.uuid];
  }

  public deleteAirfield(airfield: Airfield): void {
    this.airfieldService.deleteAirfield(airfield).subscribe(
      (data) => {
        this.getAirfields();
        console.log('Airfield deleted successfully');
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  private getAirfields(): void {
    this.loader.startLoading(this.airfieldService.getAirfields()).subscribe( res => {
      this.airfields = res;
    });
  }
}
