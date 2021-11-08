import { Shdk } from './co-executor.types';

export interface Executor {
  military_man_uuid: string;
  military_man: {uuid: string};
  shdk_uuid: string
  military_unit_id: number
  shdk: Shdk
  military_unit: {
    complicated_name: string;
    name: string;
    id: number}
}
