import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MilitaryUnit } from '../interfaces/interface';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class MilitaryUnitsService {

  constructor(private httpClient: HttpClient) {
  }

  public getMilitaryUnits(params: {}): Observable<{ count: number, result: MilitaryUnit[] }> {
    const httpParams = new HttpParams({fromObject: params});
    return this.httpClient.get<{ count: number, result: MilitaryUnit[] }>('/api/military_unit', { params: httpParams });
  }
}
