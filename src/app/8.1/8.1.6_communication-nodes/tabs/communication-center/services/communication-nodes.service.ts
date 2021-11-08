import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { BattlePost, BattlePostSelectors, CommunicationCenter, CommunicationNode } from '../types/nodes';
import { MilitaryUnit } from '../../azimuth-scheme/components/nodes-scheme/nodes.scheme.types';

@Injectable({
  providedIn: 'root'
})
export class CommunicationNodesService {
  public selectors: BattlePostSelectors;
  public plainBattlePosts$: BehaviorSubject<BattlePost[]> = new BehaviorSubject<BattlePost[]>([]);

  constructor(
    private http: HttpClient,
  ) {
    this.getBattlePostSelectors().subscribe(res => this.selectors = res);
  }

  public getCommunicationNodes(): Observable<CommunicationNode[]> {
    this.updatePlainCommunicationNodes();
    return this.http.get<CommunicationNode[]>('/api/battle_posts/hierarchy');
  }

  public getCommunicationCenters(nodeUuid: string): Observable<CommunicationCenter[]> {
    return this.http.get<CommunicationCenter[]>(`/api/centers/${nodeUuid}`);
  }

  public createCommunicationCenter(center: CommunicationCenter, uuid: string): Observable<unknown> {
    return this.http.post(`/api/center/${uuid}`, center);
  }

  public patchCommunicationCenter(center: CommunicationCenter, uuid: string): Observable<unknown> {
    return this.http.patch(`/api/center/${uuid}`, center);
  }

  public deleteCommunicationCenter(uuid: string): Observable<unknown> {
    return this.http.delete(`/api/center/${uuid}`);
  }

  public createBattlePost(battlePost: BattlePost, nodeUuid: string): Observable<unknown> {
    return this.http.post(`/api/battle_post/${nodeUuid}`, battlePost);
  }

  public patchBattlePost(battlePost: BattlePost, battlePostUuid: string): Observable<unknown> {
    return this.http.patch(`/api/battle_post/${battlePostUuid}`, battlePost);
  }

  public deleteBattlePost(uuid: string): Observable<unknown> {
    return this.http.delete(`/api/battle_post/${uuid}`);
  }

  public getBattlePostDivisions(unit_id): Observable<MilitaryUnit[]> {
    return this.http.get<MilitaryUnit[]>(`/api/military_unit/${unit_id}/division`);
  }

  public getBattlePostSelectors(): Observable<BattlePostSelectors> {
    return this.http.get<BattlePostSelectors>('/api/battle_post_selectors');
  }

  public updatePlainCommunicationNodes(): void {
    this.http.get<BattlePost[]>('/api/battle_posts/all').subscribe(res => {
      this.plainBattlePosts$.next(res);
    });
  }
}
