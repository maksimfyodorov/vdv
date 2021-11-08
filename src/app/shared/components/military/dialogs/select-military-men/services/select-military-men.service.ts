import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BackendPaginationResponse, MilitaryMan } from './select-military-dialog.types';

@Injectable()
export class SelectMilitaryMenService {
  constructor(private httpClient: HttpClient) {}

  public getMilitaries(httpParams: HttpParams): Observable<BackendPaginationResponse<MilitaryMan[]>> {
    return this.httpClient.get<BackendPaginationResponse<MilitaryMan[]>>(`/api/military_men`, { params: httpParams });
  }
}
