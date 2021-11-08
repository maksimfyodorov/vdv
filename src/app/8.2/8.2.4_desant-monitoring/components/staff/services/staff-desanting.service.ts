import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Militaries} from '../../../types/desant-monitoring.types';
import {Divisions, ParatrooperData} from '../../../desant-events-module/types/desant-events.type';
import {MilitaryMen} from '../../../../../shared/components/military/interfaces';

@Injectable()
export class StaffDesantingService {

  constructor(private httpClient: HttpClient) {
  }

  public getStaffDesantInfo(): Observable<MilitaryMen[]> {
    return this.httpClient.get<MilitaryMen[]>(`/api/military_men`);
  }

  public getDivisionByMilitaryUnit(military_unit_id): Observable<Divisions> {
    return this.httpClient.get<Divisions>(`/api/military_unit/${military_unit_id}/division`);
  }

  public getParatroopers(params?: HttpParams): Observable<ParatrooperData> {
    return this.httpClient.get<ParatrooperData>(`/api/paratrooper`, {params});
  }

  public postParatrooperForStaff(params): Observable<ParatrooperData> {
    return this.httpClient.post<ParatrooperData>('/api/paratrooper', params);
  }

  public putParatroopers(params, uuid): Observable<ParatrooperData> {
    return this.httpClient.put<ParatrooperData>(`/api/paratrooper/${uuid}`, params);
  }

}

