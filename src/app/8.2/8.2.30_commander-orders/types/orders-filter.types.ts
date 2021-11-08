import { OrdersFilterCheckbox } from '../components/orders-filter/orders-filter.component';

export interface OrdersFilter {
  status?: OrdersFilterCheckbox[];
  ed_end?: string;
  ed_start?: string;
  rd_end?: string;
  rd_start?: string;
  executor?: { shdk_uuid: string, military_unit_id: string };
}
