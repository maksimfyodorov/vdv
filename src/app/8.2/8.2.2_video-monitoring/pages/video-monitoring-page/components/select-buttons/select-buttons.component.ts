import { Component, OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter, Input } from '@angular/core';

import { SelectButtonItem } from './select-button-item';

@Component({
  selector: 'app-select-buttons',
  templateUrl: './select-buttons.component.html',
  styleUrls: ['./select-buttons.component.scss'],
})
export class SelectButtonsComponent implements OnInit {
  @Input() items: SelectButtonItem[];
  @Input() classContainer: string = '';
  @Input() srcIcon: string = '';
  @Output() onChangeActiveItem = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  selectButtonItem(newItem: SelectButtonItem): void {
    this.items = this.items.map((item) => {
      if (item.value === newItem.value) {
        return { ...newItem, isActive: true };
      }
      return { ...item, isActive: false };
    });

    this.onChangeActiveItem.emit(newItem.value);
  }
}
