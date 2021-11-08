import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { TabView } from '../../../interfaces/interface';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { CounterListService } from '../../services/counter-list.service';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-make-report',
  templateUrl: './make-report.component.html',
  styleUrls: ['./make-report.component.scss']
})
export class MakeReportComponent implements OnInit, OnDestroy {

  public id: string;
  public activeIndex: number = 0;
  public items: MenuItem[]
  public militaryItemId: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private stateService: StateService,
    private breadcrumb: BreadcrumbService,
    private route: ActivatedRoute,
    private http: CounterListService,
  ) {
    this.id = this.http.getQueryId();
    this.militaryItemId = this.http.getQueryMilitaryItemId();
    this.initRouting();
  }

  public ngOnInit(): void {
    this.breadCrumb('Информация');
    this.stateService.returnPageIndex().subscribe(res => {
      this.activeIndex = res;
      this.showThing(res);
    })
    this.subscriptions.push(this.stateService.returnReportUuid().subscribe(res => {
      if (res) {
        this.initValues(res);
      }
    }))
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(el => el.unsubscribe());
  }

  public changeIndex(event: TabView): void {
    this.stateService.changePageIndex(event.index);
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

  private initRouting(): void {
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
    ];
  }

  private initValues(uuid: string): void {
    this.http.httpReport(uuid).subscribe(res => this.http.report.next(res));
  }

}
