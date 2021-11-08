import { CufData } from '../interfaces/interfaces';

export type Type = 'manual' | 'cuf';

export interface Equipment {
  fixation?: {
    cuf: CufData;
    [key: string]: any;
  }
  uuid: string;
  status: {
    cuf_status_uuid?: string;
    [key: string]: any;
  };
  [key: string]: any;
}
