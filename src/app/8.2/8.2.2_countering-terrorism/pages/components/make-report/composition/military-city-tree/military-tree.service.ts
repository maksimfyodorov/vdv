import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddMilitaryCity, MilitaryCityData } from '../../../../../interfaces/interface';

@Injectable()
export class MilitaryTreeService {

  constructor(private http: HttpClient) { }

  public getAntiterrorGip(militaryUnitId: string): Observable<MilitaryCityData> {
    let params: HttpParams = new HttpParams()
      .append('military_unit_id', militaryUnitId);
    return this.http.get<MilitaryCityData>(`/api/antiterror/gip`, { params })
  }

  public getAntiterrorDistrict(): Observable<MilitaryCityData> {
    return this.http.get<MilitaryCityData>(`/api/antiterror/district`)
  }

  public getGarrison(districtId: number): Observable<MilitaryCityData> {
    let params: HttpParams = new HttpParams()
      .append('district_id', String(districtId));
    return this.http.get<MilitaryCityData>(`/api/antiterror/garrison`, { params })
  }

  public addMilitaryCity(city: AddMilitaryCity): Observable<MilitaryCityData> {
    return this.http.post<MilitaryCityData>(`/api/antiterror/military_station`, city)
  }

}
