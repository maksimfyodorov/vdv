import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PlanHistoryChange, HistoryChange } from './plan-history-changes.types';
import { log } from 'util';
import { map } from 'rxjs/operators';

const STATUS_TRANSLATE = {
  new: 'новое',
  created: 'созданное',
  saved: 'сохраненное',
};


@Injectable({
  providedIn: 'root',
})
export class PlanHistoryChangesService {

  constructor(private http: HttpClient) {
  }

  public getInspectionHistory(uuid: string): Observable<any> {
    return this.http.get(`/api/inspection/${uuid}/history`);
  }

  public getScheduleHistory(uuid: string): Observable<any> {
    return this.http.get(`/api/schedule/${uuid}/history`);
  }

  public getPlanHistory(uuid: string): Observable<any> {
    return this.http.get<any>(`api/plan/${uuid}/history`).pipe(
      map(res => res.result.map(item => {
        item.status_name = STATUS_TRANSLATE[item.status_name] || '-';

        return item;
      }))
    );
  }
}
