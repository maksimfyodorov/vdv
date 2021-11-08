import { Injectable } from '@angular/core';
import { MilitaryUnitHierarchyItem } from '../../../shared/components/ospo/military-units/military-units-sidebar/interfaces/interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MilitaryUnitService {
  get currentMilitaryUnit(): MilitaryUnitHierarchyItem {
    return this._currentMilitaryUnit;
  }

  set currentMilitaryUnit(value: MilitaryUnitHierarchyItem) {
    this.currentMilitaryUnit$.next(value);
    this._currentMilitaryUnit = value;
  }

  private _currentMilitaryUnit: MilitaryUnitHierarchyItem;

  public currentMilitaryUnit$: BehaviorSubject<MilitaryUnitHierarchyItem> = new BehaviorSubject<MilitaryUnitHierarchyItem>(null);

  constructor() { }
}
