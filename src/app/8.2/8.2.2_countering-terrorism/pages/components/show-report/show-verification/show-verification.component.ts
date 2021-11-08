import { Component, OnInit } from '@angular/core';
import { StateService } from '../../../services/state.service';
import { verification } from '../mock';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CounterListService } from '../../../services/counter-list.service';

@Component({
  selector: 'app-show-verification',
  templateUrl: './show-verification.component.html',
  styleUrls: ['./show-verification.component.scss']
})
export class ShowVerificationComponent implements OnInit {

  public verification: any = verification;

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
    this.stateService.changePageIndex(6);
  }

  public reducePageIndex(): void {
    this.stateService.changePageIndex(5)
  }

  public addPageIndex(): void {
    this.stateService.changePageIndex(7)
  }

}
