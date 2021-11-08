import { Component, OnInit } from '@angular/core';
import { DatabaseModeService } from '../../../shared/services/database-mode.service';
import { MilitaryUnitHierarchyItem } from '../../../shared/components/ospo/military-units/military-units-sidebar/interfaces/interfaces';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  public readonly breadcrumbsLabels = [
    { label: 'Главная', url: '/' },
    { label: 'Настройка' },
  ];
  public currentMilitaryUnit: MilitaryUnitHierarchyItem;


  set isTestDatabaseMode(value: boolean) {
    this.databaseModeService.mode = value ? 'test' : 'production';
  }

  get isTestDatabaseMode(): boolean {
    return this.databaseModeService.mode === 'test';
  }



  constructor(
    private databaseModeService: DatabaseModeService) {
  }

  public ngOnInit(): void {
  }

  public selectCurrentMilitaryUnit(militaryUnit: MilitaryUnitHierarchyItem): void {
    this.currentMilitaryUnit = militaryUnit;
  }
}
