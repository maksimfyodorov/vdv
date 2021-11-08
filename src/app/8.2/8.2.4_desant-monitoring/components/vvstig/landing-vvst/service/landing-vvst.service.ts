import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LandingVvstService {

  constructor(private httpClient: HttpClient) { }

  public getDivisionByMilitaryUnit(id: number): Observable<unknown> {
    return this.httpClient.get<unknown>(`/api/military_unit/${id}/division`);
    }

}
