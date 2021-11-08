import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckCombatReadinessService {


  constructor(private http: HttpClient) {
  }

  public getInspectionSchedules(): Observable<any> {
    return this.http.get('/api/schedule');
  }

  public getInspectionAudits(uuid: number): Observable<any> {
    return this.http.get(`/api/schedule/${uuid}/inspection`);
  }

  public getInspectionAuditsByMU(uuid: number, MUid): Observable<any> {
    return this.http.get(`/api/schedule/${uuid}/inspection?${MUid}`);
  }

  public getMilitaryUnits(): Observable<any> {
    return this.http.get(`/api/military_unit`);
  }

  public getDivisionById(id): Observable<any> {
    return this.http.get(`/api/military_unit/${id}/division`);
  }

  public approveSchedule(id: number, document: any): Observable<any> {
    return this.http.patch(`/api/schedule/${id}`, document);
  }

  public removeSchedule(id: string): Observable<any> {
    return this.http.delete(`/api/schedule/${id}`);
  }

  public getInspectionById(id, uuid): Observable<any> {
    return this.http.get(`/api/schedule/${uuid}/inspection/${id}`);
  }

  public getInspectionByIdAndMU(uuid, muIds): Observable<any> {
    return this.http.get(`/api/schedule/${uuid}/inspection/${muIds}`);
  }

  public deleteInspectionById(uuid, id): Observable<any> {
    return this.http.delete(`/api/schedule/${uuid}/inspection/${id}`);
  }

  public createInspection(uuid, params): Observable<any> {
    return this.http.post(`/api/schedule/${uuid}/inspection`, params);
  }

  public editInspection(uuid, id, params): Observable<any> {
    return this.http.put(`/api/schedule/${uuid}/inspection/${id}`, params);
  }

  public changeInspectionStatus(uuid, id, params): Observable<any> {
    return this.http.patch(`/api/schedule/${uuid}/inspection/${id}`, params);
  }

  public transferInspection(uuid, id, params): Observable<any> {
    return this.http.patch(`/api/schedule/${uuid}/inspection/${id}`, params);
  }

  public getInspectionsStatuses(): Observable<any> {
    return this.http.get(`/api/inspection_status`);
  }

  public getUserPermissions(): Observable<any> {
    return this.http.get(`/api/users/permissions`);
  }
}
