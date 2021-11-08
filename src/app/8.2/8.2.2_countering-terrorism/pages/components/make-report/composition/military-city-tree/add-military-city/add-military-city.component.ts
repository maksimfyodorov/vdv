import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { filter, map } from 'rxjs/operators';
import { MilitaryUnitHierarchyItem } from '../../../../../../../../shared/components/ospo/military-units/military-units-sidebar/interfaces/interfaces';
import { OspoCoordinatesComponent } from '../../../../../../../../shared/components/ospo/ospo-coordinates/components/ospo-coordinates/ospo-coordinates.component';
import { COLS_WITHOUT_HEIGHT } from '../../../../../../../../shared/components/ospo/ospo-coordinates/infrastucture/table-cols';
import { BackEndCoordinates } from '../../../../../../../../shared/components/ospo/ospo-coordinates/types/mark';
import { AddMilitaryCity, MilitaryCity } from '../../../../../../interfaces/interface';
import { StateService } from '../../../../../services/state.service';
import { MilitaryTreeService } from '../military-tree.service';

@Component({
  selector: 'app-add-military-city',
  templateUrl: './add-military-city.component.html',
  styleUrls: ['./add-military-city.component.scss']
})
export class AddMilitaryCityComponent implements OnInit {

  public districts: MilitaryCity[];
  public selectedDistrict: MilitaryCity;
  public garrisons: MilitaryCity[];
  public selectedGarrison: MilitaryCity;
  public cityName: string = '';
  public cityCoordinates: BackEndCoordinates;
  public coordinates: string = '';
  public militaryUnit: MilitaryUnitHierarchyItem;
  public id: string;

  constructor(
    private http: MilitaryTreeService,
    private dialogService: DialogService,
    private state: StateService,
    public dialogRef: DynamicDialogRef,
  ) { }

  public ngOnInit(): void {
    this.state.returnMilitaryUnit().subscribe(res => {
      this.militaryUnit = res;
      this.initReportUuid();
    })
  }

  public initReportUuid(): void {
    this.state.returnReportUuid().subscribe(res => {
      this.id = res;
      this.initData();
    })
  }

  public initData(): void {
    this.getDistricts();
  }

  public getGarrison(id: number): void {
    this.http.getGarrison(id).subscribe(res => {
      this.garrisons = res?.data;
      this.selectedGarrison = this.garrisons[0];
    })
  }

  public getDistricts(): void {
    this.http.getAntiterrorDistrict().subscribe(res => {
      this.districts = res.data;
      this.selectedDistrict = this.districts[0];
      this.getGarrison(this.selectedDistrict.id);
    })
  }

  public setCoordinate(): void {
    this.dialogService.open(OspoCoordinatesComponent, {
      header: 'Координаты', width: '90%',
      data: {
        height: false, cols: COLS_WITHOUT_HEIGHT
      }
    }).onClose.pipe(
      filter(res => res),
      map(res => ` ${res.object_geom.coordinates[0]} ${res.object_geom.coordinates[1]}`)
    ).subscribe(res => this.coordinates = res);
  }

  public addMilitaryCity(): void {
    const city: AddMilitaryCity = {
      name: this.cityName,
      district: String(this.selectedDistrict.id),
      garrison: String(this.selectedGarrison.id),
      coordinate_uuid: this.cityCoordinates.uuid,
      military_unit_id: this.militaryUnit.id
    }
    this.http.addMilitaryCity(city).subscribe(() => {
      this.initData();
      this.dialogRef.close();
    })
  }

}
