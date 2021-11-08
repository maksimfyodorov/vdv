import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MilitaryUnitHierarchyItem } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})

export class HierarchyService {
  public selectedItem$: Subject<MilitaryUnitHierarchyItem> = new Subject<MilitaryUnitHierarchyItem>();
}
