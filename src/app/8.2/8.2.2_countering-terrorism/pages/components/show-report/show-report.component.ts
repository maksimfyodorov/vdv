import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { CounterListService } from '../../services/counter-list.service';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-show-report',
  templateUrl: './show-report.component.html',
  styleUrls: ['./show-report.component.scss']
})
export class ShowReportComponent implements OnInit {

  public items: MenuItem[];

  public activeIndex = 0;

  public id: string;
  private querySubscription: Subscription;
  public militaryItemId: string;

  constructor(
    private stateService: StateService,
    private breadcrumb: BreadcrumbService,
    private http: CounterListService,
    private route: ActivatedRoute,
  ) {
    this.id = this.http.getQueryId();
    this.militaryItemId = this.http.getQueryMilitaryItemId();
    this.initRouting();
  }

  public ngOnInit(): void {
    this.stateService.returnPageIndex().subscribe(res => {
      this.activeIndex = res;
      this.showThing(res)
    })
  }

  public changeIndex(event: any): void {

  }

  public initRouting(): void {
    this.items = [
      {
        label: '',
        routerLink: 'general-information',
        icon: 'pi pi-info-circle',
        queryParams: {
          uuid: this.id,
          militaryItem: this.militaryItemId,
        },
      },
      {
        label: 'Состав',
        routerLink: 'composition',
        queryParams: {
          uuid: this.id,
          militaryItem: this.militaryItemId,
        },
      },
      {
        label: 'Обстановка',
        routerLink: 'situation',
        queryParams: {
          uuid: this.id,
          militaryItem: this.militaryItemId,
        },
      },
      {
        label: 'Подготовка Антитеррор',
        routerLink: 'preparation-antiterror',
        queryParams: {
          uuid: this.id,
          militaryItem: this.militaryItemId,
        },
      },
      {
        label: 'Годовой план',
        routerLink: 'annual-plan',
        queryParams: {
          uuid: this.id,
          militaryItem: this.militaryItemId,
        },
      },
      {
        label: 'Защита и охрана',
        routerLink: 'protection-security',
        queryParams: {
          uuid: this.id,
          militaryItem: this.militaryItemId,
        },
      },
      {
        label: 'Проверки',
        routerLink: 'verification',
        queryParams: {
          uuid: this.id,
          militaryItem: this.militaryItemId,
        },
      },
      {
        label: 'Учения',
        routerLink: 'teachings',
        queryParams: {
          uuid: this.id,
          militaryItem: this.militaryItemId,
        },
      },
    ];;
  }

  private showThing(event: number): void {
    if (event === 0) {
      this.breadCrumb('Информация');
    }
    if (event === 1) {
      this.breadCrumb('Состав');
    }
    if (event === 2) {
      this.breadCrumb('Обстановка');
    }
    if (event === 3) {
      this.breadCrumb('Подготовка Антитеррор');
    }
    if (event === 4) {
      this.breadCrumb('Годовой план');
    }
    if (event === 5) {
      this.breadCrumb('Защита и охрана');
    }
    if (event === 6) {
      this.breadCrumb('Проверки');
    }
    if (event === 7) {
      this.breadCrumb('Учения');
    }
  }

  private breadCrumb(crumbName: string): void {
    this.breadcrumb.setCrumbs([{
      label: 'Ведомость',
      routerLink: ['/countering-terrorism/create'],
      queryParams: {
        uuid: this.id,
        militaryItem: this.militaryItemId,
      },
    },
    {
      label: 'Донесение'
    },
    {
      label: crumbName
    }
    ])
  }

}
