import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NodesSchemeHierarchyItem } from '../../../../azimuth-scheme/components/nodes-scheme/nodes.scheme.types';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  HierarchyMode,
  SecurityHierarchy,
  SecurityTechStatus,
  TechItem,
  TechSecurityItem,
} from '../../../../../../../shared/components/ospo/ospo-security/types/security.types';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  constructor(private http: HttpClient) {}

  public getSecurityHierarchy(
    uuid: string,
    mode: HierarchyMode,
    techMode: boolean,
    date?: Date
  ): Observable<SecurityHierarchy> {
    let httpParams: HttpParams = new HttpParams();

    if (date) {
      const updDate = new Date(new Date(date).setHours(new Date(date).getHours() + 3)).toISOString();
      httpParams = httpParams.append('date', updDate.split('.')[0]);
    }

    httpParams = httpParams.append('tech_mode', techMode ? '1' : '0');

    return this.http
      .get<SecurityHierarchy>(`api/sufficiency/${mode}/${uuid}`, { params: httpParams })
      .pipe(map((item) => ({ hierarchy: [item.hierarchy], total: item.total })));
  }

  public getCommunicationNodesHierarchy(): Observable<{ hierarchy: NodesSchemeHierarchyItem[] }> {
    return this.http.get<{ hierarchy: NodesSchemeHierarchyItem[] }>('/api/azimuth_scheme/hierarchy');
  }

  public getBattlePostHierarchy(): Observable<NodesSchemeHierarchyItem[]> {
    return this.http.get<NodesSchemeHierarchyItem[]>('/api/battle_posts/hierarchy');
  }

  public getTechItems(): Observable<TechItem[]> {
    return this.http.get<TechItem[]>('api/vvst_samples');
  }

  public updateTechStatus(data: SecurityTechStatus, uuid: string): Observable<unknown> {
    return this.http.post<unknown>(`api/fixation/${uuid}`, { ['status']: { ...data } });
  }

  public editTech(data: TechSecurityItem, uuid: string): Observable<unknown> {
    return this.http.patch<unknown>(`api/fixation/${uuid}`, data);
  }

  public addTech(body: TechSecurityItem[], id: number): Observable<unknown> {
    return this.http.post<unknown>(`api/fixations/${id}`, { samples: body });
  }

  public deleteTech(data: TechSecurityItem): Observable<unknown> {
    return this.http.delete<unknown>(`api/fixation/${data.uuid}`);
  }

  public getReportStatus(): Observable<{ status: boolean }> {
    return this.http.get<{ status: boolean }>(`api/sufficiency/report/check`);
  }

  public generateSecurityReport(): Observable<any> {
    return this.http.post<any>(`api/sufficiency/report/create`, {});
  }
}
