import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UavSelectionHierarchy } from '../../8.1.4_uav-information/components/uav-node-folder/types/uav-selection-hierarchy';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SMOCPApiService {

  constructor(
    private http: HttpClient
  ) {}


  public getSelectionTree(): Observable<UavSelectionHierarchy[]> {
    return this.http.get<UavSelectionHierarchy[]>(`api/military_unit`);
  }
}
