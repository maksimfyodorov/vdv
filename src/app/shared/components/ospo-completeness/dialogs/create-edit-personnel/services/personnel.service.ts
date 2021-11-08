import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class PersonnelService {
  constructor(private httpClient: HttpClient) {}

  getStaffingSelectors(): Observable<any> {
    return this.httpClient.get<any>(`api/staffing_selectors`);
  }
}
