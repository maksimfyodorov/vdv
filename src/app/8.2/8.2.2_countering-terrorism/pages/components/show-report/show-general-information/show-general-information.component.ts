import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GeneralInformation } from '../../../../interfaces/generalInformation';
import { CounterListService } from '../../../services/counter-list.service';
import { StateService } from '../../../services/state.service';
import { generalInformation } from '../mock';

@Component({
  selector: 'app-show-general-information',
  templateUrl: './show-general-information.component.html',
  styleUrls: ['./show-general-information.component.scss']
})
export class ShowGeneralInformationComponent implements OnInit {

  public id: string;
  private querySubscription: Subscription;
  public militaryItemId: string;

  public generalInformation: GeneralInformation = generalInformation;

  constructor(
    private stateService: StateService,
    private http: CounterListService,
    private route: ActivatedRoute,
  ) {
    this.id = this.http.getQueryId();
    this.militaryItemId = this.http.getQueryMilitaryItemId();
  }

  public ngOnInit(): void {
    this.stateService.changePageIndex(0);
  }

  public changePageIndex(): void {
    this.stateService.changePageIndex(1)
  }
}
