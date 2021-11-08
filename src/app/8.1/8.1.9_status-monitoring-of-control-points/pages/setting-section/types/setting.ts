export interface BackendResponsePost {
  uuid?: string;
  number: string;
  military_unit_id: number;
  ats_mo: string;
  ats_r: string;
  zs_spd: string;
  ms_oek: string;
  zvks: string;
  shifts: Shift[];
}

export interface Post {
  uuid?: string;
  number: string;
  militaryUnitId: number;
  atsMo: string;
  atsR: string;
  zsSpd: string;
  msOek: string;
  zvks: string;
  shifts: Shift[];
}

export interface Shift {
  uuid?: string;
  number: string;
  days?: number;
  men?: number;
}

export interface UserInfo {
  access_level: string;
  permissions: any[];
  user_data: {
    full_name: string;
    group: string;
    mu_id: number;
    mu_name: string;
    role: string;
    service_login: string;
    user_login: string;
  };
}
