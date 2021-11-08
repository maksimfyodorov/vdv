import { EventsCount, SchedulerEvent } from '../components/scheduler-table/scheduler-table.types';

export interface Verification {
  organizingVerification: string;
  verifiableMilitaryFormation: string;
  plannedDateStart: string;
  plannedDateEnd: string;
  factualDateStart?: string;
  factualDateEnd?: string;
  nameVerification: string;
  reason: string;
  dateStart: string;
  document: string;
  documentNumber: number;
}

export interface InspectionSchedule {
  uuid?: string;
  reason?: string;
  year: number;
  status?: ScheduleStatus;
  events_count?: EventsCount[];
  inspections?: InspectionBody[];
}
//
// export interface InspectionBody {
//   name: string;
//   id?: number;
//   formations: Formation[];
// }

// export interface Formation {
//   name: string;
//   id?: string;
//   events: SchedulerEvent[];
// }

export interface ScheduleStatus {
  uuid: string;
  name: string;
  code: ScheduleStatusCode;
}

export type ScheduleStatusCode = 'new' | 'removed' | 'planned' | 'on_confirmation' | 'confirmed' | 'approved';

export const SCHEDULE_STATUS_ICONS = {
  new: 'pi-file-o',
  removed: 'pi-exclamation-circle',
  on_confirmation: 'pi-info-circle',
  confirmed: 'pi-info-circle',
  saved: 'pi-check-circle',
};

export interface InspectionBody {
  statistic: Statistic;
  formations: Formation[];
}

export interface Formation {
  id: number;
  name: string;
  inspections: Inspection[];
}

export interface Statistic {
  in_progress: number;
  finished: number;
  canceled: number;
  planned: number;
  ready: number;
  not_ready: number;
  undetermined: number;
}

export interface Inspection {
  uuid: string;
  result: string;
  status: Status;
  name: string;
  division: Division;
  combat_readiness: CombatReadiness;
  dt_start: string;
  dt_end: string;
  startColumn?: number;
  duration?: number;
  dt_start_fact: string;
  dt_end_fact: string;
}

export interface Status {
  uuid: string;
  name: string;
}

export interface Division {
  id: number;
  label: string;
}

export interface CombatReadiness {
  uuid: string;
  name: string;
}
