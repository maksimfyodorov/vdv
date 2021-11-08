import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { InformationGroup, GroupTypes, GroupMonth, GroupDayOfWeeks } from "../../interfaces";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  _group: InformationGroup;
  @Output() onClosed = new EventEmitter<boolean>();
  @Input() set group(group: InformationGroup) {

    group.tracks = group.tracks.map(
      item => {
          let newItem;
          if (item.type == 'monthly' || item.type == 'weekly' || item.type == 'daily' || item.type == 'yearly') {
            newItem = {
              ...item,
              day_of_week: GroupDayOfWeeks[item.day_of_week],
              month: GroupMonth[item.month],
              type: GroupTypes[item.type],
            }

            if (!newItem.month) {
              delete newItem.month;
            }
            if (!newItem.day_of_week) {
              delete newItem.day_of_week;
            }

            return newItem;
          } else {
            return item;
          }

      }
    )
    this._group = group;
  }

  get group() {
    return this._group;
  }

  constructor() { }

  ngOnInit(): void {

  }

  change(): void {
    this.onClosed.emit(false);
  }
}
