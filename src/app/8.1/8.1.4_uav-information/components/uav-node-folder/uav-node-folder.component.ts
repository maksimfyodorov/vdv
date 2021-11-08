import { Component, Input, OnDestroy } from '@angular/core';
import { UavSelectionHierarchy } from './types/uav-selection-hierarchy';
import { SelectionTreeService } from './services/selection-tree.service';
import { Subscription } from 'rxjs';

@Component({
             selector: 'app-uav-node-folder',
             templateUrl: './uav-node-folder.component.html',
             styleUrls: ['../../../8.1.6_communication-nodes/tabs/azimuth-scheme/components/hierarchy-folder/hierarchy-folder.component.scss', './uav-node-folder.component.scss'],
           })
export class UavNodeFolderComponent implements OnDestroy {
  public _sidebarExpanded: boolean;
  public _deepLevel;

  @Input()
  public set data(value: UavSelectionHierarchy[]) {
    this._data = value;
    this.expandNode(value);
  }

  @Input()
  public set sidebarExpanded(value: boolean) {
    this._sidebarExpanded = value;
  }

  @Input()
  public set deepLevel(value) {
    this._deepLevel = [...value, 1];
  }

  @Input()
  public selectedItem: number;

  public _data: UavSelectionHierarchy[];
  private subscription: Subscription;


  constructor(
    private selectionTreeService: SelectionTreeService,
  ) {
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  public toggleExpanding(item: UavSelectionHierarchy): void {
    this.toggleExpandingRecursively(item.children, !this.isChildExpanded(item));
  }

  public onClick(item: UavSelectionHierarchy): void {
    this.selectedItem = item.id;
    this.selectionTreeService.militaryUnitId = item.id;
    this.selectionTreeService.selectionTreeSelectItemSubject.next({ uuid: item.id });
  }

  public getClass(item: UavSelectionHierarchy): string {

    const status = {
      done: 'green',
      start: 'red',
      inWork: 'yellow',
    };

    return status[item.status];
  }

  public getFoldedClass(item: UavSelectionHierarchy): string {
    const status = {
      done: 'folded-green',
      start: 'folded-red',
      inWork: 'folded-yellow',
    };

    return status[item.status];
  }

  public isChildExpanded(item: UavSelectionHierarchy): boolean {
    return item.children.some(child => child.expanded);
  }

  private toggleExpandingRecursively(nodes: UavSelectionHierarchy[], expand: boolean, firstChild = true): void {
    nodes.forEach(node => {
      node.expanded = expand;
      if (!expand) {
        this.toggleExpandingRecursively(node.children, expand, false);
      }
    });
  }

  private expandNode(value: UavSelectionHierarchy[]): void {
    if (!this.selectionTreeService.recursiveSelectedItemId) {
      value.forEach(item => {
        if (item.id === +this.selectedItem) {
          this.selectionTreeService.recursiveSelectedItemId = item.id;
        }

        item.expanded = true;
      });
    }
  }
}
