import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Period } from '../../../../../../common-pages/settings/interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class YearsService {

  constructor(private httpClient: HttpClient) { }

  public getPeriods(): Observable<{ data: Period[]}> {
    return this.httpClient.get<{ data: Period[]}>('api/period');
  }
}
