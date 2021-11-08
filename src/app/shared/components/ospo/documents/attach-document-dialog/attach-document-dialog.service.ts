import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocumentPreview, NewType } from './attach-document-dialog.types';
import { Check } from '../../../../../8.2/8.2.29_actualization/components/dialogs/settings-information-array/interfaces/check';

@Injectable()
export class AttachDocumentDialogService {

  constructor(private http: HttpClient) { }

  public getDocuments(params?: HttpParams): Observable<any> {
    return this.http.get('/api/documents', { params });
  }

  public getDocument(id: string): Observable<DocumentPreview> {
    return this.http.get<DocumentPreview>(`/api/documents/${id}`);
  }

  public postDocument(body): Observable<any> {
    return this.http.post('/api/documents', body);
  }

  public patchDocument(id, body): Observable<any> {
    return this.http.patch(`/api/documents/${id}`, body);
  }

  public deleteDocument(id): Observable<any> {
    return this.http.delete(`/api/documents/${id}`);
  }

  public getKinds(): Observable<any> {
    return this.http.get('/api/document_kinds');
  }

  public getTypes(params: HttpParams): Observable<any> {
    return this.http.get('/api/document_types', { params });
  }

  public getGroups(): Observable<any> {
    return this.http.get('/api/document_groups');
  }

  public createType(body: NewType): Observable<any> {
    return this.http.post('/api/document_types', body);
  }

  public patchType(id: string, body: { name: string }): Observable<any> {
    return this.http.patch(`/api/document_types/${id}`, body);
  }

  public deleteType(id: string): Observable<any> {
    return this.http.delete(`/api/document_types/${id}`);
  }

  public getMilitaryUnitsByCommonName(name: string): Observable<any> {
    return this.http.get(`/api/document_military_units?common_number_name=${name}`);
  }

  public getMilitaryUnitByID(id: number): Observable<any> {
    return this.http.get(`/api/document_military_units/${id}`);
  }

  public postRegulation(uuid: any): Observable<any> {
    return this.http.post(`/api/io/regulation`, uuid);
  }

  public postCheck(arr: string[]): Observable<any> {
    return this.http.post(`/api/io/check`, arr);
  }

  public getCheck(): Observable<any> {
    return this.http.get(`/api/io/check`);
  }

  public deleteCheck(item: Check): Observable<any> {
    return this.http.delete(`/api/io/check/${item.uuid}`);
  }

}

