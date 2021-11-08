import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RequestBody, YEARS } from '../document-settings.constants';
import { HttpClient } from '@angular/common/http';
import { MilitaryMen } from '@app/shared/components/military/interfaces';
import { FormArray } from '@angular/forms';
import { Period } from '@app/8.1/8.1.4_uav-information/components/flight-plans/types/period';
import { UavSelectionHierarchy } from '@app/8.1/8.1.4_uav-information/components/uav-node-folder/types/uav-selection-hierarchy';

@Injectable()
export class DocumentSettingsService {

  constructor(
    private http: HttpClient,
  ) {
  }

  public getYears(): Observable<number[]> {
    return of(YEARS);
  }

  public setPresetedMilitaryMen(requestBody: RequestBody): Observable<MilitaryMen> {
    return this.http.post<MilitaryMen>(`api/military_men`, requestBody);
  }

  public getMilitaryMenFromBackend(formArray: FormArray, militaryMenArray: MilitaryMen[]): void {
    for (let i = 0; i < formArray.controls.length; i++) {
      const militaryMan = {
        name: `${militaryMenArray[i].name.substr(0, 1)}.${militaryMenArray[i].surname}`,
        rank: militaryMenArray[i].rank.name,
        rank_and_name: `${militaryMenArray[i].rank.name} ${militaryMenArray[i].name.substr(0, 1)}.${militaryMenArray[i].surname}`,
        division: militaryMenArray[i].division,
        militaries: { military_man: `${militaryMenArray[i].rank.name} ${militaryMenArray[i].name.substr(0, 1)}.${militaryMenArray[i].surname}` },
        appointment: militaryMenArray[i].appointment.name,
        military_man_uuid: militaryMenArray[i].uuid,
      };

      formArray.controls[i].patchValue(militaryMan);

      if (i === militaryMenArray.length - 1) break;
    }
  }

  public getMilitaryUnits(unit: number): Observable<UavSelectionHierarchy[]> {
    // return this.http.get<UavSelectionHierarchy[]>(`api/military_unit/${unit}`);
    return this.http.get<UavSelectionHierarchy[]>(`api/military_unit`);
  }

  public getDivisions(unit: number): Observable<UavSelectionHierarchy[]> {
    return this.http.get<UavSelectionHierarchy[]>(`api/military_unit/${unit}/division`);
  }

  public getFetchedPeriods(): Observable<{ data: Period[] }> {
    return this.http.get<{ data: Period[] }>('api/period');
  }
}
