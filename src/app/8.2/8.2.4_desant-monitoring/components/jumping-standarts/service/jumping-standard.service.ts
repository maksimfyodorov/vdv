import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { JumpingStandard, JumpingStandardTable, PostJumpingStandard, PutJumpCount } from '../jumping-standart-interface';
import { Injectable } from '@angular/core';
import { Period } from '../../../../../common-pages/settings/interfaces';
import { CategoryDivision } from '../../../types/categories-interface';

@Injectable({
  providedIn: 'root'
})
export class JumpingStandardService {

  constructor(private httpClient: HttpClient) { }

  public getJumpingStandarts(): Observable<{data: JumpingStandard[]}> {
    return this.httpClient.get<{data: JumpingStandard[]}>('api/standard_jump');
  }

  public getPeriods(): Observable<{ data: Period[]}> {
    return this.httpClient.get<{ data: Period[]}>('api/period');
  }

  public getCategories(): Observable<CategoryDivision[]> {
    return this.httpClient.get<CategoryDivision[]>('api/category_division').pipe(pluck('data'));
  }

  public postJumpingStandarts(data: PostJumpingStandard): Observable<JumpingStandard> {
    return this.httpClient.post<JumpingStandard>('api/standard_jump', data);
  }
  public putJumpCount(data: PutJumpCount): Observable<JumpingStandardTable> {
    return this.httpClient.put<JumpingStandardTable>(`api/standard_jump/${data.uuid}`, {
      norm_jump: data['jump_count']
    });
  }
}


