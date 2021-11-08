import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationLink } from '../../../services/notification.service';

@Component({
  selector: 'app-creation-request',
  templateUrl: './creation-request.component.html',
  styleUrls: ['./creation-request.component.scss']
})
export class CreationRequestComponent implements OnInit {

  @Input() data;
  @Output() public clickLink: EventEmitter<NotificationLink> = new EventEmitter<NotificationLink>();

  constructor() { }

  ngOnInit(): void {
  }

  public emitClickLink(link): void {
    this.clickLink.emit(link);
  }

}
