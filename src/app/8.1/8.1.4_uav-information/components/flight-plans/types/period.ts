export interface Period{
  end_date: string;
  name: string;
  start_date: string;
  uuid: string;
  year: number;
}

export interface PeriodsOverTheYears {
  year: number;
  period: Period[];
}
