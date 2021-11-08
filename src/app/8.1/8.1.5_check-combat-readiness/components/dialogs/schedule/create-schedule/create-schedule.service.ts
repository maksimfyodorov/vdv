import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateScheduleService {

  constructor(private http: HttpClient) { }

  public createSchedule(data): Observable<any> {
    return this.http.post('/api/schedule', data);
  }

  public getAvailableSchedules(): Observable<any> {
    return this.http.get('/api/available_schedule');
  }
}
