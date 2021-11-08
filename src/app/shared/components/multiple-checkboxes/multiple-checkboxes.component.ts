import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventStatus } from '../../../8.1/8.1.5_check-combat-readiness/components/scheduler-table/scheduler-table.types';

export interface CheckboxConfig {
  viewName: string;
  name: string;
  count?: number;
  color: string;
  checked: boolean;
}

@Component({
  selector: 'app-multiple-checkboxes',
  templateUrl: './multiple-checkboxes.component.html',
  styleUrls: ['./multiple-checkboxes.component.scss'],
})
export class MultipleCheckboxesComponent {
  @Output() selectionChanged: EventEmitter<EventStatus[]> = new EventEmitter<EventStatus[]>();
  @Input() public checkboxes: CheckboxConfig[] = [];
  public allSelected = true;
  constructor() {
    this.selectAll(true);
  }

  public valueChanged(): void {
    this.allSelected = this.checkForEveryChecked();
    this.selectionChanged.emit(this.filterBySelection());
  }

  public selectAll(event): void {
    this.checkboxes.forEach((item) => {
      item.checked = event;
    });
    this.valueChanged();
  }

  private filterBySelection(): EventStatus[] {
    return this.checkboxes.filter((item) => item.checked).map((item) => item.name as EventStatus);
  }

  private checkForEveryChecked(): boolean {
    return this.checkboxes.every((item) => item.checked);
  }
}
