import { Equipment } from './equipment.model';
import { MonitoringObject } from './monitoringObject.model';
import { StatusEquipment } from './statusEquipment';

export interface ResponseStatus {
  count: number;
  data: StatusEquipment[];
}

export interface ResponseMonitoringObject {
  count: number;
  result: MonitoringObject[];
}

export interface GetResponseEquipment {
  count: number;
  result: Equipment[];
}
