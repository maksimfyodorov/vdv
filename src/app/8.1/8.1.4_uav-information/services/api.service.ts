import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Period } from '../components/flight-plans/types/period';
import { Plan } from '../components/flight-plans/types/plan';
import { UavSelectionHierarchy } from '../components/uav-node-folder/types/uav-selection-hierarchy';
import { Bpla, FullTask, Task, TaskPreview } from '../components/flight-plans/types/tasks';
import { Document } from '../../../shared/components/ospo/documents/attach-document-dialog/attach-document-dialog.types';

@Injectable()
export class HttpApiService {

  constructor(
    private http: HttpClient
  ) {}

  public getFlightPlanPeriods(): Observable<{data: Period[]}> {
    return this.http.get<{data: Period[]}>('api/period');
  }

  public getFlightPlanContentByPeriod(period: string, selectMilitaryId: number): Observable<Plan> {
    return this.http.get<Plan>(`api/military_unit/${selectMilitaryId}/plan/${period}`);
  }

  public deletePlan(uuid: string): Observable<Plan> {
    return this.http.delete<Plan>(`api/plan/${uuid}`);
  }

  public getSelectionTree(): Observable<UavSelectionHierarchy[]> {
    return this.http.get<UavSelectionHierarchy[]>(`api/military_unit`);
  }

  public createPlan(periodUuid: string, selectHierarchyId: number): Observable<Plan> {
    return this.http.post<Plan>(`api/military_unit/${selectHierarchyId}/plan/${periodUuid}`, {});
  }

  public getMilitaryUnitTasks(militaryUnitId: number, params: any): Observable<TaskPreview> {
    const requestParams = new HttpParams({fromObject: params});

    return this.http.get<TaskPreview>(`api/military_unit/${militaryUnitId}/task`, {params: requestParams});
  }

  public changePlanStatusOnSave(uuid: string): Observable<Plan> {
    return this.http.patch<Plan>(`api/plan/${uuid}`, {status: 'save'});
  }

  public getMilitaryUnitTasksByPlan(planId: string, params: any): Observable<TaskPreview> {
    const requestParams = new HttpParams({fromObject: params});

    return this.http.get<TaskPreview>(`api/plan/${planId}/task`, {params: requestParams});
  }

  public createTask(value: FullTask): Observable<Task> {
    return this.http.post<Task>(`api/task`, value);
  }

  public getTaskData(uuid: string): Observable<any> {
    return this.http.get<any>(`api/task/${uuid}`);
  }

  public editTask(uuid: string, value: any): Observable<any> {
    return this.http.put<any>(`api/task/${uuid}`, value);
  }

  public getFilteredTasksByPlan(planId: string, params: any): Observable<any> {
    const requestParams = new HttpParams({fromObject: params});

    return this.http.get<TaskPreview>(`api/plan/${planId}/task`, {params: requestParams});
  }

  public completeTask(uuid: string): Observable<Task> {
    return this.http.patch<Task>(`api/task/${uuid}/completed`, {});
  }

  public reportNonCompliance(uuid: string): Observable<Task> {
    return this.http.patch<Task>(`api/task/${ uuid }/not_completed`, {})
  }

  public deleteTask(uuid: string): Observable<Task> {
    return this.http.delete<Task>(`api/task/${uuid}`);
  }

  public getOperators(): Observable<any> {
    return this.http.get('api/operator');
  }

  public getUav(militaryUnitId: number): Observable<{bpla: Bpla[]}> {
    return this.http.get<{bpla: Bpla[]}>(`api/military_unit/${militaryUnitId}/bpla_fixation`);
  }

  public printTask(taskUuid: string): Observable<Blob> {
    return this.http.get(`api/task/${taskUuid}/report`, {responseType: 'blob'});
  }

  public getDivision(militaryUnit: { uuid: number }): Observable<unknown> {
    return this.http.get<unknown>(`api/military_unit/${militaryUnit.uuid}/division`);
  }

  public getPlanDocuments(uuid: string): Observable<{documents: Document[]}> {
    return this.http.get<{documents: Document[]}>(`api/plan/${uuid}/document`);
  }

  public attachDocumentsToPlan(uuid: string, documents: {documents_uuid: string[]}): Observable<{documents: Document[]}> {
    return this.http.put<{documents: Document[]}>(`api/plan/${uuid}/document`, documents);
  }

  public getBplaCondition(uuid: number, httpParams: HttpParams): Observable<any> {
    return this.http.get<any>(`api/military_unit/${uuid}/bpla_condition`, { params: httpParams });
  }

  public changePlanStatusOnDelete(uuid: string): Observable<Plan> {
    return this.http.patch<Plan>(`api/plan/${uuid}`, {status: 'delete'});
  }
}
