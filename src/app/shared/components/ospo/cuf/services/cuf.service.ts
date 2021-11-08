import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Host, CufServer, HostTrigger, Status, CufData } from '../interfaces/interfaces';
import { tap } from 'rxjs/operators';

@Injectable()
export class CufService {

  public statuses: Status[];

  constructor(private http: HttpClient) {
  }

  public getServers(): Observable<{ data: CufServer[] }> {
    return this.http.get<{ data: CufServer[] }>('/api/cuf/server');
  }

  public getHosts(serverId: string): Observable<{ data: Host[] }> {
    return this.http.get<{ data: Host[] }>(`/api/cuf/host?server_id=${serverId}`);
  }

  public getServerTriggers(hostId: number, serverId: string): Observable<{data: HostTrigger[]}> {
    return this.http.get<{data: HostTrigger[]}>(`/api/cuf/trigger?server_id=${serverId}&host_id=${hostId}`);
  }

  public getStatuses(): Observable<{ data: Status[] }> {
    if (!this.statuses) {
      return this.http.get<{ data: Status[] }>('/api/cuf/status').pipe(
        tap(res => this.statuses = res.data));
    } else {
      return of({data: this.statuses});
    }
  }

  public postCufAuto(cufData: CufData): Observable<CufData> {
    return this.http.post<CufData>('/api/cuf/auto', cufData);
  }

  public putCufAuto(cufData: CufData): Observable<any> {
    return this.http.put(`/api/cuf/auto/${cufData.uuid}`, cufData);
  }

  public postCufManual(cufData: CufData): Observable<CufData> {
    return this.http.post<CufData>('/api/cuf/manual', cufData);
  }
}
