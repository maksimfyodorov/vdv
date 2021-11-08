import {Component, OnInit} from '@angular/core';
import {DesantTabsService} from '../../services/desant-tabs.service';

@Component({
  selector: 'app-settings-component',
  templateUrl: './settings-component.component.html',
  styleUrls: ['./settings-component.component.scss']
})

export class SettingsComponentComponent implements OnInit {
  constructor(private desantTabsService: DesantTabsService) {
  }
  public ngOnInit(): void {
    this.desantTabsService.activeTabIndex = 6;
  }


}
