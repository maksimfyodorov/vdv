import {Document} from '../../../../../../shared/components/ospo/documents/documents.types';

export interface JumpStatesData {
  data: JumpStates[];
}

export interface JumpStates {
  name: string;
  uuid: string;
}

export interface DayPeriod {
  name: string;
  uuid: string;
}

export interface Paratroopers {
  appointment: { uuid: string, name: string, VUS: string };
  division: { label: string, pid: number, id: number };
  middle_name: string;
  name: string;
  rank: { category: {}, uuid: string, name: string };
  surname: string;
  uuid: string;
  jump_count: number;
  vvst_fixation_main: DesantParachuteSystem;
  vvst_fixation_reserve: DesantParachuteSystem;
  date_parachute_packing_main: string;
  date_parachute_packing_reserve: string;
}

export interface ParatrooperLandingParams {
  completing_uuid: string;
  paratrooper_uuid: string;
  vvst_fixation_main_uuid: string;
  vvst_fixation_reserve_uuid: string;
  date_parachute_packing_main: string;
  date_parachute_packing_reserve: string;
}

export interface DocumentData {
  document: Document[];
  count: number;
}

export interface CompletingTableData {
  data: CompletingTable[];
  count: number;
}

export interface CompletingTable {
  date_fact: Date;
  status_name: string;
  jump_count: number;
  paratrooper_count: number;
  ready_time: number;
  times_day: any;
  uuid: string;
  division_name: string;
  departure_count: number;
  date_plan: Date;
}

export interface DesantParachuteSystemData {
  data: DesantParachuteSystem[];
  count: number;
}

export interface DesantParachuteSystem {
  vvst_sample_name: string;
  number: string;
  uuid: string;
  year: number;
}

export interface ColumnsVVST {
  field: string;
  header: string;
  template: string;
}
