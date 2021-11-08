import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PlanHistory, TransferPlan, TransferType } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class EventTableService {

  constructor(
    private http: HttpClient,
  ) { }

  public getPlan(militaryUnitId: number): Observable<TransferPlan[]> {
    return this.http.get<TransferPlan[]>(`/api/tm/military_unit/${militaryUnitId}/plan`);
  }

  public postPlan(militaryUnitId: number, planName: string): Observable<TransferPlan> {
    const plan = {
      name: planName,
    }
    return this.http.post<TransferPlan>(`/api/tm/military_unit/${militaryUnitId}/plan`, plan);
  }

  public deletePlan(planUuid: string): Observable<any>{
    return this.http.delete<any>(`/api/tm/plan/${planUuid}`);
  }

  public getTransferSet(): Observable<TransferType[]>{
    return this.http.get<TransferType[]>(`/api/tm/transfer_set`);
  }

  public getTransferUnit(planUuid: string): Observable<any>{
    return this.http.get<any>(`/api/tm/transfer_set/${planUuid}/transfer_unit`);
  }

  public getPlanHistory(planUuid: string): Observable<PlanHistory[]>{
    return this.http.get<PlanHistory[]>(`/api/tm/plan/${planUuid}/history`);
  }

}
