import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VIDEO_STATE_DATA } from './mock';
import { videoStateData } from './types';
import { NotificationLink } from '../../../services/notification.service';

@Component({
  selector: 'app-video-state',
  templateUrl: './video-state.component.html',
  styleUrls: ['./video-state.component.scss'],
})
export class VideoStateComponent implements OnInit {

  @Input() data;
  @Output() public clickLink: EventEmitter<NotificationLink> = new EventEmitter<NotificationLink>();
  public videoStateData: videoStateData = VIDEO_STATE_DATA;

  constructor() {
  }

  public ngOnInit(): void {
  }

  public emitClickLink(link): void {
    this.clickLink.emit(link);
  }
}
