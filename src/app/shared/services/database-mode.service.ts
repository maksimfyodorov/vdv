import { Injectable } from '@angular/core';

export type Mode = 'production' | 'test';
export const DEFAULT_MODE: Mode = 'production';

@Injectable({
  providedIn: 'root',
})
export class DatabaseModeService {

  constructor() {
  }

  get mode(): Mode {
    return localStorage.getItem('db_mode') as Mode || DEFAULT_MODE;
  }

  set mode(value: Mode) {
    localStorage.setItem('db_mode', value);
  }
}
