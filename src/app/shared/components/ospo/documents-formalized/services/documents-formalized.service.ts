import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { ATTACHED_DOCUMENTS, DOCUMENTS } from '../mock';
import { FormalizedDocument } from '../interfaces/document-formalized.interfaces';
import { Document } from '../../documents/documents.types';
import { MilitaryMen } from '@app/shared/components/military/interfaces';
import { Periods } from '@app/shared/components/ospo/documents-formalized/components/document-dialog/components/document-settings/document-settings.constants';
import { MilitaryUnit } from '@app/shared/components/ospo/military-units/military-units-dropdown/interfaces';

@Injectable()
export class DocumentsFormalizedService {

  public set actionType(actionType: string) {
    this._actionType.next(actionType);
  }

  public get actionType$(): Observable<string> {
    return this._actionType.asObservable();
  }

  public currentGroupName: string;
  public documents: FormalizedDocument[];
  public currentDocument: FormalizedDocument;
  public printExecutor;
  public periods: Periods[];
  public military_units: MilitaryUnit[];
  public signers: MilitaryMen[];
  public approvers: MilitaryMen[];
  public coordinators: MilitaryMen[];
  public _actionType = new Subject<string>();

  constructor() {
  }

  public getDocuments(groupName: string): Observable<FormalizedDocument[]> {
    return of(DOCUMENTS[groupName]);
  }

  public getAttachedDocuments(groupName: string): Observable<Document[]> {
    return of(ATTACHED_DOCUMENTS);
  }
}
