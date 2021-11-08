import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationLink } from '../../../services/notification.service';
import { NotificationBody } from './types';
import { NOTIFICATION_BODY } from './mock';

@Component({
  selector: 'app-document-was-received',
  templateUrl: './document-was-received.component.html',
  styleUrls: ['./document-was-received.component.scss']
})
export class DocumentWasReceivedComponent implements OnInit {

  @Input() data;
  @Output() public clickLink: EventEmitter<NotificationLink> = new EventEmitter<NotificationLink>();
  public notificationBody: NotificationBody = NOTIFICATION_BODY;

  constructor() { }

  ngOnInit(): void {
  }

}
