import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  public socket: any;
  readonly url: string = 'api/';

  public connected = false;
  public monitoringActive = false;

  constructor() {
  }

  public listen(eventName: string): Observable<any> {
    return new Observable(subscriber => {
      this.socket.on(eventName, data => {
        subscriber.next(data);
      });
    });
  }

  public emit(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
  }
}

