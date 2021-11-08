import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrentTimeService {

  public currentTime$ = timer(0, 1000).pipe(
    map(i => new Date().toLocaleString('ru', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'Europe/Moscow',
    })),
  );

  public currentDate$ = timer(0, 1000).pipe(
    map(i => {
        const date = new Date().toLocaleDateString('ru', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          timeZone: 'Europe/Moscow',
        });

        const weekday = new Date().toLocaleString('ru', {
          weekday: 'short',
        });

        const sliceDate = date.slice(0, date.length - 3);

        return sliceDate + ', ' + weekday;
      },
    ));
}
