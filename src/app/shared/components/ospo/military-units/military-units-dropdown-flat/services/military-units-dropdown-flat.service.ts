import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MilitaryUnitItem } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MilitaryUnitsDropdownFlatService {

  constructor( private httpClient: HttpClient) { }

  public getMilitaryUnits(search?: string): Observable<MilitaryUnitItem[]> {
    const url = search ? `/api/military_unit?list=true&showDivisions=True&search=${search}` : `/api/military_unit?list=true&showDivisions=True`;
    return this.httpClient.get<MilitaryUnitItem[]>(url);
  }

  public getMilitaryUnitById(id: number): Observable<MilitaryUnitItem> {
    return this.httpClient.get<MilitaryUnitItem>(`/api/military_unit/${id}`);
  }
}
