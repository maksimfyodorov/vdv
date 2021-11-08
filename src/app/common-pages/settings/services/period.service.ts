import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Period } from '../interfaces';

@Injectable()
export class PeriodService {

  constructor(private httpClient: HttpClient) {
  }

  public getPeriods(): Observable<{ data: Period[]}> {
    return this.httpClient.get<{ data: Period[]}>('api/period');
  }

  public postPeriod(period: Period): Observable<unknown> {
    return this.httpClient.post('api/period', period);
  }

  public putPeriod(period: Period, uuid: string): Observable<unknown> {
    return this.httpClient.put(`api/period/${uuid}`, period);
  }

  public deletePeriod(periodUuid: Period['uuid']): Observable<unknown> {
    return this.httpClient.delete(`api/period/${periodUuid}`);
  }
}
