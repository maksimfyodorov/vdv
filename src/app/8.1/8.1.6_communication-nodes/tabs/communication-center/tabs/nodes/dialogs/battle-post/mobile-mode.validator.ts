import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const mobileModeValidator: ValidatorFn = (group: FormGroup): ValidationErrors | null => {
  const kind = group.get('kind').value;
  const coordinate = group.get('coordinate').value;

  if (kind?.name === 'Мобильный') {
    return coordinate ? null : {error: true};
  } else {
    return null;
  }
};
