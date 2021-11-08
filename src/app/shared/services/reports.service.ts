import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { REPORTS } from '../components/ospo/reports-dialog/reports-dialog/mock-report';
import { Report, ReportTemplate } from '../types/interfaceReport';


@Injectable()
export class ReportService {

  constructor(
    private http: HttpClient,
  ) { }

  public getReports(): Observable<{ total: number, value: Report[] }> {
    return of({ total: 50, value: REPORTS });
  }

  public getTemplates(uuid: string): Observable<ReportTemplate> {
    let params = new HttpParams()
      .set('report_type_uuid', uuid)
    return this.http.get<ReportTemplate>(`/api/antiterror/report-template`, { params });
  }

  public editTemplate(uuid: string, report_type_uuid: string, text: string) {
    let data = {
      report_type_uuid: report_type_uuid,
      text: text
    }
    return this.http.put<ReportTemplate>(`/api/antiterror/report-template${uuid}`, data);
  }
}
