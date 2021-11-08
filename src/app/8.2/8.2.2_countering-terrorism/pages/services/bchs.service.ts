import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AmplificationCreation, AntiterrorUnit, BCHS, BCHSData, BchsGroup, BchsTime, DataSHDK, FormGroupValue, Mode, VvstSample } from '../../interfaces/interface';

@Injectable()
export class BchsService {

  constructor(
    private http: HttpClient,
  ) { }

  public setStrengthGarrison(bchsUuid: string, body: FormGroupValue) {
    const obj = this.returnObject(body.value.strengthGarrison);
  }

  public returnObject(data: AntiterrorUnit): AntiterrorUnit {
    let autoTransportUuid
    if (data?.autoTransport) {
      autoTransportUuid = data?.autoTransport.map(item => {
        return item.node.uuid
      })
      autoTransportUuid = autoTransportUuid.join(',')
    }
    let armoredTransportUuid
    if (data?.armoredTransport) {
      armoredTransportUuid = data?.armoredTransport.map(item => {
        return item.node.uuid
      })
      armoredTransportUuid = armoredTransportUuid.join(',')
    }

    const antiterrorUnit: AntiterrorUnit = {
      soldiers: null,
      work_time: data.work_time,
      not_work_time: data.not_work_time,
      autoTransport: autoTransportUuid,
      armoredTransport: armoredTransportUuid,
    }

    return antiterrorUnit
  }

  public getBchsGroup(): Observable<BchsGroup> {
    return this.http.get<BchsGroup>(`/api/antiterror/bchs_group`);
  }

  public setNotWorkTime(groupUuid: string, time: string, bchsUuid: string) {
    const notWorkTimeData: BchsTime = {
      bchs_group_uuid: groupUuid,
      not_work_time: time,
    }
    return this.http.post(`/api/antiterror/bchs/${bchsUuid}/not_work_time`, notWorkTimeData);
  }

  public setWorkTime(groupUuid: string, time: string, bchsUuid: string) {
    const workTimeData: BchsTime = {
      bchs_group_uuid: groupUuid,
      work_time: time,
    }
    return this.http.post(`/api/antiterror/bchs/${bchsUuid}/work_time`, workTimeData);
  }

  public setNotWorkTimeAmplification(amplificationUuid: string, time: string, bchsUuid: string) {
    const notWorkTimeData: BchsTime = {
      amplification_object_uuid: amplificationUuid,
      not_work_time: time,
    }
    return this.http.post(`/api/antiterror/amplification/${bchsUuid}/not_work_time`, notWorkTimeData);
  }

  public setWorkTimeAmplification(amplificationUuid: string, time: string, bchsUuid: string) {
    const workTimeData: BchsTime = {
      amplification_object_uuid: amplificationUuid,
      work_time: time,
    }
    return this.http.post(`/api/antiterror/amplification/${bchsUuid}/work_time`, workTimeData);
  }

  public getFixtions(militaryItemId: string): Observable<VvstSample[]> {
    return this.http.get<VvstSample[]>(`/api/fixations/${militaryItemId}`);
  }

  public postShdk(bchsGroupUuid: string, shdkUuids: string[], bchsUuid: string) {
    const shdk = {
      bchs_uuid: bchsUuid,
      bchs_group_uuid: bchsGroupUuid,
      shdk_uuids: shdkUuids,
    }
    return this.http.post(`/api/antiterror/shdk/group`, shdk);
  }

  public postModeAB(bchsGroupUuid: string, shdkUuids: string[], bchsUuid: string) {
    const shdk = {
      bchs_uuid: bchsUuid,
      bchs_group_uuid: bchsGroupUuid,
      shdk_uuids: shdkUuids,
    }
    return this.http.post(`/api/antiterror/shdk/mode_ab`, shdk);
  }

  public postModeV(bchsGroupUuid: string, shdkUuids: string[], bchsUuid: string) {
    const shdk = {
      bchs_uuid: bchsUuid,
      bchs_group_uuid: bchsGroupUuid,
      shdk_uuids: shdkUuids,
    }
    return this.http.post(`/api/antiterror/shdk/mode_v`, shdk);
  }

  public getModeAB(bchsGroupUuid: string, bchsUuid: string): Observable<DataSHDK> {
    const params = new HttpParams()
      .set('bchs_uuid', bchsUuid.toString())
      .set('bchs_group_uuid', bchsGroupUuid.toString())
    return this.http.get<DataSHDK>(`/api/antiterror/shdk/mode_ab`, { params });
  }

  public getModeV(bchsGroupUuid: string, bchsUuid: string): Observable<DataSHDK> {
    const params = new HttpParams()
      .set('bchs_uuid', bchsUuid.toString())
      .set('bchs_group_uuid', bchsGroupUuid.toString())
    return this.http.get<DataSHDK>(`/api/antiterror/shdk/mode_v`, { params });
  }

  public getShdk(bchsGroupUuid: string, bchsUuid: string): Observable<DataSHDK> {
    const params = new HttpParams()
      .set('bchs_uuid', bchsUuid.toString())
      .set('bchs_group_uuid', bchsGroupUuid.toString())
    return this.http.get<DataSHDK>(`/api/antiterror/shdk/group`, { params });
  }

  public getBchs(bchsUuid: string): Observable<BCHS> {
    return this.http.get<BCHS>(`/api/antiterror/bchs/${bchsUuid}`);
  }

  public getMilitaryStation(uuid: string) {
    return this.http.get<any>(`/api/antiterror/military_station/${uuid}`);
  }

  public clearBchs(uuid: string) {
    return this.http.delete(`/api/antiterror/bchs/${uuid}/clear`);
  }

  public makeAmplification(uuid: string, name: string): Observable<Mode> {
    const apmlification: AmplificationCreation = {
      military_station_uuid: uuid,
      name: name,
    }
    return this.http.post<Mode>(`/api/antiterror/amplification/object`, apmlification);
  }

  public deleteAmplification(amplificationUuid: string): Observable<any> {
    return this.http.delete<any>(`/api/antiterror/amplification/object/${amplificationUuid}`)
  }

  public editAmplification(amplificationUuid: string, name: string): Observable<Mode> {
    const apmlification: AmplificationCreation = {
      name: name,
    }
    return this.http.put<Mode>(`/api/antiterror/amplification/object/${amplificationUuid}`, apmlification);
  }

  public addShdkToamplification(shdk: string[], amplificationUuid: string, bchsUuid: string) {
    const apmlification = {
      shdk_uuids: shdk,
      amplification_object_uuid: amplificationUuid,
      bchs_uuid: bchsUuid
    }
    return this.http.post<any>(`/api/antiterror/amplification/shdk`, apmlification);
  }

  public getAmplification(bchsUuid: string, amplificationUuid: string): Observable<DataSHDK> {
    const params = new HttpParams()
      .set('bchs_uuid', bchsUuid.toString())
      .set('amplification_object_uuid', amplificationUuid.toString())
    return this.http.get<DataSHDK>(`/api/antiterror/amplification/shdk`, { params });
  }
}
