import { Component, EventEmitter, forwardRef, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FlightPlanService } from '@app/8.1/8.1.4_uav-information/components/flight-plans/services/flight-plan.service';
import { Bpla, Operator } from '@app/8.1/8.1.4_uav-information/components/flight-plans/types/tasks';
import * as moment from 'moment';
import { NG_IF_COMPONENT_DATA_TOKEN } from '@app/shared/directives/ng-if-emitter/ng-if-emitter.directive';
import { SearchForm } from '@app/8.1/8.1.4_uav-information/components/flight-plans/components/search-side-bar/types/sidebar';

@Component({
  selector: 'app-search-side-bar',
  templateUrl: './search-side-bar.component.html',
  styleUrls: ['./search-side-bar.component.scss'],
  providers: [
    {provide: NG_IF_COMPONENT_DATA_TOKEN, useExisting: forwardRef(() => SearchSideBarComponent)}
  ]
})
export class SearchSideBarComponent {
  @Output() public searchApplyHandler: EventEmitter<SearchForm> = new EventEmitter<SearchForm>();
  public filterForm: FormGroup;
  public operators: Operator[];
  public bpla: Bpla[];

  constructor(
    private planService: FlightPlanService,
  ) {
    this.createFilterForm();
  }

  public getOperators(): void {
    if (!this.operators) {
      this.planService.getOperators().subscribe(res => {
        this.operators = res;
      });
    }
  }

  public getUav(): void {
    if (!this.bpla) {
      this.planService.getUav().subscribe(res => {
        this.bpla = res;
      });
    }
  }

  public applyFilter(): void {
    const dateFrom = this.filterForm.value.date_from;
    const dateTo = this.filterForm.value.date_to;
    if (dateFrom && dateTo) {
      this.filterForm.value.date_from = moment(dateFrom).utcOffset(0, true).format();
      this.filterForm.value.date_to = moment(dateTo).utcOffset(0, true).format();
    }

    this.filterForm.value.status_name = this.filterForm.value.status_name ? 'completed' : null;

    this.searchApplyHandler.emit(this.getFilterValueWithoutNull());
  }

  private createFilterForm(): void {
    this.filterForm = new FormGroup({
      general_search: new FormControl(),
      date_from: new FormControl(),
      date_to: new FormControl(),
      status_name: new FormControl(),
      bpla: new FormControl(),
      operator: new FormControl(),
    });
  }

  public getFilterValueWithoutNull(): SearchForm {
    const formValue = this.filterForm.value;
    Object.keys(formValue).forEach(k => formValue[k] === null && delete formValue[k]);

    return formValue
  }
}

