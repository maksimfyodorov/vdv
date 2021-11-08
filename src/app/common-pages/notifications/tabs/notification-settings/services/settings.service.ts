import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Irz, User } from '../interfaces/interfaces';

@Injectable()
export class SettingsService {

  constructor(private httpClient: HttpClient) {
  }

  public getUsers(params: HttpParams): Observable<{ result: User[] }> {
    return this.httpClient.get<{ result: User[] }>(`api/notifications/settings/users`, { params });
  }

  public getSettings(userUuid: string): Observable<{ result: Irz[] }> {
    return this.httpClient.get<{ result: Irz[] }>(`api/notifications/settings?user_id=${userUuid}`);
  }

  public patchSettings(data, userUuid: string): Observable<unknown> {
    return this.httpClient.patch(`api/notifications/settings?user_id=${userUuid}`, data);
  }
}
