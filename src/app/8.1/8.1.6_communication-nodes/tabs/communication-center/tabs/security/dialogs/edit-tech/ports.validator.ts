import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Port } from '../../../../../../../../shared/components/ports/interfaces';

export function portsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value.length) {
      return null;
    }
    const result = control.value.every((item: Port) => {
      return item.name && item.ip && item.channel;
    });
    return result ? null : {error: 'Must be full'};
  };
}
