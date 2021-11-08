import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {EventBasicInfo, EventBasicInfoData, StaffTaskData} from '../types/desant-events.type';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class DesantEventsService {

  constructor(private httpClient: HttpClient,
  ) {
  }

  public getDesantEventsList(params?: HttpParams): Observable<EventBasicInfoData> {
    return this.httpClient.get<EventBasicInfoData>(`/api/event`, {params});
  }

  public deleteDesantEvent(uuid: string): Observable<EventBasicInfo> {
    return this.httpClient.delete<EventBasicInfo>(`/api/event/${uuid}`);
  }

  public getDesantTask(): Observable<StaffTaskData> {
    return this.httpClient.get<StaffTaskData>('/api/landing_task/directory');
  }
}
