export interface InformationGroup {
  uuid: string;
  number: string;
  name: string;
  section: SharedProperty;
  character: SharedProperty;
  forms: SharedProperty[];
  tracks: Track[];
}

export interface SharedProperty {
  uuid: string;
  name: string;
}

export interface Track {
  uuid?: string;
  time: string;
  type: TypeGroup;
  day?: number;
  day_of_week?: number | string;
  month?: number | string;
}

export type TypeGroup = 'monthly' | 'weekly' | 'daily' | 'yearly' | 'Ежедневно' | 'Раз в месяц' | 'Раз в год' | 'Раз в неделю';

export enum GroupTypes {
  'monthly' = 'Раз в месяц',
  'weekly' = 'Раз в неделю',
  'daily' = 'Ежедневно',
  'yearly' = 'Раз в год',
}

export enum GroupTypes2 {
  'Раз в месяц' = 'monthly',
  'Раз в неделю' = 'weekly',
  'Ежедневно' = 'daily',
  'Раз в год' = 'yearly',
}

export enum GroupMonth {
  'январь' = 1,
  'февраль' = 2,
  'март' = 3,
  'апрель' = 4,
  'май' = 5,
  'июнь' = 6,
  'июль' = 7,
  'август' = 8,
  'сентябрь' = 9,
  'октябрь' = 10,
  'ноябрь' = 11,
  'декабрь' = 12,
}

export enum GroupDayOfWeeks {
  'понедельник' = 1,
  'вторинк' = 2,
  'среда' = 3,
  'четверг' = 4,
  'пятница' = 5,
  'суббота' = 6,
  'воскресенье' = 7,
}
