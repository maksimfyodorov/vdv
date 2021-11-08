import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from './types/notifications';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class NotificationJournalService {

  constructor( private httpClient: HttpClient) { }

  public getNotifications(params: HttpParams): Observable<{count: number, result: Notification[]}> {
    return this.httpClient.get<{count: number, result: Notification[]}>('/api/notifications/collection', {params});
  }

  public patchNotification(notification: { uuid: string, status: string }): Observable<unknown> {
    return this.httpClient.patch(`/api/notifications/collection/${notification.uuid}`, notification);
  }
}
