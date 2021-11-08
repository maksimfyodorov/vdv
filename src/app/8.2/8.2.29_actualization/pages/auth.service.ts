import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { SharedProperty, Server } from "./auth";
import { AllArrays, CreateInformationArray } from '../components/dialogs/settings-information-array/interfaces/actualization';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getServerType(): Observable<SharedProperty[]> {
    return this.http.get<SharedProperty[]>('/api/io/server_type');
  }

  getServers(serverType: SharedProperty): Observable<Server[]> {
    return this.http.get<Server[]>(`/api/io/type/${serverType.uuid}/server`);
  }

  connect(obj): Observable<any> {
    return this.http.post<any>('/api/io/connection', obj);
  }

  disconnect(): Observable<any> {
    return this.http.delete<any>('/api/io/connection');
  }

  getArray(search: string = null, limit: number = 8, offset: number = 0): Observable<AllArrays> {
    if (search) {
      let params = new HttpParams()
        .set('search', search.toString())
        .set('limit', limit.toString())
        .set('offset', offset.toString())
      return this.http.get<AllArrays>('/api/io/array', { params });
    }
    else {
      let params = new HttpParams()
        .set('limit', limit.toString())
        .set('offset', offset.toString())
      return this.http.get<AllArrays>('/api/io/array', { params });
    }
  }

  deleteArray(uuid: string): Observable<string> {
    return this.http.delete<string>(`/api/io/array/${uuid}`);
  }

  getSingleArr(id: string): Observable<CreateInformationArray> {
    return this.http.get<CreateInformationArray>(`/api/io/array/${id}`);
  }

  editServer(uuid: string, server_type_uuid: string, obj) {
    return this.http.put<any>(`/api/io/type/${server_type_uuid}/server/${uuid}`, obj);
  }

  addServer(server_type_uuid: string, obj) {
    return this.http.post<any>(`/api/io/type/${server_type_uuid}/server`, obj);
  }

  deleteServer(uuid: string, servType) {
    return this.http.delete<any>(`/api/io/type/${servType}/server/${uuid}`);
  }
}
