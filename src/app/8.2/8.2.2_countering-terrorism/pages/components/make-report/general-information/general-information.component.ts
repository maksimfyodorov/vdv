import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { PromptDialogComponent } from '../../../../../../shared/components/prompt-dialog/prompt-dialog.component';
import { GeneralInformation } from '../../../../interfaces/generalInformation';
import { CounterListService } from '../../../services/counter-list.service';
import { StateService } from '../../../services/state.service';
import { OspoCoordinatesComponent } from '../../../../../../shared/components/ospo/ospo-coordinates/components/ospo-coordinates/ospo-coordinates.component';
import { COLS_WITHOUT_HEIGHT } from '../../../../../../shared/components/ospo/ospo-coordinates/infrastucture/table-cols';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, of, Subscription } from 'rxjs';
import { Mode } from '../../../../interfaces/interface';
import { filter, mergeMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.scss']
})
export class GeneralInformationComponent implements OnInit, OnDestroy {

  public creationDate: Date;
  public issueDate: Date;
  public inputNumber: number;
  public choseControlPoint: Mode;
  public militaryUnitId: string;
  public coordinates: string;
  public controlPoints: Mode[];
  public militaryItemId: string;
  public id: string;
  private summaryUuid: string;
  private reportUuid: string;
  private querySubscription: Subscription;
  private subscriptions: Subscription[] = [];

  constructor(
    private stateService: StateService,
    private http: CounterListService,
    private dialogService: DialogService,
    private route: ActivatedRoute,
  ) {
    this.querySubscription = route.queryParams.subscribe(
      (queryParam: any) => {
        this.id = this.summaryUuid = queryParam['uuid'];
        this.militaryItemId = queryParam['militaryItem'];
      }
    );
  }

  public ngOnInit(): void {
    this.subscriptions.push(this.stateService.returnReportUuid().pipe(filter(res => !!res)).subscribe(res => {
      this.initValues();
      this.reportUuid = res;
    }))
    this.stateService.returnMilitaryUnit().subscribe(res => this.militaryUnitId = String(res?.id));
    this.stateService.changePageIndex(0);
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(el => el.unsubscribe());
  }

  public getControlPoints(): void {
    this.http.getControlPoints().subscribe(res => {
      this.controlPoints = res.data;
    });
  }

  public initValues(): void {
    this.http.getReport().pipe(
      filter(res => res),
      tap(report => {
        this.inputNumber = report.number;
        this.creationDate = this.createDate(report.date);
        this.issueDate = this.createDate(report.publication);
        this.coordinates = report.map;
      }),
      mergeMap(report => forkJoin({ report: of(report), controlPoints: this.http.getControlPoints() })),
    ).subscribe(response => {
      this.controlPoints = response.controlPoints.data;
      this.selectControlPoint(response.report.control_point?.uuid);
    })
  }

  public selectControlPoint(uuid: string): void {
    this.controlPoints.forEach(controlPoint => {
      if (controlPoint.uuid === uuid) {
        this.choseControlPoint = controlPoint;
      }
    });
  }

  public selectType(event: any): void {
    this.choseControlPoint = event;
    this.saveThis();
  }

  public editType(event: any): void {
    this.dialogService.open(PromptDialogComponent, {
      header: 'Изменение пункта управления',
    }).onClose.pipe(
      filter(res => res),
      mergeMap(response => this.http.editControlPoint(event.uuid, response))
    ).subscribe(() => this.getControlPoints());
  }

  public deleteType(event: any): void {
    this.http.deleteControlPoint(event.uuid).subscribe(() => this.getControlPoints());
  }

  public createType(event: any): void {
    const controlPoint = {
      name: event,
    }
    this.http.createControlPoint(controlPoint).subscribe(() => this.getControlPoints());
  }

  public saveThis(): void {
    const body: GeneralInformation = {
      number: this.inputNumber ? this.inputNumber : null,
      map: this.coordinates ? this.coordinates : null,
      date: this.creationDate ? this.creationDate.toISOString() : null,
      publication: this.issueDate ? this.issueDate.toISOString() : null,
      control_point_uuid: this.choseControlPoint?.uuid ? this.choseControlPoint?.uuid : null,
      summary_uuid: this.summaryUuid ? this.summaryUuid : null,
    }
    this.http.editReport(this.reportUuid, body).subscribe(() => this.changePageIndex());
  }

  public changePageIndex(): void {
    this.stateService.changePageIndex(1);
  }

  public setCoordinate(): void {
    this.dialogService.open(OspoCoordinatesComponent, {
      header: 'Координаты', width: '90%',
      data: {
        height: false,
        cols: COLS_WITHOUT_HEIGHT,
      }
    }).onClose.pipe(filter(res => res)).subscribe(res => {
      const coordinate = {
        mark: res.name,
        uuid: res.uuid,
        x: res.object_geom.coordinates[0],
        y: res.object_geom.coordinates[1],
      };
      this.coordinates = coordinate.x + ' ' + coordinate.y;
    });
  }

  public createDate(dateString?: string): Date {
    return dateString ? new Date(dateString) : new Date()
  }

}