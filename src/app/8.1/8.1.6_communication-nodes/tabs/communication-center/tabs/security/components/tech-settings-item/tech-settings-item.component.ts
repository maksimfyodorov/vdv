import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  TechItem,
  TechSettingsItem,
} from '../../../../../../../../shared/components/ospo/ospo-security/types/security.types';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tech-settings-item',
  templateUrl: './tech-settings-item.component.html',
  styleUrls: ['./tech-settings-item.component.scss'],
})
export class TechSettingsItemComponent {
  @Input() public formGroup: FormGroup;
  @Input() public techItem: TechSettingsItem;
  @Input() public techItems: TechItem[] = [];
  @Output() public deleteItem: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() public valueChanged: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  public delete(): void {
    this.deleteItem.emit(this.formGroup);
  }

  public techSelected($event: TechItem): void {
    this.formGroup.get('uuid').setValue($event.uuid);
    this.formGroup.get('name').setValue($event.name);
    this.valueChanged.emit(this.formGroup);
  }

  public countChanged($event: number): void {
    this.formGroup.get('count').setValue($event);
    this.valueChanged.emit(this.formGroup);
  }
}
