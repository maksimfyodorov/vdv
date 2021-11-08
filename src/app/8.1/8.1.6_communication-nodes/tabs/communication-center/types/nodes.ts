import { AccessLevel, Division, MilitaryUnit } from '../../azimuth-scheme/components/nodes-scheme/nodes.scheme.types';
import { BackEndCoordinates } from '../../../../../shared/components/ospo/ospo-coordinates/types/mark';

export interface ButtonActions {
  name: string;
  emit: string;
  icon: string;
}

export interface Subjects {
  communication_type: string;
  mark: string;
  deployment_time: string;
  actions: ButtonActions[];
}


export interface NodesHierarchy {
  hierarchy: Array<CommunicationNode>;
}

export type SecurityHierarchyItem = CommunicationNode & CommunicationCenter & BattlePost;

export interface CommunicationNode {
  uuid: string;
  point: string;
  deploy_time?: any;
  military_unit: MilitaryUnit;
  division: Division;
  coordinate: BackEndCoordinates;
  call_sign: string;
  connection_type: {name: string, uuid: string};
  node_kind: {name: string, uuid: string};
  battle_posts_available: boolean;
  access_level: AccessLevel;
  security?: number;
  staffing?: number;
  children?: Array<CommunicationNode | CommunicationCenter | BattlePost>;
}

export interface CommunicationCenter {
  uuid: string;
  point: string;
  number: number;
  center_type: {
    uuid: string;
    name: string;
    annotation?: string;
  };
  division: Division;
  communication_node: CommunicationNode;
  children?: BattlePost[];
  edit?: boolean;
}

export interface BattlePost {
  uuid: string;
  center?: {uuid: string};
  communication_node?: CommunicationNode;
  point: string;
  cn_military_unit: {label: string, id: number};
  division: Division;
  type: {name: string, uuid: string};
  kind: {name: string, uuid: string};
  number: number;
  parent_cn?: CommunicationNode;
  coordinate?: BackEndCoordinates;
  deployment_time?: number;
  parent: CommunicationNode;
}

export interface BattlePostSelectors {
 battle_post_types: {uuid: string, name: string}[];
 battle_post_kinds: {uuid: string, name: string}[];
 center_types: {uuid: string, name: string}[];
}
