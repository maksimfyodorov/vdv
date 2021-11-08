import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Executive, ExecutiveData} from '../../../interfaces';

@Injectable()

export class ExecutiveService {

  constructor(private httpClient: HttpClient) {
  }

  public getShdk(httpParams: HttpParams): Observable<ExecutiveData> {
    return this.httpClient.get<ExecutiveData>(`/api/get-shdk`, {params: httpParams});
  }
}
