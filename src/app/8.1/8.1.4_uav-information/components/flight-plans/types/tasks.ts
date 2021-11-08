import { Document } from '../../../../../shared/components/ospo/documents/documents.types';
import { TaskMode } from '../../../modals/task-modal/types/task-modal';

export interface Task {
  flight_report_documents: Document[];
  order_document: any;
  division: Division;
  bpla?: Bpla;
  name: string;
  operator?: Operator;
  date_created: string;
  status_name: TaskMode;
  uuid: string;
  plan_uuid?: string;
  coordinates_landing: Coordinate;
  coordinates_nsu_location: Coordinate;
  coordinates_start: Coordinate;
  coordinates_track_points: Coordinate[];
}

export interface Coordinate {
  x: number;
  y: number;
  mark: string;
  uuid: string;
  status?: string;
}

export interface TaskPreview {
  count: number;
  result: Task[];
}

export interface FullTask {
  note: string;
  bpla: Bpla;
  end_flight_fact: string;
  start_flight_fact: string;
  operator: Operator;
  name: string;
  coordinates_start_uuid: string;
  coordinates_track_points: TrackPoint[];
  plan_uuid: string;
  coordinates_landing_uuid: string;
  coordinates_nsu_location_uuid: string;
  end_flight_plan: string;
  start_flight_plan: string;
  military_unit_id: number;
  target_flight: string;
  uuid: string;
}

export interface TrackPoint {
  coordinates_uuid: string;
  index: number;
  y: number;
  height: number;
  x: number;
  status: string;
}

export interface Bpla {
  number: string;
  uuid: string;
  vvst_sample_name: string;
  year: number;
}

export interface Operator {
  fio: string;
  position: string;
  rank: string;
  subdivision: string;
  uuid: string;
}

export interface Division {
  access_level: {name: string; id: number};
  children: Division[];
  id: number;
  label: string;
}
