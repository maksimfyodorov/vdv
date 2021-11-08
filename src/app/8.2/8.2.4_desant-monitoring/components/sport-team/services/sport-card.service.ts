import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {MilitarySportInfo} from '../types/sport-team.types';
import {Militaries} from '../../../types/desant-monitoring.types';
import {SPORT_INFO, SPORT_TABLE} from '../mock';

@Injectable()
export class SportCardService {

  constructor(private httpClient: HttpClient) {
  }

  public getMilitarySportInfo(): Observable<MilitarySportInfo> {
    return of(SPORT_INFO);
  }
}
