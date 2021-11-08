import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CounterListService } from '../../../services/counter-list.service';
import { StateService } from '../../../services/state.service';
import { preparationAntiterror } from '../mock';

@Component({
  selector: 'app-show-preparation-antiterror',
  templateUrl: './show-preparation-antiterror.component.html',
  styleUrls: ['./show-preparation-antiterror.component.scss']
})
export class ShowPreparationAntiterrorComponent implements OnInit {

  public preparationAntiterror: any = preparationAntiterror;

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
    this.stateService.changePageIndex(3);
  }

  public reducePageIndex(): void {
    this.stateService.changePageIndex(2)
  }

  public addPageIndex(): void {
    this.stateService.changePageIndex(4)
  }
}
