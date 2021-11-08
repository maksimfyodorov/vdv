import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AzimuthFolderSelectionEmitter, NodesSchemeHierarchyItem } from '../nodes.scheme.types';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NodesHierarchyService {
  public nodesHierarchy$: BehaviorSubject<NodesSchemeHierarchyItem[]> = new BehaviorSubject<NodesSchemeHierarchyItem[]>([]);
  public selectedItem$: Subject<AzimuthFolderSelectionEmitter> = new Subject<AzimuthFolderSelectionEmitter>();
  private nodesHierarchy: NodesSchemeHierarchyItem[] = [];

  constructor(private http: HttpClient) { }

  public updateHierarchy(): void {
    this.http.get<{hierarchy: NodesSchemeHierarchyItem[]}>('/api/azimuth_scheme/hierarchy').subscribe(res => {
      this.nodesHierarchy = res.hierarchy;
      this.nodesHierarchy$.next(this.nodesHierarchy);
    });
  }

  public switchToTemporaryNodes(items: NodesSchemeHierarchyItem[]): void {
    this.nodesHierarchy$.next(items);
  }
}
