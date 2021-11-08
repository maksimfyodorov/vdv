import { CategoryDivisionHierarchy, PutDivisionId } from './../types/category-division-interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CategoryHierarchyService {

  constructor(private httpclient: HttpClient) { }

  public getCategoryHierarchy(id: number): Observable<CategoryDivisionHierarchy[]>{
    return this.httpclient.get<CategoryDivisionHierarchy[]>(`/api/military_unit/${id}/division`);
  }

  public putDivision(data: PutDivisionId, uuid: string): Observable<unknown> {
    return this.httpclient.put(`api/standard_jump/${uuid}/division`, data);
  }
}
