import { Injectable } from '@angular/core';
import { MilitaryUnitHierarchyItem } from '../interfaces/interfaces';
import { Observable, of } from 'rxjs';
import { MILITARY_UNITS } from '../mock';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class MilitaryUnitsSidebarService {

  constructor(private httpClient: HttpClient) { }

  public getMilitaryUnitsHierarchy(params?: HttpParams): Observable<MilitaryUnitHierarchyItem[]> {
    return this.httpClient.get<MilitaryUnitHierarchyItem[]>('/api/military_unit', {params});
  }
}
