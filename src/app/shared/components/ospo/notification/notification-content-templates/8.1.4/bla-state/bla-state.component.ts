import { Component, Input, OnInit } from '@angular/core';
import { Bla } from './types';
import { BLAS } from './mock';
import { NotificationLink } from '../../../services/notification.service';
import { NotificationLinkOpenerService } from '../../../services/notification-link-opener.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bla-state',
  templateUrl: './bla-state.component.html',
  styleUrls: ['./bla-state.component.scss'],
})
export class BlaStateComponent implements OnInit {

  @Input() public data;
  public blas: Bla[] = BLAS;

  constructor(private linkOpenerService: NotificationLinkOpenerService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  public total(blas: Bla[], col: string, subCol?: string): number {
    return blas.reduce((prev, bla) => prev + (subCol ? bla[col][subCol] : bla[col]), 0);
  }

  public openLink(linkData: NotificationLink): void {
    this.linkOpenerService.currentLinkData$.next(linkData);
    if (linkData.type === 'schedule' || linkData.type === 'inspection') {
      this.router.navigate(['/plan']).then();
    }
  }
}
