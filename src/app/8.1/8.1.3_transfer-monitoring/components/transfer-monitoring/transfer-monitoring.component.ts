import { Component, OnInit } from '@angular/core';
import { EventTableDataService } from '../../services/event-table-data.service';
import { MilitaryUnitHierarchyItem } from '../../../../shared/components/ospo/military-units/military-units-sidebar/interfaces/interfaces';
@Component({
  selector: 'app-transfer-monitoring',
  templateUrl: './transfer-monitoring.component.html',
  styleUrls: ['./transfer-monitoring.component.scss']
})
export class TransferMonitoringComponent implements OnInit {

  items: any;

  constructor(
    public eventTableDataService: EventTableDataService,
  ) { }


  public ngOnInit(): void {
    this.items = [
      { label: 'Мероприятия' },
      { label: 'Контроль' },
    ];
  }

  public onSelectMilitaryUnit(militaryUnit: MilitaryUnitHierarchyItem): void {
    this.eventTableDataService.militaryUnit.next(militaryUnit);
  }

}
