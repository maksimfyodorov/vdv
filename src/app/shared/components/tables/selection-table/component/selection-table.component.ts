import { Component, Input, OnInit } from '@angular/core';
import { CoordinateConvertorService } from '../../../../services/coordinate-convertor.service';
import { OlApiService } from '../../../../services/ol-api.service';
import { UesInstance } from '../../../../types/roo-types';
import { MarkDataService } from '../../../ospo/ospo-coordinates/services/mark-data.service';
import { ApiService } from '../../../ospo/ospo-coordinates/services/api.service';
import { Mark } from '../../../ospo/ospo-coordinates/types/mark';

@Component({
  selector: 'app-selection-table',
  templateUrl: './selection-table.component.html',
  styleUrls: ['./selection-table.component.scss'],
})
export class SelectionTableComponent implements OnInit {

  @Input()
  public cols = [];

  public marks;
  private uesInstance: UesInstance;

  constructor(
    private convertor: CoordinateConvertorService,
    private olApi: OlApiService,
    private markData: MarkDataService,
    private api: ApiService,
  ) { }

  public ngOnInit(): void {
    this.olApi.getUesInstance()
      .subscribe(res => this.uesInstance = res);

    this.markData.marks.subscribe(res => this.marks = res);
  }

  public clickActionButton(emit, rowData: Mark): void {
    if (emit === 'delete' && rowData?.uuid) {
      this.api.deleteMark(rowData.uuid).subscribe(_ => this.markData.update());
    }
  }

  public selectMark($event: any): void {
    if ($event.data) {
      this.markData.setSelectedMark($event.data);
      this.setMapCenter($event.data.object_geom.coordinates, 1500000);
    }
  }

  public unselectedMark(): void {
    this.markData.setSelectedMark(null);
  }

  public setMapCenter(coordinates: number[], scale: number): void {
    if (coordinates && scale) {
      this.uesInstance.setMapCenter(coordinates);
      this.uesInstance.setMapScale(scale);
    }
  }
}

