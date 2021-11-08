import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'format',
})
export class FormatPipe implements PipeTransform {
  transform(value: number, args?: any): string {
    const days = [ 'вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб' ];
    return days[args];
  }
}
