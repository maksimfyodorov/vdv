import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { REQUEST_OF_STAFFING_AND_SEQURITY_BODY } from './mock';
import { NotificationLink } from '../../../services/notification.service';

@Component({
  selector: 'app-request-of-staffing-and-security',
  templateUrl: './request-of-staffing-and-security.component.html',
  styleUrls: ['./request-of-staffing-and-security.component.scss'],
})
export class RequestOfStaffingAndSecurityComponent implements OnInit {
  @Input() data;
  @Output() public clickLink: EventEmitter<NotificationLink> = new EventEmitter<NotificationLink>();
  public requestData = REQUEST_OF_STAFFING_AND_SEQURITY_BODY;

  constructor() {
  }

  ngOnInit(): void {
  }

  public emitClickLink(link): void {
    this.clickLink.emit(link);
  }
}
