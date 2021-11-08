import { AircraftType, PostAircraft, PutAircraft } from './../../../../../types/aircraftInterface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aircraft } from '../../../../../types/aircraftInterface';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AircraftService {

  constructor(private httpClient: HttpClient) { }

  public getAircrafts(): Observable<Aircraft[]> {
    return this.httpClient.get<Aircraft[]>('api/aircraft/directory').pipe(pluck('data'));
  }

  public getAircraftType(): Observable< AircraftType[]> {
    return this.httpClient.get<AircraftType[]>('api/aircraft/directory_type').pipe(pluck('data'));
  }

  public submitForm(data: PostAircraft): Observable<PostAircraft> {
    return this.httpClient.post<PostAircraft>('api/aircraft/directory', data);
  }

  public putAircraft(aircraft: PutAircraft): Observable<unknown> {
    return this.httpClient.put(`api/aircraft/directory/${aircraft.uuid}`, {
      type_uuid: aircraft['type_uuid'],
      name: aircraft['name'],
      capacity_vvst: aircraft['capacity_vvst'],
      capacity_ls: aircraft['capacity_ls']
    });
  }

  public deleteAircraft(aircraft: Aircraft): Observable<unknown> {
    return this.httpClient.delete(`api/aircraft/directory/${aircraft.uuid}`);
  }
}



