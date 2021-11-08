import { Component, OnInit } from '@angular/core';
import { PERIOD_TYPES } from '../../constants';
import { Period } from '../../interfaces';
import { LoaderService } from '../../../../shared/components/loader/loader.service';
import { PeriodService } from '../../services/period.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { map, takeWhile } from 'rxjs/operators';
import { DeletePeriodErrorComponent } from '../delete-period-error/delete-period-error.component';

@Component({
  selector: 'app-periods',
  templateUrl: './periods.component.html',
  styleUrls: ['./periods.component.scss']
})
export class PeriodsComponent implements OnInit {

  public periodTypes: string[] = PERIOD_TYPES;
  public periods: Period[] = [];
  private clonePeriods = {};

  constructor(
    public loaderService: LoaderService,
    private periodService: PeriodService,
    private dialogService: DialogService,
  ) { }

  public ngOnInit(): void {
    this.getPeriods();
  }

  public addPeriod(): void {
    this.periods.push({} as Period);
  }

  public enableEditMode(index: number): void {
    this.clonePeriods[index] = JSON.parse(JSON.stringify(this.periods[index]));
    this.periods[index].disabled = false;
  }

  public deletePeriod(index: number): void {
    if (this.periods[index].uuid) {
      this.dialogService.open(ConfirmationDialogComponent, {
        header: 'Удаление периода',
        data: {
          message: `Вы действительно хотите удалить период?`,
        },
      }).onClose.pipe(takeWhile(res => res)).subscribe(() => {
        this.loaderService.startLoading(this.periodService.deletePeriod(this.periods[index].uuid))
          .subscribe(() => this.periods.splice(index, 1), () => {
            this.dialogService.open(DeletePeriodErrorComponent, { header: 'Ошибка' });
          });
      });
    } else {
      this.periods.splice(index, 1);
    }
  }

  public cancelChanges(index: number): void {
    this.periods[index] = this.convertDateIncomingPeriod(this.clonePeriods[index]);
    delete this.clonePeriods[index];
    this.periods[index].disabled = true;
  }

  public applyChanges(period, index: number): void {
    if (period.name &&
      period.start_date &&
      period.end_date &&
      period.year) {
      if (period.uuid) {
        const { uuid, ...rest } = period;
        this.loaderService.startLoading(this.periodService.putPeriod(this.deleteDisabledField(rest), period.uuid))
          .subscribe(() => {
            delete this.clonePeriods[index];
            period.disabled = true;
          });
      } else {
        this.loaderService.startLoading(this.periodService.postPeriod(this.deleteDisabledField(period)))
          .subscribe(res => {
            delete this.clonePeriods[index];
            this.periods.splice(index, 1);
            this.periods.push(this.convertDateIncomingPeriod({ ...res, disabled: true }));
          });
      }
    }
  }

  private addDisabledField(periods: Period[]): Period[] {
    return periods.map(period => {
      period.disabled = true;
      return period;
    });
  }

  private deleteDisabledField(period: Period): Period {
    delete period.disabled;
    return period;
  }

  private getPeriods(): void {
    this.loaderService.startLoading(this.periodService.getPeriods()).pipe(map<{ data: Period[] }, any>(res => res.data.map(period => this.convertDateIncomingPeriod(period))))
      .subscribe(res => this.periods = this.addDisabledField(res));
  }

  private convertDateIncomingPeriod(period: Period): Period {
    return {
      ...period,
      start_date: new Date(period.start_date),
      end_date: new Date(period.end_date),
    };
  }

}
