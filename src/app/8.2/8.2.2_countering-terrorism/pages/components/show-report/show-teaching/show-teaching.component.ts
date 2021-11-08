import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CounterListService } from '../../../services/counter-list.service';
import { StateService } from '../../../services/state.service';
import { teaching } from '../mock';

@Component({
  selector: 'app-show-teaching',
  templateUrl: './show-teaching.component.html',
  styleUrls: ['./show-teaching.component.scss']
})
export class ShowTeachingComponent implements OnInit, OnDestroy {

  public teaching: any = teaching;
  public id: string;
  public militaryItemId: string;
  public summaryUuid: string;
  public subscriptions: Subscription[] = [];

  constructor(
    private stateService: StateService,
    private http: CounterListService,
    private router: Router,
  ) {
    this.id = this.http.getQueryId();
    this.militaryItemId = this.http.getQueryMilitaryItemId();
  }

  public ngOnInit(): void {
    this.stateService.changePageIndex(7);
    this.getSummaryUuid();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(element => element.unsubscribe());
  }

  public reducePageIndex(): void {
    this.stateService.changePageIndex(6);
  }

  public create(): void {
    this.stateService.changePageIndex(0);
    const statusUuid = 'a1d71423-7da2-4e8e-9117-de157fdc8af1';
    this.subscriptions.push(this.http.changeSummaryStatus(this.summaryUuid, statusUuid).subscribe(() => {
      this.router.navigate(['/countering-terrorism/create'], { queryParams: { 'uuid': this.id, 'militaryItem': this.militaryItemId } })
    }));
  }

  public getSummaryUuid(): void {
    this.subscriptions.push(this.stateService.returnSummaryUuid().subscribe(res => this.summaryUuid = res));
  }
}
