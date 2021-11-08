import {Moment} from 'moment';
import {SelectDesantSubdivisionComponent} from '../components/create-and-modifying-event/components/desant-event-staff/dialogs/select-desant-subdivision/select-desant-subdivision.component';
import {Executive, MilitaryMen, Rank} from '../../../../shared/components/military/interfaces';
import {Aircraft} from '../../types/aircraftInterface';
import {BackEndCoordinates, Coordinates} from '../../../../shared/components/ospo/ospo-coordinates/types/mark';
import {Task} from '../../types/taskInterface';
import {Period} from '../../../../common-pages/settings/interfaces';
import {CompletingTable} from '../components/create-and-modifying-event/types/new-desant-event-dialog.types';

export interface EventsExistName {
  data: string[];
}
export interface EventBasicInfoData {
  result: EventBasicInfo[];
  count: number;
}
export interface EventBasicInfo {
  event_documents: [];
  uuid: string;
  period: Period;
  date_end_plan: string;
  description: string;
  date_start_plan: string;
  shdk: Executive;
  event_status: string;
  name: string;
  military_unit: {
    number: string;
    name: string;
    id: number;
  };
}

export interface DesantSubdivision {
  rank: Rank;
  first_name: string;
  middle_name: string;
  last_name: string;
  subdivision: string;
  parachute_packing_date: Date;
  count: string;
  uuid: string;
}
export interface DesantEventHeader {
  title: string;
  data: any;
}
export interface ChangeEventHeader {
  title: string;
  uuid: any;
  data?: any;
}

export interface NewEventParams {
  name: string;
  description: string;
  military_unit_id?: string;
  event_documents_uuid: string[];
  shdk_uuid: string;
  period_uuid: string;
  date_start_plan: string;
  date_end_plan: string;
}

export interface StaffSubtask {
  date_plan: string;
  tasks: { name: string, done: boolean, uuid: string }[];
  uuid: string;
  selected: boolean;
}
export interface StaffTaskData {
  data: StaffTask[];
  count: number;
}
export interface StaffTask {
  completing: CompletingTable[];
  aerodrome_start: Airdrome;
  aircraft_main: Aircraft;
  date_end_plan: Date;
  date_start_plan: Date;
  event_uuid: string;
  jump_count_total: number;
  note: string;
  other_aircraft: Aircraft[];
  platform_landing_area: BackEndCoordinates;
  platform_place_for_special_events: BackEndCoordinates;
  prohibition_aircraft: boolean;
  single_jumping: { uuid: string, name: string };
  sport_task: boolean;
  status_name: string;
  task_directory: Task;
  type_name: string;
  uuid: string;
}
export interface AirdromeData {
  data: Airdrome[];
  count: number;
}
export interface Airdrome {
  name: string;
  uuid: string;
  coordinates: {
    mark: string,
    uuid: string,
    x: string,
    y: string,
  };
}

export interface ParachuteSystemData {
  data: ParachuteSystem[];
  count: number;
}
export interface ParachuteSystem {
  name: string;
  uuid: string;
}
export interface MilitaryUnitHierarchy {
  id: string;
  label: string;
  children: MilitaryUnitHierarchy[];
  securityPercent?: number;
  staffingPercent?: number;
  totalRatio?: number;
  expanded?: boolean;
  valueRatio?: number;
  isMobile?: boolean;
}
export interface ParatrooperData {
  data: Paratrooper[];
  count: number;
}
export interface Paratrooper {
  vvst_fixation_reserve: string;
  uuid: string;
  military_man: MilitaryMen;
  vvst_fixation_main: string;
  jump_count: number;
  is_commander: boolean;
}

export interface AddParatrooperParams {
  items: {
    military_man_uuid: string
  }[];
}
export interface Divisions {
  label: string;
  id: number;
  children: Divisions[];
  access_level: {
    name: string;
    id: number;
  };
}

