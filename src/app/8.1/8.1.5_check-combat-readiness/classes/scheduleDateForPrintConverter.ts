import { RangeDate } from '@app/shared/components/range-data-picker/date-picker.types';

export class ScheduleDateForPrintConverter {
  public static convertPrintDateToWeek(date): RangeDate {
    const fromDate = new Date(date.periodValue.yearInWeekPeriod, 0, 1);
    fromDate.setDate(((date.periodValue.weekNumber * 7) - 7));
    const toDate = new Date(date.periodValue.yearInWeekPeriod, 0, 1);
    toDate.setDate(((date.periodValue.weekNumber * 7)));
    return {
      from: fromDate,
      to: toDate,
    };
  }

  public static convertPrintDateToMonth(date): RangeDate {
    const fromDate = new Date(date.periodValue);
    const toDate = new Date(date.periodValue);
    toDate.setMonth(toDate.getMonth() + 1);
    return {
      from: fromDate,
      to: toDate,
    };
  }

  public static convertPrintDateToPreparatory(date): RangeDate {
    return {
      from: date,
      to: date,
    };
  }

  public static convertPrintDateToSummer(date): RangeDate {
    return {
      from: date,
      to: date,
    };
  }

  public static convertPrintDateToWinter(date): RangeDate {
    return {
      from: date,
      to: date,
    };
  }

}
