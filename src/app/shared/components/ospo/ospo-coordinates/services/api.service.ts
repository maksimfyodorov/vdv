import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MarkResponse } from '../types/mark';
import { MarkTypeResponse } from '../types/mark-type';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
  ) {}

  public getMarks(): Observable<MarkResponse> {
    return this.http.get<MarkResponse>('/api/coordinates/coordinate');
  }

  public postMark(data): Observable<unknown> {
    return this.http.post('/api/coordinates/coordinate', data);
  }

  public deleteMark(uuid: string): Observable<unknown> {
    return this.http.delete(`/api/coordinates/coordinate/${uuid}`);
  }

  public getTypes(): Observable<MarkTypeResponse> {
    return this.http.get<MarkTypeResponse>('/api/coordinates/type');
  }
}
