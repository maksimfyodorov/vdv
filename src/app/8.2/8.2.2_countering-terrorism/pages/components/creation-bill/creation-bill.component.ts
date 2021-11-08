import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReportResults } from '../../../interfaces/interface';
import { StateService } from '../../services/state.service';


@Component({
  selector: 'app-creation-bill',
  templateUrl: './creation-bill.component.html',
  styleUrls: ['./creation-bill.component.scss']
})
export class CreationBillComponent implements OnInit, OnDestroy {

  public reportResults: ReportResults;
  public completeCreationFlag: boolean = false;
  public subscriptions: Subscription[] = [];

  constructor(
    public state: StateService,
  ) { }

  public ngOnInit(): void {
    this.subscriptions.push(this.state.returnResultsVF().subscribe(res => this.reportResults = res));
    this.subscriptions.push(this.state.returnCompleteCreationFlag().subscribe(res => {
      this.completeCreationFlag = res;
    }))
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(el => el.unsubscribe())
  }

}
