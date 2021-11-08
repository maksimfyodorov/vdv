import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, observable, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GetResponseEquipment, ResponseMonitoringObject, ResponseStatus } from '../../../models/backend-response.model';
import { Equipment, Fixation } from '../../../models/equipment.model';
import { MonitoringObject } from '../../../models/monitoringObject.model';
import { Schema } from '../../../models/schema.model';

import { StatusEquipment } from '../../../models/statusEquipment';
import { MilitaryUnit } from '../../../../../shared/components/ospo/documents/attach-document-dialog/attach-document-dialog.types';
import { BackendFixation } from '../video-monitoring';
import { mapFixationFromBackend } from './map-fixation-data';

@Injectable({
  providedIn: 'root',
})
export class VideoMonitoringService {
  selectedMilitaryUnit$ = new BehaviorSubject<MilitaryUnit>({ id: 0, name: '', common_number_name: '' });

  constructor(public http: HttpClient) {}

  public getAllMonitoringObjects(): Observable<MonitoringObject[]> {
    return this.http.get<ResponseMonitoringObject>(`api/monitoring/object`).pipe(map((response) => response.result));
  }

  public getMilitaryUnitSchema(militaryUnitId: number): Observable<any> {
    return this.http.get<any>(`api/monitoring/schema?military_unit_id=${militaryUnitId}`);
  }

  public getMilitaryUnitEquipment(militaryUnitId: number): Observable<any> {
    return this.http.get<any>(`api/monitoring/equipment?military_unit_id=${militaryUnitId}`);
  }

  public createMonitoringObject(newMonitoringObject: MonitoringObject): Observable<MonitoringObject> {
    return this.http.post<MonitoringObject>(`api/monitoring/object`, newMonitoringObject).pipe(
      tap((response) => {
        newMonitoringObject.uuid = response.uuid;
      })
    );
  }

  public deleteMonitoringObject(deletedMonitoringObject: MonitoringObject): Observable<any> {
    return this.http.delete<unknown>(`api/monitoring/object/${deletedMonitoringObject.uuid}`);
  }

  public updateMonitoringObject(updatedMonitoringObject: MonitoringObject): Observable<MonitoringObject> {
    return this.http.put<MonitoringObject>(
      `api/monitoring/object/${updatedMonitoringObject.uuid}`,
      updatedMonitoringObject
    );
  }

  public createNewSchema(options: { target: string; targetUuid: string; newSchema: Schema }): Observable<any> {
    return this.http
      .post<any>(`api/monitoring/schema?${options.target}=${options.targetUuid}`, options.newSchema)
      .pipe(tap((response) => (options.newSchema.uuid = response.uuid)));
  }

  public deleteSchema(deletedSchema: Schema): Observable<any> {
    return this.http.delete<any>(`api/monitoring/schema/${deletedSchema.uuid}`);
  }
  public updateSchema(updatedMonitoringObject: MonitoringObject): Observable<any> {
    const reqBody = {
      schemas: updatedMonitoringObject.schema.map((schema) => ({
        uuid: schema.uuid,
        lines: schema.lines,
        equipments: schema.equipments,
      })),
    };
    return this.http.put<any>(`api/monitoring/schema`, reqBody);
  }

  public getAllEquipment(): Observable<Equipment[]> {
    return this.http.get<GetResponseEquipment>(`api/monitoring/equipment`).pipe(map((response) => response.result));
  }

  public addNewEquipment(equipment: Equipment): Observable<Equipment> {
    return this.http.post<Equipment>(`api/monitoring/equipment`, equipment).pipe(
      tap((response) => {
        equipment.uuid = response.uuid;
      })
    );
  }

  public getEquipment(equipmentUuid: string): Observable<Equipment> {
    return this.http.get<Equipment>(`api/monitoring/equipment/${equipmentUuid}`);
  }

  public updateEquipment(updatedEquipment: Equipment): Observable<Equipment> {
    return this.http.put<Equipment>(`api/monitoring/equipment/${updatedEquipment.uuid}`, updatedEquipment);
  }

  public deleteEquipment(deletedEquipment: Equipment): Observable<unknown> {
    return this.http.delete<unknown>(`api/monitoring/equipment/${deletedEquipment.uuid}`);
  }

  public getAllEquipmentStatuses(): Observable<StatusEquipment[]> {
    return this.http.get<ResponseStatus>(`api/monitoring/status`).pipe(map((response) => response.data));
  }

  public getMilitaryUnits(): Observable<MilitaryUnit[]> {
    const params = new HttpParams().set('position_mu_id', '5');
    return this.http.get<MilitaryUnit[]>('api/military_unit', { params });
  }

  public getFixationsByMilitaryUnit(militaryUnitId: number): Observable<Fixation[]> {
    return this.http
      .get<BackendFixation[]>(`api/fixations/${militaryUnitId}?irz_number=8.2.20`)
      .pipe(map((fixs) => fixs.map(mapFixationFromBackend)));
  }

  public patchFixationCuf(fixationsUuid: string, cufUuid: string): Observable<any> {
    return this.http.patch(`/api/fixation/cuf/${fixationsUuid}/${cufUuid}`, null);
  }
}
