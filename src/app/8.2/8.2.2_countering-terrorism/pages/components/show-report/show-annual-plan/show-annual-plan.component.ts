import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CounterListService } from '../../../services/counter-list.service';
import { StateService } from '../../../services/state.service';
import { annualPlan } from '../mock';

@Component({
  selector: 'app-show-annual-plan',
  templateUrl: './show-annual-plan.component.html',
  styleUrls: ['./show-annual-plan.component.scss']
})
export class ShowAnnualPlanComponent implements OnInit {

  public annualPlan = annualPlan;

  public id: any;
  private querySubscription: Subscription;
  public militaryItemId: any;

  constructor(
    private stateService: StateService,
    private http: CounterListService,
    private route: ActivatedRoute,
  ) {
    this.id = this.http.getQueryId();
    this.militaryItemId = this.http.getQueryMilitaryItemId();
  }

  public ngOnInit(): void {
    this.stateService.changePageIndex(4);
  }

  public reducePageIndex(): void {
    this.stateService.changePageIndex(3)
  }

  public addPageIndex(): void {
    this.stateService.changePageIndex(5)
  }

}
