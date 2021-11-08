import { BackendResponsePost, Post } from '../types/setting';

export const mapBackendData = (post: BackendResponsePost): Post => (
  {
    uuid: post.uuid,
    number: post.number,
    militaryUnitId: post.military_unit_id,
    atsMo: post.ats_mo,
    atsR: post.ats_r,
    zsSpd: post.zs_spd,
    msOek: post.ms_oek,
    zvks: post.zvks,
    shifts: post.shifts,
  }
);

export const mapFrontendData = (post: Post): BackendResponsePost => (
  {
    number: post.number,
    military_unit_id: post.militaryUnitId,
    ats_mo: post.atsMo,
    ats_r: post.atsR,
    zs_spd: post.zsSpd,
    ms_oek: post.msOek,
    zvks: post.zvks,
    shifts: post.shifts,
  }
);
