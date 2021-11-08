export interface Stability {
  controlPoint: {value: string, status: string};
  day: {value: number, status: string};
  week: {value: number, status: string};
  month: {value: number, status: string};
  period: {value: number, status: string};
  year: {value: number, status: string};
}

export const mockStability = [
  {
    controlPoint: { value: 'Командование', status: 'green'},
    day:  { value: 100, status: 'green'},
    week: { value: 60, status: 'yellow'},
    month: { value: 65, status: 'yellow'},
    period: { value: 75, status: 'blue'},
    year: { value: 81, status: 'blue'},
  },
  {
    controlPoint: { value: '5 пдд', status: 'green'},
    day: { value: 50, status: 'yellow'},
    week: { value: 40, status: 'red'},
    month: { value: 50, status: 'yellow'},
    period: { value: 92, status: 'blue'},
    year: { value: 75, status: 'blue'},
  },
  {
    controlPoint: { value: '217 пдп', status: 'green'},
    day: { value: 50, status: 'yellow'},
    week: { value: 30, status: 'red'},
    month: { value: 45, status: 'red'},
    period: { value: 80, status: 'blue'},
    year: { value: 71, status: 'yellow'},
  },
  {
    controlPoint: { value: 'соединение', status: 'green'},
    day: { value: 100, status: 'green'},
    week: { value: 100, status: 'green'},
    month: { value: 100, status: 'green'},
    period: { value: 100, status: 'green'},
    year: { value: 100, status: 'green'},
  },
  {
    controlPoint: { value: 'Полк N1', status: 'green'},
    day: { value: 100, status: 'green'},
    week: { value: 100, status: 'green'},
    month: { value: 100, status: 'green'},
    period: { value: 100, status: 'green'},
    year: { value: 100, status: 'green'},
  },
  {
    controlPoint: { value: 'Полк N3', status: 'green'},
    day: { value: 100, status: 'green'},
    week: { value: 100, status: 'green'},
    month: { value: 100, status: 'green'},
    period: { value: 100, status: 'green'},
    year: { value: 100, status: 'green'},
  },
  {
    controlPoint: { value: 'Итого', status: 'green'},
    day: { value: 83, status: 'blue'},
    week: { value: 72, status: 'yellow'},
    month: { value: 77, status: 'yellow'},
    period: { value: 91, status: 'blue'},
    year: { value: 88, status: 'blue'},
  },
];

