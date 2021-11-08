import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface IrzGroup {
  uuid: string;
  name: string;
  code: string;
}

const routePaths = {
  'examples': 'Общее',
  'task': 'Общее',
  'settings': 'Общее',
  'monitoring-of-transfer-to-ws-bg': '8.1.3',
  'bpla': '8.1.4',
  'plan': '8.1.5',
  'communication-nodes': '8.1.6',
  'status-monitoring-of-control-points': '8.1.9',
  'the-composition-of-the-forces-and-means-of-pdt': '8.2.2',
  'monitoring': '8.2.20',
  'ia-monitoring': '8.2.29',
  'commander-order': '8.2.30',
  'desant-monitoring': '8.2.4',
};

@Injectable({
  providedIn: 'root',
})
export class IrzGroupService {

  public irzGroups: IrzGroup[];

  constructor(private httpClient: HttpClient) {
  }

  public determineIrzGroup(pathName: string): string {
    return this.findIrzGroupUuid(pathName);
  }

  public getIrzGroups(): void {
    this.httpClient.get<IrzGroup[]>('/api/irz-group').subscribe(res => this.irzGroups = res);
  }

  private findIrzGroupUuid(pathName: string): string {
    return (this.irzGroups.filter(item => item.code === routePaths[pathName]))[0]?.uuid;
  }
}
