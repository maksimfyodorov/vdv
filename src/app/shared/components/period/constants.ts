import { DayOfWeek, MonthOfYear, PeriodType } from './interfaces';

export const MONTH_OF_YEAR: MonthOfYear[] = [
  {
    name: 'Январь',
    value: 1,
  },
  {
    name: 'Февраль',
    value: 2,
  },
  {
    name: 'Март',
    value: 3,
  },
  {
    name: 'Апрель',
    value: 4,
  },
  {
    name: 'Май',
    value: 5,
  },
  {
    name: 'Июнь',
    value: 6,
  },
  {
    name: 'Июль',
    value: 7,
  },
  {
    name: 'Август',
    value: 8,
  },
  {
    name: 'Сентябрь',
    value: 9,
  },
  {
    name: 'Октябрь',
    value: 10,
  },
  {
    name: 'Ноябрь',
    value: 11,
  },
  {
    name: 'Декабрь',
    value: 12,
  },
];

export const DAYS_OF_WEEK: DayOfWeek[] = [
  {
    name: 'Пн',
    value: 1,
  },
  {
    name: 'Вт',
    value: 2,
  },
  {
    name: 'Ср',
    value: 3,
  },
  {
    name: 'Чт',
    value: 4,
  },
  {
    name: 'Пт',
    value: 5,
  },
  {
    name: 'Сб',
    value: 6,
  },
  {
    name: 'Вс',
    value: 7,
  },
];
export const DAYS: number[] =
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

export const PERIOD_TYPES: PeriodType[] = [
  { name: 'Раз в месяц', value: 'monthly' },
  { name: 'Раз в неделю', value: 'weekly' },
  { name: 'Раз в день', value: 'daily' },
  { name: 'Раз в час', value: 'hourly' },
];

export const PERIOD_TYPES_YEARS: PeriodType[] = [
  { name: 'Раз в месяц', value: 'monthly' },
  { name: 'Раз в неделю', value: 'weekly' },
  { name: 'Раз в день', value: 'daily' },
  { name: 'Раз в год', value: 'yearly' },
];
