import { Component } from '@angular/core';
import { LoaderService } from '../../../shared/components/loader/loader.service';
import { MilitaryUnitHierarchyItem } from '../../../shared/components/ospo/military-units/military-units-sidebar/interfaces/interfaces';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  providers: [LoaderService]
})
export class NotificationsComponent {
  public breadcrumbsLabels = [
    { label: 'Главная', url: '/' },
    { label: 'Журнал уведомлений' },
  ];

  public militaryUnitId: number;

  public changeMilitaryUnit(militaryUnitHierarchyItem: MilitaryUnitHierarchyItem): void {
    this.militaryUnitId = militaryUnitHierarchyItem.id;
  }
}
