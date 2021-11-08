export interface DayOfWeek {
  name: 'Пн' | 'Вт' | 'Ср' | 'Чт' | 'Пт' | 'Сб' | 'Вс';
  value: number;
}

export interface MonthOfYear {
  name: 'Январь' | 'Февраль' | 'Март' | 'Апрель' | 'Май' | 'Июнь' | 'Июль' | 'Август' | 'Сентябрь' | 'Октябрь' | 'Ноябрь' | 'Декабрь';
  value: number;
}

export interface PeriodType {
  name: 'Раз в месяц' | 'Раз в неделю' | 'Раз в день' | 'Раз в год' | 'Раз в час';
  value: 'monthly' | 'weekly' | 'daily' | 'yearly' | 'hourly';
}

export interface Period{
  uuid?: string;
  type: string;
  year?: number;
  day_of_week?: number;
  day?: number;
  time: string;
  monthOfYear?: number;
  minute: number;
}
