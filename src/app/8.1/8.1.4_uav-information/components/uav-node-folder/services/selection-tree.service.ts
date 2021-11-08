import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { HttpApiService } from '../../../services/api.service';
import { LoaderService } from '@app/shared/components/loader/loader.service';

@Injectable({providedIn: 'root'})
export class SelectionTreeService {
  public militaryUnitId: number;
  public selectionTreeSubject = new BehaviorSubject([]);
  public selectionTreeSelectItemSubject: ReplaySubject<{ uuid: number }> = new ReplaySubject<{ uuid: number }>(1);
  public recursiveSelectedItemId: number;

  constructor(
    private apiService: HttpApiService,
    private loader: LoaderService
  ) {
  }

  public createHierarchy(): void {
    this.loader.startLoading(this.apiService.getSelectionTree()).subscribe(res => {
      this.selectionTreeSubject.next(res);

      if (this.militaryUnitId) {
        this.selectionTreeSelectItemSubject.next({ uuid: this.militaryUnitId });

        return;
      }
      this.militaryUnitId = res[0].id;
      this.selectionTreeSelectItemSubject.next({ uuid: res[0].id });
    });
  }
}
