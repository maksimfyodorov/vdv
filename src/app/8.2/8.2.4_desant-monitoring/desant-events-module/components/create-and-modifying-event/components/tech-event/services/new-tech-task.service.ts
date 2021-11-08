import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AirdromeData, StaffTask} from '../../../../../types/desant-events.type';
import {CompletingTableData, DocumentData, JumpStatesData} from '../../../types/new-desant-event-dialog.types';
import {AircraftData} from '../../../../../../types/aircraftInterface';
import {Document} from '../../../../../../../../shared/components/ospo/documents/documents.types';

@Injectable()
export class NewTechTaskService {

  constructor(private httpClient: HttpClient) {
  }

  public createNewStaffTask(params: HttpParams): Observable<StaffTask> {
    return this.httpClient.post<StaffTask>(`/api/landing_task_ls`, params);
  }
  public getCompletingInfo(params?: HttpParams): Observable<CompletingTableData> {
    return this.httpClient.get<CompletingTableData>('/api/completing', {params});
  }
  public deleteCompleting(uuid: string): Observable<any> {
    return this.httpClient.delete(`/api/completing/${uuid}`);
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
  public getStaffTaskFullInfo(uuid: string): Observable<StaffTask> {
    return this.httpClient.get<StaffTask>(`/api/landing_task_ls/${uuid}`);
  }
  public changeStaffTask(uuid: string, params?: HttpParams): Observable<StaffTask> {
    return this.httpClient.put<StaffTask>(`/api/landing_task_ls/${uuid}`, params);
  }
  public putTaskDocuments(uuid: string, params): Observable<Document[]> {
    return this.httpClient.put<Document[]>(`/api/landing_task_ls/${uuid}/document`, params);
  }
  public getTaskDocuments(uuid: string): Observable<DocumentData> {
    return this.httpClient.get<DocumentData>(`/api/landing_task_ls/${uuid}/document`);
  }

}
