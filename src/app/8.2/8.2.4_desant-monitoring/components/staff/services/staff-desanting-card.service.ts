import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Militaries} from '../../../types/desant-monitoring.types';
import {SPORT_INFO} from '../../sport-team/mock';
import {MilitarySportInfo} from '../../sport-team/types/sport-team.types';

@Injectable()
export class StaffDesantingCardService {

  constructor() { }
  public getDesantInfo(): Observable<MilitarySportInfo> {
    return of<MilitarySportInfo>(SPORT_INFO);
  }
}
