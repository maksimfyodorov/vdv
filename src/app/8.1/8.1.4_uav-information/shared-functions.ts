import moment from 'moment/moment';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

export function createISODate(date: Date): string {
  return moment(date).utcOffset(0, true).format('YYYY-MM-DDTHH:mm:ss');
}

export function createDate(date: Date): string {
  return moment(date).utcOffset(0, true).format('YYYY-MM-DD');
}

export function tapOnce<T>(fn: (value) => void): (source: Observable<T>) => Observable<T> {
  return (source: Observable<T>) => {
    source
    .pipe(
      take(1),
      tap(value => fn(value))
    )
    .subscribe();

    return source;
  };
}
