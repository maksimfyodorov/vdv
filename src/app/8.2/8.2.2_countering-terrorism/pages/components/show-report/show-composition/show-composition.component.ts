import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CounterListService } from '../../../services/counter-list.service';
import { StateService } from '../../../services/state.service';
import { composition } from '../mock';

@Component({
  selector: 'app-show-composition',
  templateUrl: './show-composition.component.html',
  styleUrls: ['./show-composition.component.scss']
})
export class ShowCompositionComponent implements OnInit {

  public composition: any = composition;

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
    this.stateService.changePageIndex(1);
  }

  public reducePageIndex(): void {
    this.stateService.changePageIndex(0)
  }

  public addPageIndex(): void {
    this.stateService.changePageIndex(2)
  }
}
