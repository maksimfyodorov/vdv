import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pluck } from 'rxjs/operators';
import { CategoryDivision } from '../../../../../types/categories-interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpClient: HttpClient) { }

  public getCategories(): Observable<CategoryDivision[]> {
    return this.httpClient.get<CategoryDivision[]>('api/category_division').pipe(pluck('data'));
  }

  public postNewCategory(data: { name: string; }): Observable<{ name: string }> {
    return this.httpClient.post<{ name: string }>('api/category_division', data);
  }

  public putCategory(category): Observable<unknown> {
    return this.httpClient.put(`api/category_division/${category.uuid}`, {
      name: category['name']
    });
  }

  public deleteCategory(category: CategoryDivision): Observable<unknown> {
    return this.httpClient.delete(`api/category_division/${category.uuid}`);
  }

}
