import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FilterTypes, Notification, NotificationsTypes, LinkTypes } from './types/notifications';
import { LoaderService } from '../../../../shared/components/loader/loader.service';
import { NotificationJournalService } from './notification-journal.service';
import * as moment from 'moment';
import { HttpParams } from '@angular/common/http';
import { TabMenu } from 'primeng/tabmenu';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-notification-journal',
  templateUrl: './notification-journal.component.html',
  styleUrls: ['./notification-journal.component.scss'],
  providers: [NotificationJournalService],
})
export class NotificationJournalComponent implements OnInit {


  @ViewChild('notificationTable') private notificationTable;

  @Input() set militaryUnitId(value: number) {
    this._militaryUnitId = value;
    if (value) {
      this.notificationTable.reset();
      this.getNotifications();
    }
  }

  private _militaryUnitId: number;
  public notifications: Notification[];
  public menuItems = [
    { label: 'all' },
    { label: 'favorites' },
    { label: 'deleted' },
  ];
  public activeTab: string = this.menuItems[0].label;
  public types = NotificationsTypes;
  public filterTypes = FilterTypes;
  public totalRecords: number;
  public selectedNotifications: Notification[];
  public linkTypes = LinkTypes;

  constructor(
    public loader: LoaderService,
    private notificationsService: NotificationJournalService,
  ) {
  }

  ngOnInit(): void {
  }

  public onTabClick(tab: TabMenu): void {
    this.activeTab = tab.activeItem.label;
    this.notificationTable.reset();
  }

  public markSelectedAsFavorite(): void {
    this.selectedNotifications?.forEach(item => this.markAsFavorite(item));
    this.selectedNotifications = [];
  }

  public deleteSelected(): void {
    this.selectedNotifications.forEach(item => this.deleteNotification(item));
    this.selectedNotifications = [];
  }

  public deleteNotification(item: Notification): void {
    this.loader.startLoading(this.notificationsService.patchNotification({
      ...item,
      status: 'deleted',
    })).subscribe(() => this.notificationTable.reset());
  }

  public markAsFavorite(item: Notification): void {
    this.loader.startLoading(this.notificationsService.patchNotification({
      ...item,
      status: item.status !== 'favorites' ? 'favorites' : 'read',
    })).subscribe(res => {
      const index = this.notifications.findIndex(notification => notification.uuid === item.uuid);
      if (this.activeTab === 'favorites') {
        this.notifications.splice(index, 1);
      } else {
        this.notifications.splice(index, 1, res);
      }
    });
  }

  public getRelativeTime(date: Date): string {
    return moment(date).fromNow();
  }

  public getNotifications($event?: LazyLoadEvent): void {
    this.loader.startLoading(this.notificationsService.getNotifications(this.createHttpParams($event))).subscribe(res => {
      this.notifications = res.result;
      this.totalRecords = res.count;
    });
  }

  private createHttpParams(tableParams?: LazyLoadEvent): HttpParams {
    let httpParams = new HttpParams();
    if (this._militaryUnitId) {
      httpParams = httpParams.set('militaryUnitId', this._militaryUnitId.toString());
    }
    httpParams = httpParams.set('status', this.activeTab);
    for (const param in tableParams) {
      if (tableParams[param] !== null && tableParams[param] !== undefined && param !== 'filters') {
        httpParams = httpParams.set(param, tableParams[param]);
      }
    }
    return httpParams;
  }

}
