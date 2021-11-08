import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationLink } from '../../../services/notification.service';

@Component({
  selector: 'app-text-message',
  templateUrl: './text-message.component.html',
  styleUrls: ['./text-message.component.scss']
})
export class TextMessageComponent implements OnInit {

  @Input() public data;
  @Output() public clickLink: EventEmitter<NotificationLink> = new EventEmitter<NotificationLink>();

  constructor() { }

  ngOnInit(): void {
  }

  public emitClickLink(link: NotificationLink): void {
    this.clickLink.emit(link);
  }
}
