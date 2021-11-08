import { Injectable } from '@angular/core';

@Injectable()
export class DesantTabsService {
  public currentMilitaryUnitID: number;
  public activeTabIndex = 0;
  constructor() { }
}
