import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Period} from '../../../../common-pages/settings/interfaces';

@Injectable()
export class EducationYearService {

  constructor(private httpClient: HttpClient) {
  }

  public getPeriods(): Observable<{ data: Period[] }> {
    return this.httpClient.get<{ data: Period[] }>('api/period');
  }
}
