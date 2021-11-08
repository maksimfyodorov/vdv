import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {
  AirdromeData,
  Divisions,
  EventBasicInfo,
  EventsExistName, ParachuteSystemData, Paratrooper, ParatrooperData,
  StaffTask,
  StaffTaskData
} from '../../../types/desant-events.type';
import {HttpClient, HttpParams} from '@angular/common/http';
import {
  CompletingTable,
  CompletingTableData,
  DocumentData,
  JumpStatesData
} from '../types/new-desant-event-dialog.types';
import {AircraftData} from '../../../../types/aircraftInterface';
import {MilitaryMen} from '../../../../../../shared/components/military/interfaces';
import {Document} from '../../../../../../shared/components/ospo/documents/documents.types';

@Injectable()
export class NewEventApiService {

  constructor(private httpClient: HttpClient) { }

  public createNewEvent(params): Observable<EventBasicInfo> {
    return this.httpClient.post<EventBasicInfo>('/api/event', params);
  }

  public changeEvent(params, uuid): Observable<EventBasicInfo> {
    return this.httpClient.put<EventBasicInfo>(`/api/event/${uuid}`, params);
  }

  public getEventGeneralInfo(uuid: string): Observable<EventBasicInfo> {
    return this.httpClient.get<EventBasicInfo>(`/api/event/${uuid}`);
  }

  public getEventExistName(params?: HttpParams): Observable<EventsExistName> {
    return this.httpClient.get<EventsExistName>(`/api/event_exist_name`, {params});
  }

  public createNewStaffTask(params: HttpParams): Observable<StaffTask> {
    return this.httpClient.post<StaffTask>(`/api/landing_task_ls`, params);
  }

  public getJumpsState(): Observable<JumpStatesData> {
    return this.httpClient.get<JumpStatesData>(`/api/landing_task/single_jumping`);
  }

  public getAerodrome(): Observable<AirdromeData> {
    return this.httpClient.get<AirdromeData>('/api/aerodrome/directory');
  }

  public getAircraftDirectory(): Observable<AircraftData> {
    return this.httpClient.get<AircraftData>('/api/aircraft/directory');
  }

  public getDivisionByMilitaryUnit(military_unit_id): Observable<Divisions[]> {
    return this.httpClient.get<Divisions[]>(`/api/military_unit/${military_unit_id}/division`);
  }

  public getMilitaryMenByDivisionID(division_id): Observable<MilitaryMen[]> {
    return this.httpClient.get<MilitaryMen[]>(`/api/division/${division_id}/military_man`);
  }

  public postNewStaffCompleting(params): Observable<CompletingTable[]> {
    return this.httpClient.post<CompletingTable[]>('/api/completing', params);
  }

  public putCompleting(params, uuid: string): Observable<CompletingTable[]> {
    return this.httpClient.put<CompletingTable[]>(`/api/completing/${uuid}`, params);
  }

  public deleteCompleting(uuid: string): Observable<CompletingTable> {
    return this.httpClient.delete<CompletingTable>(`/api/completing/${uuid}`);
  }

  public getCompletingFullInfo(uuid: string): Observable<CompletingTable> {
    return this.httpClient.get<CompletingTable>(`/api/completing/${uuid}`);
  }

  public getParatroopers(params?: HttpParams): Observable<ParatrooperData> {
    return this.httpClient.get<ParatrooperData>(`/api/paratrooper`, {params});
  }

  public getCompletingInfo(params?: HttpParams): Observable<CompletingTableData> {
    return this.httpClient.get<CompletingTableData>('/api/completing', {params});
  }

  public getStaffTasksList(params?: HttpParams): Observable<StaffTaskData> {
    return this.httpClient.get<StaffTaskData>('/api/landing_task_ls', {params});
  }

  public changeStaffTask(uuid: string, params?: HttpParams): Observable<StaffTask> {
    return this.httpClient.put<StaffTask>(`/api/landing_task_ls/${uuid}`, params);
  }

  public getStaffTaskFullInfo(uuid: string): Observable<StaffTask> {
    return this.httpClient.get<StaffTask>(`/api/landing_task_ls/${uuid}`);
  }

  public deleteStaffTask(uuid: string): Observable<StaffTask> {
    return this.httpClient.delete<StaffTask>(`/api/landing_task_ls/${uuid}`);
  }

  public putTaskDocuments(uuid: string, params): Observable<Document[]> {
    return this.httpClient.put<Document[]>(`/api/landing_task_ls/${uuid}/document`, params);
  }

  public getTaskDocuments(uuid: string): Observable<DocumentData> {
    return this.httpClient.get<DocumentData>(`/api/landing_task_ls/${uuid}/document`);
  }

  public getParachute(): Observable<ParachuteSystemData> {
    return this.httpClient.get<ParachuteSystemData>('/api/parachute');
  }

  public postParatrooperForStaff(params: HttpParams): Observable<Paratrooper[]> {
    return this.httpClient.post<Paratrooper[]>(`/api/paratrooper_landing`, params);
  }

  public putParatrooperForStaff(params: HttpParams, uuid: string): Observable<Paratrooper[]> {
    return this.httpClient.put<Paratrooper[]>(`/api/paratrooper_landing/${uuid}`, params);
  }
}
