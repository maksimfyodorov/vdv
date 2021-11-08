import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CounterListService } from '../../../services/counter-list.service';
import { StateService } from '../../../services/state.service';
import { protectionSecurity } from '../mock';

@Component({
  selector: 'app-show-protection-security',
  templateUrl: './show-protection-security.component.html',
  styleUrls: ['./show-protection-security.component.scss']
})
export class ShowProtectionSecurityComponent implements OnInit {

  public protectionSecurity: any = protectionSecurity;

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
    this.stateService.changePageIndex(5);
  }

  public reducePageIndex(): void {
    this.stateService.changePageIndex(4)
  }

  public addPageIndex(): void {
    this.stateService.changePageIndex(6)
  }


}
