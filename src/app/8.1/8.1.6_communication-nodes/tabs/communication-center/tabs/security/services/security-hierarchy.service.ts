import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityHierarchyService {

  private selectedItem$: Subject<unknown> = new Subject<unknown>();

  public observeSelectedItem(): Observable<any> {
    return this.selectedItem$.asObservable();
  }

  public changeSelectedItem(value): void {
    this.selectedItem$.next(value);
  }

  constructor() { }
}
