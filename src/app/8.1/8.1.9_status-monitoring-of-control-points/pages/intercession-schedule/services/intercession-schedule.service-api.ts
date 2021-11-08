import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from '../types';

@Injectable({
  providedIn: 'root',
})
export class IntercessionScheduleServiceApi {

  constructor(private http: HttpClient) {
  }

  public getPostsByMUid(military_unit_id: number, tiny: boolean): Observable<Post[]> {
    return this.http.get<Post[]>(`api/cc/military_unit/${military_unit_id}/post?tiny=${tiny}`);
  }

  public getMonthByYearAndPostUuid(year: number, postUuid): Observable<any[]> {
    return this.http.get<any[]>(`api/cc/post/${postUuid}/year/${year}/month`);
  }

  public getPostScheduleByMonth(monthUuid: string): Observable<any[]> {
    return this.http.get<any[]>(`api/cc/month/${monthUuid}/schedule`);
  }

  public getShiftsByPostUuid(postUuid: string): Observable<any[]> {
    return this.http.get<any[]>(`api/cc/post/${postUuid}/shift`);
  }

  public getMuByMuId(MUid: string): Observable<any[]> {
    return this.http.get<any[]>(`api/cc/military_unit/${MUid}/military_man`);
  }

  public createSchedule(schedule): Observable<any[]> {
    return this.http.post<any[]>(`api/cc/schedule`, schedule);
  }

}
