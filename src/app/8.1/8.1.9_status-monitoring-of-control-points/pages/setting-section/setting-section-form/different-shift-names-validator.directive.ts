import { Directive } from '@angular/core';
import { FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

export const differentShiftNamesValidator: ValidatorFn = (group: FormGroup): ValidationErrors | null => {

    const shiftNames = group.get('shifts').value.map(({ number }) => number);
    const uniqueShifts = new Set(shiftNames);

    return shiftNames.length === uniqueShifts.size ? null : { shiftNamesMatch: true };
  };

@Directive({
  selector: '[appDifferentShiftNamesValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: DifferentShiftNamesValidatorDirective, multi: true }]
})

export class DifferentShiftNamesValidatorDirective implements Validator {
  validate(group: FormGroup): ValidationErrors | null {
    return differentShiftNamesValidator(group);
  }
}
