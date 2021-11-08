import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MilitaryUnitHierarchyItem } from '../../../shared/components/ospo/military-units/military-units-sidebar/interfaces/interfaces';

@Injectable()
export class EventTableDataService {

  constructor() { }

  public cols = new BehaviorSubject(null);
  public selectedType = new BehaviorSubject(null);
  public timeLeft = new BehaviorSubject<number>(null);
  public militaryUnit = new BehaviorSubject<MilitaryUnitHierarchyItem>(null);

  public returnCols(): Observable<any> {
    return this.cols.asObservable();
  }

  public returnSelectedType(): Observable<any> {
    return this.selectedType.asObservable();
  }

  public returnDate(): Observable<number> {
    return this.timeLeft.asObservable();
  }

  public returnMilitaryUnit(): Observable<MilitaryUnitHierarchyItem> {
    return this.militaryUnit.asObservable();
  }
}
