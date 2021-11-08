export interface Period {
  uuid?: string;
  year: number;
  name: string;
  start_date: Date;
  end_date: Date;
  disabled?: boolean;
}

export interface MivItem {
  uuid?: string;
  protocol: string;
  address: string;
  port: number;
  url: string;
  military_unit_id?: string;
}

export type MivMode = 'create' | 'edit' | 'read' | 'none';
