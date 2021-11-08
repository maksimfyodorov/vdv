import { FormControl } from '@angular/forms';

export class PeriodValidators {
  static filledPeriod(control: FormControl): { [key: string]: boolean } {
    const timeRegExp: RegExp = /[0-2][0-9].[0-5][0-9]/;
    if (!timeRegExp.test(control?.value?.time) && !control.value?.hasOwnProperty('minute')) {
      return {
        wrongTime: true
      };
    }
    if (control?.value?.type?.value === 'monthly' && !control?.value?.hasOwnProperty('day')) {
      return {
        dayIsNotDefined: true
      };
    }
    if (control?.value?.type?.value === 'weekly' && !control?.value?.hasOwnProperty('day_of_week')) {
      return {
        dayOfWeekIsNotDefined: true
      };
    }
    return null;
  }
}

