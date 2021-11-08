import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../../services/state.service';
import { Subscription } from 'rxjs';
import { CounterListService } from '../../../services/counter-list.service';
import { filter, map, take } from 'rxjs/operators';
import { BchsService } from '../../../services/bchs.service';
import { BCHS } from '../../../../interfaces/interface';

@Component({
  selector: 'app-composition',
  templateUrl: './composition.component.html',
  styleUrls: ['./composition.component.scss']
})
export class CompositionComponent implements OnInit, OnDestroy {

  public militaryCityFlag: boolean = false;
  public addPositionFlag: boolean = false;
  public positionList: string;
  public reportUuid: string;
  public id: string;
  public militaryItemId: string;
  public bchs: BCHS;
  public subscriptions: Subscription[] = [];
  public report: any;

  constructor(
    private stateService: StateService,
    private http: CounterListService,
    private bchsService: BchsService,
  ) {
    this.id = this.http.getQueryId();
    this.militaryItemId = this.http.getQueryMilitaryItemId();
  }

  public ngOnInit(): void {
    this.stateService.changePageIndex(1);
    this.subscriptions.push(this.stateService.returnReportUuid().subscribe(res => {
      this.reportUuid = res;
      this.getExecutiveStaff();
    }))
    this.http.getReport().pipe(take(1)).subscribe(res => {
      this.report = res;
      res?.bchs[0]?.uuid ? this.loadBchs(res.bchs[0].uuid) : null;
    })
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(el => el.unsubscribe());
  }

  public loadBchs(bchsUuid: string): void {
    this.subscriptions.push(this.bchsService.getBchs(bchsUuid)
      .subscribe(res => {
        if (res) {
          this.bchs = res;
          this.militaryCityFlag = true;
        }
      }))
  }

  public reducePageIndex(): void {
    this.stateService.changePageIndex(0);
  }

  public addPageIndex(): void {
    this.stateService.changePageIndex(2);
  }

  public postExecutiveStaff(): void {
    this.http.postExecutiveStaff(this.reportUuid, this.positionList).subscribe();
  }

  private getExecutiveStaff(): void {
    this.subscriptions.push(this.http.getExecutiveStaff(this.reportUuid).pipe(
      map(el => el.data),
      filter(res => res.length > 0),
    ).subscribe(res => {
      if (res) {
        this.addPositionFlag = true;
        this.positionList = res[0].any_text;
      }
    }))
  }

}


