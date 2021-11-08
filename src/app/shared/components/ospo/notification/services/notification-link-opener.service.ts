import { Injectable } from '@angular/core';
import { NotificationLink } from './notification.service';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationLinkOpenerService {

  public currentLinkData$: BehaviorSubject<NotificationLink> = new BehaviorSubject<NotificationLink>(null);

  constructor() { }
}
