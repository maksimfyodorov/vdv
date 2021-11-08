export interface Periods {
  value?: string;
  description?: string;
  areShown?: boolean;
  day?: boolean;
  week?: boolean;
  month?: boolean;
  periods?: boolean;
  academic?: boolean;
  period?: string;
  periodValue?: any;
}

export const PERIODS = [
  {
    value: 'day',
    description: 'День ',
  },
  {
    value: 'week',
    description: 'Неделя',
  },
  {
    value: 'month',
    description: 'Месяц',
  },
  {
    value: 'periods',
    description: 'Период',
  },
  {
    value: 'academic',
    description: 'Учебный год',
  },
];

export const YEARS: number[] = [
  2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030,
];

export const WEEKS_NUMBERS: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53];

export interface RequestBody {
  subscribing: string[],
  approving: string[],
  confirming: string[],
}
