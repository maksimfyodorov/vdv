import {Component, OnInit} from '@angular/core';
import {DesantTabsService} from '../../services/desant-tabs.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  public selectedDate: number;
  public selectedTabIndex = 0;

  constructor(private  desantTabsService: DesantTabsService) {
  }

  ngOnInit(): void {
    this.desantTabsService.activeTabIndex = 3;
  }

  public generateReport(): void {
    console.log('Отчет');
  }

  public setPersonnelSettings(): void {
    console.log('Настройки штата');
  }

  public setTabIndex(event): void {
    this.selectedTabIndex = event.index;
  }
}
