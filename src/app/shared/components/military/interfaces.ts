export interface MilitaryMenData {
  result: MilitaryMen[];
  count: number;
}

export interface ExecutiveData {
  result: Executive[];
  count: number;
}

export interface MilitaryMen {
  appointment: any;
  division: {} | null;
  middle_name?: string;
  name: string;
  rank: {} | any;
  surname?: string;
  uuid?: string;
  is_shdk?: boolean;
  contacts?: Contact[];
  military_man?: MilitaryMen;
  militaries?: { military_man: string };
  military_man_uuid?: string;
  rank_and_name?: string;
  required?: boolean;
}

export interface Executive {
  appointment: Appointment,
  military_man: MilitaryMen,
  group: unknown,
  uuid: string,
  rank: Rank,
  status: Status,
  name?: string,
  surname?: string,
}

export interface Rank {
  name: string;
  uuid: string;
  category: Category;
}

export interface Category {
  uuid: string,
  alias: string,
  name: string
}

export interface Status {
  name: string,
  uuid: string,
  date: string
}

export interface Contact {
  contact: string,
  contact_type: ContactType
}

export interface ContactType {
  name: string,
  uuid: string
}

export interface Appointment {
  name: string,
  uuid: string
}
