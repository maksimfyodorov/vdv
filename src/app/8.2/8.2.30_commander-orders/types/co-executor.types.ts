export interface CoExecutor {
  military_man?: {uuid: string};
  military_man_uuid?: string;
  uuid: string;
  shdk: Shdk;
  military_unit: MilitaryUnit;
  military_unit_id: number;
  shdk_uuid: ShdkUuid;
}

export interface Shdk {
  rank: {name: string}
  military_man: {
    uuid: string;
    middle_name: string;
    surname: string;
    name: string;
  }
  uuid: string
  appointment: {name: string}
}

export interface ShdkUuid {
  shdk_uuid?: string
  military_man?: string
  appointment?: string
}

export interface MilitaryUnit {
  id: number
}
