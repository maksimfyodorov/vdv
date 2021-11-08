import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable()
export class BreadcrumbService {

  public get crumbs$(): Observable<MenuItem[]> {
    return this.crumbs.asObservable();
  };
  private crumbs = new ReplaySubject<MenuItem[]>(1);

  constructor() {}

  public setCrumbs(items: MenuItem[]) {
    this.crumbs.next(
      (items || []).map(item =>
        Object.assign({}, item, {
          routerLinkActiveOptions: { exact: true }
        })
      )
    );
  }
}
