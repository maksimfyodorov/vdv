import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CounterListService } from '../../../../services/counter-list.service';
import { composition } from '../../../show-report/mock';

@Component({
  selector: 'app-accordion-modal-data',
  templateUrl: './accordion-modal-data.component.html',
  styleUrls: ['./accordion-modal-data.component.scss']
})
export class AccordionModalDataComponent implements OnInit, OnDestroy {

  data: any = composition;
  public id: string;
  public militaryItemId: string;

  constructor(
    private router: Router,
    private http: CounterListService,
  ) {
    this.id = this.http.getQueryId();
    this.militaryItemId = this.http.getQueryMilitaryItemId();
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.router.navigate(['/countering-terrorism/create'], {
      queryParams: {
        uuid: this.id,
        militaryItem: this.militaryItemId,
      }
    });
  }

}
