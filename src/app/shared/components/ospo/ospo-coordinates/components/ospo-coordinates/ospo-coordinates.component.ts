import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OlApiService } from '../../../../../services/ol-api.service';
import { UesInstance } from '../../../../../types/roo-types';
import { tap } from 'rxjs/operators';
import { MarkDataService } from '../../services/mark-data.service';
import { Mark } from '../../types/mark';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-ospo-coordinates',
  templateUrl: './ospo-coordinates.component.html',
  styleUrls: ['./ospo-coordinates.component.scss'],
  providers: [OlApiService, MarkDataService, ApiService]
})
export class OspoCoordinatesComponent implements OnInit {

  public selectedMark: Mark;
  public marksMock: Mark[];
  private mapDefaultConfig = {
    resolution: 3000,
    center: [9702046.08305156, 8499440.164819743],
  };

  constructor(
    public config: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
    private fb: FormBuilder,
    private olService: OlApiService,
    private markData: MarkDataService,
  ) { }

  ngOnInit(): void {
    this.markData.init();
    this.markData.marks.subscribe(res => this.marksMock = res);

    this.olService.getUesInstance().pipe(
      tap(uesInstance => this.setMapConfig(uesInstance)),
    ).subscribe(res => res);

    this.markData.getSelectedMark().subscribe(mark => {
      this.selectedMark = mark

    });
  }

  public closeDialog(mark?: Mark): void {
    if (mark) {
      this.dialogRef.close(mark);
    }

    if (!mark) {
      this.dialogRef.close(false);
    }
  }

  private setMapConfig(uesInstance: UesInstance): void {
    uesInstance.setMapResolution(this.mapDefaultConfig.resolution);
  }
}

