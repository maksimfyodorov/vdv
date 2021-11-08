import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpApiService } from '../../../services/api.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class UavStateService {

  constructor(
    private apiService: HttpApiService,
  ) { }

  public getBplaCondition(uuid: number, date?: string, tech_mode?: boolean): Observable<any> {
    let httpParams: HttpParams = new HttpParams();

    if (date) {
      const updDate = new Date(new Date(date).setHours(new Date(date).getHours() + 3)).toISOString();
      httpParams = httpParams.append('date', updDate.split('.')[0]);
    }

    if (tech_mode) {
      httpParams = httpParams.append('tech_mode', '1');
    }

    return this.apiService.getBplaCondition(uuid, httpParams);
  }
}
