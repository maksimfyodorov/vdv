import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { OspoCoordinatesComponent } from '../../../../../../../../shared/components/ospo/ospo-coordinates/components/ospo-coordinates/ospo-coordinates.component';
import { COLS_WITHOUT_HEIGHT } from '../../../../../../../../shared/components/ospo/ospo-coordinates/infrastucture/table-cols';
import { Coordinate } from '../../../../../../types/airfield';
import { AirfieldService } from '../../services/airfield.service';
@Component({
  selector: 'app-new-airfields',
  templateUrl: './new-airfields.component.html',
  styleUrls: ['./new-airfields.component.scss']
})
export class NewAirfieldsComponent implements OnInit {
  @Output() public addNewAirfield: EventEmitter<string> = new EventEmitter<string>();

  public selectedCoordinate: Coordinate;
  public airfieldName: string;


  constructor(public dialogService: DialogService, private airfieldService: AirfieldService) { }

  ngOnInit(): void {
  }

  public setCoordinate(): void {
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
        console.log(this.selectedCoordinate)
      }
    });
  }

  public onSubmit(): void {
    const newAirfield = {
      name: this.airfieldName,
      coordinates_uuid: this.selectedCoordinate.uuid,
    };
    this.airfieldService.addNewAirfield(newAirfield).subscribe(
      (data) => {
        this.addNewAirfield.emit();
        console.log('Form submitted successfully');
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

}
