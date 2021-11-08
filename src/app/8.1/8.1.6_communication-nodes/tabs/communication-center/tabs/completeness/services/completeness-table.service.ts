import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompletenessService {
  constructor(private httpClient: HttpClient) {}

  getCompletenessHierarchy(uuid: string, date?: Date): Observable<any> {
    let httpParams: HttpParams = new HttpParams();

    if (date) {
      const updDate = new Date(new Date(date).setHours(new Date(date).getHours() + 3)).toISOString();
      httpParams = httpParams.append('date', updDate.split('.')[0]);
    }

    return this.httpClient.get<any>(`api/staffing/bp/${uuid}`, { params: httpParams });
  }

  createNewShdk(divisionId: number, data: any): Observable<any> {
    return this.httpClient.post<any>(`api/shdk/add_new_shdk/${divisionId}`, data);
  }

  deleteShdkRecord(shdkRecordUuid: number): Observable<any> {
    return this.httpClient.delete<any>(`api/shdk/delete_shdk_record/${shdkRecordUuid}`);
  }

  getMilitaryMens(): Observable<any> {
    return this.httpClient.get<any>(`api/military_men`);
  }

  updateMilitaryMan(shdkRecordUuid: number, militaryMen: any): Observable<any> {
    return this.httpClient.post<any>(`api/shdk/add_military_man/${shdkRecordUuid}`, militaryMen);
  }

  changeStatusShdk(shdkRecordUuid: number, status: any): Observable<any> {
    return this.httpClient.patch<any>(`api/shdk/change_status/${shdkRecordUuid}`, status);
  }

  getReportStatus(): Observable<any> {
    return this.httpClient.get<any>(`api/staffing/report/check`);
  }

  generateCompletenessReport(): Observable<any> {
    return this.httpClient.post<any>(`api/staffing/report/create`, {});
  }
}
