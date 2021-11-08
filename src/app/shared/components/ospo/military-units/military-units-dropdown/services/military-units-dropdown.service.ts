import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MilitaryUnit } from '../interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class MilitaryUnitsDropdownService {

  constructor(private httpClient: HttpClient) { }

  public getMilitaryUnits(): Observable<MilitaryUnit[]> {
    return this.httpClient.get<MilitaryUnit[]>('/api/military_unit');
  }

  public getMilitaryNco(): Observable<MilitaryUnit[]> {
    return this.httpClient.get<MilitaryUnit[]>('/api/military_unit?list=true');
  }

  public getDivisions(militaryUnitId: number): Observable<MilitaryUnit[]> {
    return this.httpClient.get<MilitaryUnit[]>(`http://localhost:4200/api/military_unit/${militaryUnitId}/division`);
  }
}
