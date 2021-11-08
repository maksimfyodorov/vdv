import { Vector } from 'p5';
import { Subject } from 'rxjs';
import { Document } from '../../../../../../shared/components/ospo/documents/documents.types';

export type UserInputMode = 'hand' | 'cursor' | 'connection';

export const USER_INPUT_MODES: UserInputMode[] = ['hand', 'cursor', 'connection'];

export const DASHED_LINE_SEGMENTS = [5, 7];

export const STATUS_COLORS = {
  new: '#a8a8a8',
  planned: '#c7c7c7',
  fine: '#82C91E',
  warning: '#F08C00',
  alert: '#E03131',
};

export interface Node {
  uuid?: string;
  military_unit: MilitaryUnit;
  division: Division;
  access_level: AccessLevel;
  call_sign: string;
  connection_type: ConnectionType;
  node_type: NodeType;
  coordinate?: Coordinate;
  node_kind: NodeKind;
  deploy_time?: string;
  positionX?: number;
  positionY?: number;
  miv_address?: string;
}

export interface MilitaryUnit {
  id: number;
  label: string;
  pid?: number;
  children?: MilitaryUnit[];
  access_level?: AccessLevel;
}

export interface AccessLevel {
  uuid: string;
  name: string;
  alias: string;
}

export interface MuAddress {
  military_unit_id: number;
  address: string;
}

export interface Division {
  id: number;
  label: string;
  pid?: number;
  children?: Division[];
}

export interface ConnectionType {
  uuid: string;
  name: string;
}

export interface Coordinate {
  uuid: string;
  mark?: string;
  x: number;
  y: number;
}

export interface NodesSchemeHierarchyItem {
  uuid?: string;
  expanded?: boolean;
  call_sign: string;
  military_unit: string | MilitaryUnit;
  security: number;
  staffing: number;
  children: NodesSchemeHierarchyItem[];
}

export interface Direction {
  uuid?: string;
  node_out_uuid: string;
  node_in_uuid: string;
  direction_type: DirectionType;
  channels: Channel[];
}

export interface Channel {
  uuid: string;
  channel_type: ChannelType;
  connection_number: string;
  zas_direction_number: string;
  line_type: string;
  establishment_connection_time: string;
  channel_status: ChannelStatus;
  documents: Document[];
  note: string;
}

export interface ChannelType {
  uuid: string;
  name: string;
}

export interface NodeKind {
  uuid: string;
  name: string;
}

export interface NodeType {
  uuid: string;
  name: string;
}

export interface DirectionType {
  uuid: string;
  name: string;
}

export interface ChannelStatus {
  uuid: string;
  name: string;
}

export interface SubjectEvent {
  [key: string]: Subject<any>;
}

export interface CommunicationSelectors {
  connection_types: ConnectionType[];
  node_types: NodeType[];
  node_kinds: NodeKind[];
  direction_types: DirectionType[];
  channel_statuses: ChannelStatus[];
  access_level: AccessLevel[];
}

export interface AzimuthFolderSelectionEmitter {
  uuid: string | number;
  emitter: 'hierarchy' | 'work-area';
}

export interface CanvasBackup {
  scale: number;
  translation: Vector;
  canvasSize: Vector;
}

export type SubjectEventKey = 'doubleClick' | 'mouseIsPressed' | 'mouseWheel';

export type Mode = 'create' | 'edit' | 'view';

