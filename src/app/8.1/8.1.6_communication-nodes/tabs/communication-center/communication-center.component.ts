import { Component, OnInit } from '@angular/core';
import { utils } from 'ues';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-communication-center',
  templateUrl: './communication-center.component.html',
  styleUrls: ['./communication-center.component.scss']
})
export class CommunicationCenterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.setProxyUesMapUrl();
  }

  private setProxyUesMapUrl(): void {
    utils.setProxyUrl(environment.pkrooUrl);
  }
}
