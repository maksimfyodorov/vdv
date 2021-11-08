import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Militaries} from '../../../types/desant-monitoring.types';
import {SPORT_TABLE} from '../mock';

@Injectable()
export class SportTeamService {

  constructor(private httpClient: HttpClient) {
  }

  public getSportTeamPersons(): Observable<Militaries[]> {
    return of(SPORT_TABLE);
  }
}

