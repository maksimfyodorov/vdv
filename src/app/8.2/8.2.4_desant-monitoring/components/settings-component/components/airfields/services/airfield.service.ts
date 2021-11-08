import { Airfield, PostAirfield, PutAirfield } from './../../../../../types/airfield';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AirfieldService {

  constructor(private httpClient: HttpClient ) { }

  public getAirfields(): Observable<Airfield[]> {
    return this.httpClient.get<Airfield[]>('api/aerodrome/directory').pipe(pluck('data'));
  }

  public putAirfield(airfield: PutAirfield): Observable<unknown> {
    return this.httpClient.put(`api/aerodrome/directory/${airfield.uuid}`, {
      name: airfield['name'],
      coordinates_uuid: airfield['coordinates.uuid'],
    });
  }

  public deleteAirfield(airfield: Airfield): Observable<unknown> {
    return this.httpClient.delete(`api/aerodrome/directory/${airfield.uuid}`);
  }

  public addNewAirfield(data: PostAirfield): Observable<unknown> {
    return this.httpClient.post<PostAirfield>('api/aerodrome/directory', data);
  }
}
