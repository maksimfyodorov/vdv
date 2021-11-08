import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CustomTree } from "../interfaces/custom-tree";
import { Observable } from "rxjs";
import { InformationGroup } from '../../setting-information-group/interfaces';
import { CreateInformationArray } from '../interfaces/actualization';

@Injectable({
  providedIn: 'root'
})
export class SettingsInfArrayService {

  constructor(private http: HttpClient) { }

  getDirectory(): Observable<CustomTree> {
    return this.http.get<CustomTree>('/api/io/connection');
  }

  getGroups(): Observable<InformationGroup[]> {
    return this.http.get<InformationGroup[]>('/api/io/group')
  }

  addArray(informationArray: CreateInformationArray): Observable<any> {
    return this.http.post('/api/io/array', informationArray)
  }

  editArray(informationArray: CreateInformationArray, uuid: string) {
    return this.http.put(`/api/io/array/${uuid}`, informationArray)
  }

}
