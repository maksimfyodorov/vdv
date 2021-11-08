import {StaffTask} from '../desant-events-module/types/desant-events.type';

export interface AircraftData{
  data: Aircraft[];
  count: number;
}
export interface Aircraft {
    name: string;
    editable: boolean;
    type: AircraftType;
    capacity_ls: number;
    capacity_vvst: number;
    uuid: string;
}

export interface AircraftType {
    name: string;
    uuid: string;
}


export  interface PutAircraft {
    uuid: string;
    type_uuid: string;
    name: string;
    capacity_vvst: number;
    capacity_ls: number;
}

export interface PostAircraft {
    type_uuid: string;
    name: string;
    capacity_vvst: number;
    capacity_ls: number;
}
