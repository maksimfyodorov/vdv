import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Post, BackendResponsePost, UserInfo } from '../types/setting';
import { mapBackendData, mapFrontendData} from './map-setting-section-data';

@Injectable({
  providedIn: 'root',
})

export class SettingSectionService {
  constructor(
    private http: HttpClient
  ) {}

  public getPosts(militaryUnitId): Observable<Post[]> {
    return this.http.get<BackendResponsePost[]>(`/api/cc/military_unit/${militaryUnitId}/post`)
      .pipe(map((posts) => {
        return posts.map(mapBackendData);
    }));
  }

  public addPost(postParams: Post): Observable<Post> {
    const backendPostParams: BackendResponsePost = mapFrontendData(postParams);

    return this.http.post<BackendResponsePost>('api/cc/post', backendPostParams)
      .pipe(map(mapBackendData));
  }

  public updatePost(uuid: string, postParams: Post): Observable<Post> {
    const backendPostParams: BackendResponsePost = mapFrontendData(postParams);

    return this.http.put<BackendResponsePost>(`api/cc/post/${uuid}`, backendPostParams)
      .pipe(map(mapBackendData));
  }

  public deletePost(uuid: string): Observable<any> {
    return this.http.delete(`api/cc/post/${uuid}`);
  }

  public getUserInfo(): Observable<UserInfo> {
    return this.http.get<UserInfo>('api/users/self');
  }
}
