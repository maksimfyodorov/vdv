import { Injectable } from '@angular/core';
import { UesService } from 'ues_ui';
import { MAP_DEFAULT_CONFIG } from '../../../../utils/constants';
import { delay, tap } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { SignsData } from 'ues_ui/app/sign-desc-module/common/models';
import { SignLoaderInterface, UesInstance } from '../../../../types/roo-types';
import { SignLoader } from 'ues';
import { AssetRequest, MapAsset } from '../types/map-view.types';


@Injectable()
export class MapViewService {
  private uesInstance: UesInstance;

  constructor(private uesService: UesService) { }

  public subscribeToMapCreate(): Observable<UesInstance> {
    return this.uesService.onMapCreated.pipe(
      tap(res => this.setMapConfig(res)),
      delay(2000));
  }

  public getUesInstance(): UesInstance {
    return this.uesService.getUesInstance();
  }

  public getAssets(codes: AssetRequest[]): Observable<MapAsset> {
    const resultObj = {};
    codes.map(item => Object.entries(item).forEach(([key, value]) => resultObj[key] = this.loadSign(value)));

    return forkJoin(resultObj);

  }

  private setMapConfig(uesInstance: UesInstance): void {
    uesInstance.setMapResolution(MAP_DEFAULT_CONFIG.resolution);
    uesInstance.setMapCenter(MAP_DEFAULT_CONFIG.center);
  }

  private loadSign(classCode: string | number): Observable<SignsData> {
    const loader: SignLoaderInterface = new SignLoader(this.uesInstance);

    return new Observable(subscriber => {
      loader.loadSignData(classCode, signData => {
        subscriber.next(signData);
        subscriber.complete();
      });
    });
  }
}
