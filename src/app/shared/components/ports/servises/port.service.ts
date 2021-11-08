import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PORTS } from '../Mock';
import { Port } from '../interfaces';

@Injectable()
export class PortService {

  constructor(private http: HttpClient) { }

  public getPorts(): Observable<Port[]> {
    return of(PORTS);
  }

  public postPort(port: Port): Observable<unknown> {
    console.log('port was added');
    return of();
  }

  public patchPort(port: Port): Observable<Port> {
    console.log('port was patched');
    return of();
  }

  public deletePort(port: Port): Observable<unknown> {
    return of(port.uuid);
  }


}
