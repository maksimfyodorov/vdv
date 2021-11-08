import {Component, OnInit} from '@angular/core';
import {DialogService, DynamicDialogComponent, DynamicDialogRef} from 'primeng/dynamicdialog';
import {OspoCoordinatesComponent} from '../../../../../../../../../shared/components/ospo/ospo-coordinates/components/ospo-coordinates/ospo-coordinates.component';
import {COLS_WITHOUT_HEIGHT} from '../../../../../../../../../shared/components/ospo/ospo-coordinates/infrastucture/table-cols';
import {SelectDesantSubdivisionComponent} from '../select-desant-subdivision/select-desant-subdivision.component';
import {ReportDesantSubdivisionComponent} from '../report-desant-subdivision/report-desant-subdivision.component';
import {Airdrome} from '../../../../../../types/desant-events.type';
import {Aircraft} from '../../../../../../../types/aircraftInterface';

@Component({
  selector: 'app-staff-task-progress-dialog',
  templateUrl: './staff-task-progress-dialog.component.html',
  styleUrls: ['./staff-task-progress-dialog.component.scss'],
  providers: [DialogService],
})
export class StaffTaskProgressDialogComponent implements OnInit {
  public documents: Document[] = [];
  public titleDoc = 'Добавить документы';
  public dateStartTask: Date;
  public timeStartTask: Date;
  public airdromeStart: Airdrome;
  public landingArea: Coordinates;
  public airplane: Aircraft;
  public selectedLandingAria: string;
  private selectedLandingAriaUUID: string;
  public banOtherAirplane = false;
  public stateVDT = false;
  public sportState = false;
  public incidentsPresence = false;

  constructor(private dialogRef: DynamicDialogRef,
              private dialogService: DialogService,
  ) {
  }

  ngOnInit(): void {
    this.banOtherAirplane = true;
    this.stateVDT = true;
    this.incidentsPresence = true;
  }

  public closeModal(): void {
    this.dialogRef.close();
  }

  public openCoordinateModal(): void {
    this.dialogService.open(OspoCoordinatesComponent, {
      dismissableMask: true,
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
        this.selectedLandingAriaUUID = coordinate.uuid;
        this.selectedLandingAria = `${coordinate.x}с.ш ${coordinate.y}в.д`;
      }
    });

  }
  public addDesantSubdivision(mode: string): void {
    this.dialogService.open(ReportDesantSubdivisionComponent, {
      dismissableMask: true,
      header: 'Отчет по военнослужащим',
      width: '1350px',
    });
  }
}
