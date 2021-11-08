import { Component } from '@angular/core';
import { NotificationJournalService } from '../../../../common-pages/notifications/tabs/notification-journal/notification-journal.service';
import { Router } from '@angular/router';
import { NotificationLink } from './services/notification.service';
import { NotificationLinkOpenerService } from './services/notification-link-opener.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  providers: [NotificationJournalService]
})
export class NotificationComponent {

  constructor(private notificationService: NotificationJournalService,
              private router: Router,
              private linkOpenerService: NotificationLinkOpenerService) {
  }

  public setMessageRead(message): void {
    if (message.data.uuid) {
      this.notificationService.patchNotification({ uuid: message.data.uuid, status: 'read'}).subscribe();
    }
  }

  public openLink(linkData: NotificationLink): void {
    this.linkOpenerService.currentLinkData$.next(linkData);
    switch (linkData.type) {
      case 'schedule' || 'inspection':
        this.router.navigate(['/plan']).then();
        break;
      case 'plan' :
        this.router.navigate(['/bpla']).then();
        break;
    }
  }
}
