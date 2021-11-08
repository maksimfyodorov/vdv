export interface CompletenessNode {
  call_sign: string;
  point: CompletenessPoint;
  children: CompletenessSecurity[];
}

export interface CompletenessSecurity {
  children: any[];
  name: string;
  point: CompletenessPoint;
  total: CompletenessTotal;
}

export interface CompletenessTotal {
  available: number;
  by_list: number;
  ill: number;
  lack: number;
  sent: number;
  state: number;
}

export enum CompletenessPoint {
  cn = 'cn',
  security = 'security',
  center = 'center',
}

export enum CompletenessRank {
  officers = 'officers',
  soldiers = 'soldiers',
  ensigns = 'ensigns',
  sergeants = 'sergeants',
}
