import { NavigationEnd, Router, ActivatedRoute, Routes } from '@angular/router';
import { NotificationService } from './shared/components/ospo/notification/services/notification.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { DATE_PICKER_LOCALE } from './shared/components/range-data-picker/date-picker.types';
import * as moment from 'moment';
import { IrzGroupService } from './shared/services/irz-group.service';
import { Location } from '@angular/common';

moment.locale('ru_RU');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    public location: Location,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private irzGroupService: IrzGroupService,
  ) {
  }

  public ngOnInit(): void {
    this.notificationService.createSocket();
    this.primengConfig.ripple = true;
    this.primengConfig.setTranslation(DATE_PICKER_LOCALE);
    this.irzGroupService.getIrzGroups();

    /** Динамически меняем заголовки при смене страницы */
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          while (child) {
            if (child.firstChild) {
              child = child.firstChild;
            } else if (child.snapshot.data && child.snapshot.data.title) {
              return child.snapshot.data.title;
            } else {
              return null;
            }
          }
          return null;
        }),
      )
      .subscribe((data: any) => {
        if (data) {
          this.titleService.setTitle(data);
        }
      });
  }

  public ngOnDestroy(): void {
    this.notificationService.socket.close();
  }

}
