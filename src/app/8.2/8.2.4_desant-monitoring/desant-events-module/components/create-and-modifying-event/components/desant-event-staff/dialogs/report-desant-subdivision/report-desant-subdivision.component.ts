import {Component, OnInit} from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {NewEventDataService} from '../../../../services/new-event-data.service';
import {Divisions} from '../../../../../../types/desant-events.type';
import {DayPeriod} from '../../../../types/new-desant-event-dialog.types';
import {LoaderService} from '../../../../../../../../../shared/components/loader/loader.service';
import {NewEventApiService} from '../../../../services/new-event-api.service';
import {HttpParams} from '@angular/common/http';
import {Paratrooper} from '../../../../../../types/desant-events.type';

@Component({
  selector: 'app-report-desant-subdivision',
  templateUrl: './report-desant-subdivision.component.html',
  styleUrls: ['./report-desant-subdivision.component.scss'],
  providers: [LoaderService],
})
export class ReportDesantSubdivisionComponent implements OnInit {
  public subdivisions: Divisions[];
  public selectedSubdivisions: Divisions;
  public subdivisionMilitaryCount: number;
  public dayPeriod: DayPeriod[];
  public selectedDayPeriod: DayPeriod;
  public paratroopers: Paratrooper[];
  public selectedParatroopers: Paratrooper[];
  public totalParatroopers: number;

  constructor(public loader: LoaderService,
              private dialogRef: DynamicDialogRef,
              private newEventService: NewEventApiService,
              private newEventDataService: NewEventDataService,
  ) {
  }

  ngOnInit(): void {
    // TODO: Поменять мок mu_id после реализации автовыбора
    this.loader.startLoading(this.newEventService.getDivisionByMilitaryUnit(84000000)).subscribe(value => this.subdivisions = value);
    this.loader.startLoading(this.newEventService.getJumpsState()).subscribe(value => this.dayPeriod = value.data);
  }

  public getParatroopers(): void {
    this.newEventService.getParatroopers(this.setQueryParamsForGetParatroopers(this.selectedSubdivisions.id.toString())).subscribe(value => {
      this.paratroopers = value.data;
      this.totalParatroopers = value.count;
    });
  }

  public addParatrooper(): void {
    // TODO: Реализовать метод добавления парашютистов после готовности на бэке
  }

  public closeModal(): void {
    this.dialogRef.close();
  }

  private setQueryParamsForGetParatroopers(id: string): HttpParams {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('division_id', id);
    return httpParams;
  }

  public setParatroopersFullName(name: string, middle_name: string, surname: string): string {
    return `${surname} ${name.substr(0, 1)}.${middle_name.substr(0, 1)}.`;
  }
}
