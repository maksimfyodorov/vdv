import { Equipment } from './equipment.model';
import { Line } from './line.model';

export interface Schema {
  object_uuid?: string;
  military_unit_id?: string;
  uuid?: string;
  lines: Line[];
  equipments: Equipment[];
  isHover?: boolean;
  isEdit?: boolean;
}
