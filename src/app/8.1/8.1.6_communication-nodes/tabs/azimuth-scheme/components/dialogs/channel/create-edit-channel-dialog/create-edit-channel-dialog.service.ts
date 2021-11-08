import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChannelType } from '../../../nodes-scheme/nodes.scheme.types';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CreateEditChannelDialogService {

  constructor(private http: HttpClient) { }

  public getChannelTypes(): Observable<any> {
    return this.http.get('/api/channel_type');
  }

  public createChannelType(type: string): Observable<any> {
    return this.http.post('/api/channel_type', {name: type});
  }

  public editChannelType(uuid: string, newName: string): Observable<any> {
    return this.http.patch(`/api/channel_type/${uuid}`, {name: newName});
  }

  public deleteChannelType(type: ChannelType): Observable<any> {
    return this.http.delete(`/api/channel_type/${type.uuid}`);
  }
}
