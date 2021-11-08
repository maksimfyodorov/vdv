import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { GeneralInformation } from '../../interfaces/generalInformation';
import { AddSummary, BCHS, BchsGroup, FilterTable, GetStaff, PostVvst, Report, ReportData, ReportRecords, Staff, Summary, SummaryRequest, TextTemplate, VvstBchs } from '../../interfaces/interface';

@Injectable()
export class CounterListService {

  public report = new BehaviorSubject<any>(null)
  private querySubscription: Subscription;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
  ) { }

  public getQueryId(): string {
    let id: string
    this.querySubscription = this.route.queryParams.subscribe(
      (queryParam: Params) => {
        id = queryParam['uuid'];
      }
    );
    return id
  }

  public getQueryMilitaryItemId(): string {
    let militaryItemId: string
    this.querySubscription = this.route.queryParams.subscribe(
      (queryParam: Params) => {
        militaryItemId = queryParam['militaryItem'];
      }
    )
    return militaryItemId
  }

  public getSummary(pageParams: any, filter: FilterTable): Observable<SummaryRequest> {
    const params = new HttpParams({ fromObject: { ...pageParams, ...filter } })

    return this.http.get<SummaryRequest>(`/api/antiterror/summary`, { params });
  }

  public createSummary(summary: AddSummary): Observable<Summary> {
    return this.http.post<Summary>(`/api/antiterror/summary`, summary);
  }

  public deleteSummary(summaryUuid: string) {
    return this.http.delete(`/api/antiterror/summary/${summaryUuid}`);
  }

  public addDocument(summaryUuid: string, documentUuid: string) {
    const body = {
      uuid: documentUuid,
    }
    return this.http.post(`/api/antiterror/summary/${summaryUuid}/document`, body);
  }

  public getDocuments(summaryUuid: string) {
    return this.http.get<any>(`/api/antiterror/summary/${summaryUuid}/document`);
  }

  public deleteDocument(summaryUuid: string, documentUuid: string) {
    return this.http.delete(`/api/antiterror/summary/${summaryUuid}/document/${documentUuid}`);
  }

  public getControlPoints(): Observable<BchsGroup> {
    return this.http.get<BchsGroup>(`/api/antiterror/control_point`);
  }

  public editControlPoint(uuid: string, name: any) {
    const controlPoint = {
      name: name
    }
    return this.http.put(`/api/antiterror/control_point/${uuid}`, controlPoint);
  }

  public createControlPoint(controlPoint: any) {
    return this.http.post(`/api/antiterror/control_point`, controlPoint);
  }

  public deleteControlPoint(uuid: string) {
    return this.http.delete(`/api/antiterror/control_point/${uuid}`);
  }

  public createReport(body: GeneralInformation) {
    return this.http.post<any>(`/api/antiterror/report`, body);
  }

  public editReport(uuid: string, body: GeneralInformation) {
    return this.http.put<GeneralInformation>(`/api/antiterror/report/${uuid}`, body);
  }

  public httpReport(uuid: string): Observable<any> {
    return this.http.get<any>(`/api/antiterror/report/${uuid}`)
  }

  public getReport(): Observable<any> {
    return this.report.asObservable();
  }

  public getObjectCategory() {
    return this.http.get<any>(`/api/antiterror/object_category`);
  }

  public addObjectCategory(name: string) {
    const objectCategory = {
      name: name,
    }
    return this.http.post(`/api/antiterror/object_category`, objectCategory);
  }

  public deleteObjectCategory(uuid) {
    return this.http.delete(`/api/antiterror/object_category/${uuid}`);
  }

  public editObjectCategory(name: string, uuid: string) {
    const objectCategory = {
      name: name
    }
    return this.http.put(`/api/antiterror/object_category/${uuid}`, objectCategory);
  }

  public makeBCHS(categoryUuid: string, militaryStationUuid: string, reportUuid: string): Observable<BCHS> {
    const bchsObject = {
      object_category_uuid: categoryUuid,
      military_station_uuid: militaryStationUuid,
      report_uuid: reportUuid
    }
    return this.http.post<BCHS>(`/api/antiterror/bchs`, bchsObject);
  }

  public getBCHS() {
    return this.http.get(`/api/antiterror/bchs`);
  }

  public deleteBCHS(uuid: string) {
    return this.http.delete(`/api/antiterror/bchs/${uuid}`);
  }

  public putBCHS(uuid: string, bchsObject) {
    return this.http.put(`/api/antiterror/bchs/${uuid}`, bchsObject);
  }

  public getReportType(): Observable<Report> {
    return this.http.get<Report>(`/api/antiterror/report-type`);
  }

  public postReportRecord(reportData: ReportData) {
    return this.http.post(`/api/antiterror/report-record`, reportData);
  }

  public getReportRecord(uuid: string): Observable<ReportRecords> {
    const params = new HttpParams()
      .set('report_uuid', uuid)
    return this.http.get<ReportRecords>(`/api/antiterror/report-record`, { params });
  }

  public postReportTemplate(reportTemplate: TextTemplate) {
    return this.http.post(`/api/antiterror/report-template`, reportTemplate);
  }

  public postExecutiveStaff(reportUuid: string, text: string) {
    const staff: Staff = {
      report_uuid: reportUuid,
      any_text: text,
    }
    return this.http.post(`/api/antiterror/executive_staff`, staff);
  }

  public getExecutiveStaff(reportUuid: string): Observable<GetStaff> {
    const params = new HttpParams()
      .set('report_uuid', reportUuid)
    return this.http.get<GetStaff>(`/api/antiterror/executive_staff`, { params });
  }

  public getSummaryData(uuid: string): Observable<Summary> {
    return this.http.get<Summary>(`/api/antiterror/summary/${uuid}`);
  }

  public postVvstAmplification(vvst_uuids: string[], amplification_object_uuid: string, bchs_uuid: string) {
    let vvst: PostVvst = {
      vvst_uuids: vvst_uuids,
      amplification_object_uuid: amplification_object_uuid,
      bchs_uuid: bchs_uuid,
    }
    return this.http.post<any>(`/api/antiterror/vvst_bchs`, vvst);
  }

  public postVvst(vvst_uuids: string[], bchs_group_uuid: string, bchs_uuid: string) {
    let vvst: PostVvst = {
      vvst_uuids: vvst_uuids,
      bchs_group_uuid: bchs_group_uuid,
      bchs_uuid: bchs_uuid,
    }
    return this.http.post<any>(`/api/antiterror/vvst_bchs`, vvst);
  }

  public getVvst(bchs_group_uuid: string, bchs_uuid: string, mode: string): Observable<VvstBchs> {
    const params = new HttpParams()
      .set('bchs_uuid', bchs_uuid)
      .set('bchs_group_uuid', bchs_group_uuid)
      .set('vvst_sample_type', mode)
    return this.http.get<VvstBchs>(`/api/antiterror/vvst_bchs`, { params });
  }

  public getVvstAmplification(amplification_object_uuid: string, bchs_uuid: string, mode: string): Observable<VvstBchs> {
    const params = new HttpParams()
      .set('bchs_uuid', bchs_uuid)
      .set('amplification_object_uuid', amplification_object_uuid)
      .set('vvst_sample_type', mode)
    return this.http.get<VvstBchs>(`/api/antiterror/amplification/vvst`, { params });
  }

  public changeSummaryStatus(summaryUuid: string, statusUuid: string): Observable<any> {
    const body = {
      status_uuid: statusUuid,
    }
    return this.http.put(`/api/antiterror/summary/status/${summaryUuid}`, body);
  }

  public addChildReport(summaryUuid: string, parentUuid: string): Observable<any> {
    const body = {
      summary_uuid: summaryUuid,
      parent_uuid: parentUuid,
    }
    return this.http.post<any>(`/api/antiterror/report`, body);
  }

}
