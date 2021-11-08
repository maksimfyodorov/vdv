import { Injectable } from '@angular/core';
import { Decision } from '../types/decision.types';
import { Observable } from 'rxjs';
import { HttpApiService } from './api.service';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class AddDecisionDialogService {

  constructor(
    private apiService: HttpApiService,
  ) { }

  public addDecision(decision: Decision, orderUuid: string): Observable<Decision> {
    return this.apiService.addDecision(decision, orderUuid)
  }

  public editDecision(orderUuid: string, decisionUuid: string, requestBody: Decision): Observable<Decision> {
    return this.apiService.editDecision(orderUuid, decisionUuid, requestBody).pipe(
      mergeMap(_ => this.getDecision(orderUuid, decisionUuid))
    );
  }

  private getDecision(orderUuid: string, decisionUuid: string): Observable<Decision> {
    return this.apiService.getDecision(orderUuid, decisionUuid)
  }

  public reportOnSuccess(orderUuid: string, decisionUuid: string, requestBody: Decision, mode: {status: string}): Observable<Decision> {
    return this.apiService.editDecision(orderUuid, decisionUuid, requestBody).pipe(
      mergeMap(_ => this.changeDecisionStatus(orderUuid, decisionUuid, mode)),
      mergeMap(_ => this.getDecision(orderUuid, decisionUuid))
    )
  }

  public reportOnFailure(orderUuid: string, decisionUuid: string, requestBody: Decision, mode: {status: string}): Observable<Decision> {
    return this.apiService.editDecision(orderUuid, decisionUuid, requestBody).pipe(
      mergeMap(_ => this.changeDecisionStatus(orderUuid, decisionUuid, mode)),
      mergeMap(_ => this.getDecision(orderUuid, decisionUuid))
    )
  }

  private changeDecisionStatus(orderUuid: string, decisionUuid: string, mode: {status: string}): Observable<void> {
    return this.apiService.changeDecisionStatus(orderUuid, decisionUuid, mode);
  }
}
