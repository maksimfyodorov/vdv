import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  Channel,
  CommunicationSelectors,
  Direction,
  Division,
  MilitaryUnit,
  MuAddress,
  Node,
} from '../nodes.scheme.types';
import { DisplayNode } from '../objects/displayNode';

@Injectable({
  providedIn: 'root',
})
export class NodesSchemeService {

  public nodes$: BehaviorSubject<Node[]> = new BehaviorSubject<Node[]>([]);
  public directions$: BehaviorSubject<Direction[]> = new BehaviorSubject<Direction[]>([]);
  public saveIsNeeded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public selectors: CommunicationSelectors;
  private deletedNodes: { uuid: string }[] = [];
  private deletedDirections: { uuid: string }[] = [];
  private deletedChannels: { uuid: string }[] = [];

  public get nodes(): Observable<Node[]> {
    return this.nodes$.asObservable();
  }

  public get directions(): Observable<Direction[]> {
    return this.directions$.asObservable();
  }

  constructor(private http: HttpClient) {
    this.getData();
  }

  public getScheme(): void {
    this.http.get<{ nodes: [], directions: [] }>('/api/azimuth_scheme').subscribe(res => {
      this.nodes$.next(res.nodes);
      this.directions$.next(res.directions);
    });
  }

  public getMilitaryUnits(): Observable<MilitaryUnit[]> {
    return this.http.get<MilitaryUnit[]>('/api/military_unit');
  }

  public getDivision(militaryUnitId: number): Observable<Division[]> {
    return this.http.get<Division[]>(`/api/military_unit/${militaryUnitId}/division`);
  }

  public getSelectors(): Observable<CommunicationSelectors> {
    return this.http.get<CommunicationSelectors>('/api/communication_selectors');
  }

  public createNode(node: Node): void {
    node.uuid = (new Date().getMilliseconds() * Math.random() * 100).toFixed();
    this.nodes$.next([...this.nodes$.value, node]);
    this.setSaveIsNeeded(true);
  }

  public patchNode(node: Node): void {
    Object.assign(this.nodes$.value.find(current => current.uuid === node.uuid), node);
    this.nodes$.next(this.nodes$.value);
    this.setSaveIsNeeded(true);
  }

  public deleteNode(node: Node): void {
    this.nodes$.next(this.nodes$.value.filter(current => current.uuid !== node.uuid));
    if (!Number(node.uuid)) {
      this.deletedNodes.push({ uuid: node.uuid });
    }
    this.setSaveIsNeeded(true);
  }

  public deleteChannel(channel: Channel): void {
    if (!Number(channel.uuid)) {
      this.deletedChannels.push({ uuid: channel.uuid });
    }
    this.setSaveIsNeeded(true);
  }

  public postDirection(direction: Direction): void {
    this.directions$.next([...this.directions$.value, direction]);
    this.setSaveIsNeeded(true);
  }

  public patchDirection(direction: Direction): void {
    const updatedValue = this.directions$.value.map(item => {
      return item.uuid === direction.uuid ? direction : item;
    });
    this.directions$.next(updatedValue);
    this.setSaveIsNeeded(true);
  }

  public deleteDirection(direction: Direction): void {
    this.directions$.next(this.directions$.value.filter(current => current.uuid !== direction.uuid));
    if (!Number(direction.uuid)) {
      this.deletedDirections.push({ uuid: direction.uuid });
    }
    this.setSaveIsNeeded(true);
  }

  public isDirectionOverlapping(start: DisplayNode, end: DisplayNode): boolean {

    return start.baseObject.uuid === end.baseObject.uuid || !!this.directions$.value.find(item => {
      return (item.node_out_uuid === start.baseObject.uuid
          && item.node_in_uuid === end.baseObject.uuid)
        || (item.node_out_uuid === end.baseObject.uuid
          && item.node_in_uuid === start.baseObject.uuid);
    });
  }

  public setSaveIsNeeded(event: boolean): void {
    this.saveIsNeeded$.next(event);
  }

  public saveScheme(): Observable<any> {
    const nodes = this.nodes$.value.map(item => {
      return this.clearEmptyFields(item);
    });

    return this.http.patch('/api/azimuth_scheme', {
      nodes,
      deleted_nodes: this.deletedNodes,
      directions: this.directions$.value,
      deleted_directions: this.deletedDirections,
      deleted_channels: this.deletedChannels,
    });
  }

  public getConnectedDirections(node: Node): Direction[] {
    return this.directions$.value.filter(direction => {
      return node.uuid === direction.node_out_uuid || node.uuid === direction.node_in_uuid;
    });
  }

  public getConnectedNodes(node: Node): Node[] {
    const connectedEdges = this.getConnectedDirections(node);

    const nodesUids = connectedEdges.map(item => item.node_in_uuid === node.uuid ? item.node_out_uuid : item.node_in_uuid);
    nodesUids.push(node.uuid);
    return this.nodes$.value.filter(item => nodesUids.includes(item.uuid));
  }

  private clearEmptyFields(node): Node {
    if (!node.deploy_time) {
      delete node.deploy_time;
    }
    if (!node.division) {
      delete node.division;
    }

    return node;
  }

  private getData(): void {
    this.getSelectors().subscribe(res => {
      this.selectors = res;
    });
  }
}
