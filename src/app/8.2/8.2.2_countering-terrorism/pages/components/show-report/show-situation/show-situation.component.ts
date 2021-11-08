import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CounterListService } from '../../../services/counter-list.service';
import { StateService } from '../../../services/state.service';
import { situation } from '../mock';

@Component({
  selector: 'app-show-situation',
  templateUrl: './show-situation.component.html',
  styleUrls: ['./show-situation.component.scss']
})
export class ShowSituationComponent implements OnInit {

  public situation: any = situation;

  public id: string;
  private querySubscription: Subscription;
  public militaryItemId: string;

  constructor(
    private stateService: StateService,
    private http: CounterListService,
    private route: ActivatedRoute,
  ) {
    this.id = this.http.getQueryId();
    this.militaryItemId = this.http.getQueryMilitaryItemId();
  }

  public ngOnInit(): void {
    this.stateService.changePageIndex(2);
  }

  public reducePageIndex(): void {
    this.stateService.changePageIndex(1)
  }

  public addPageIndex(): void {
    this.stateService.changePageIndex(3)
  }
}
