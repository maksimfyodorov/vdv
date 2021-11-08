import { Component, Input } from '@angular/core';
import { NodesSchemeHierarchyItem, AzimuthFolderSelectionEmitter } from '../nodes-scheme/nodes.scheme.types';
import { HierarchyFolder } from '../../../../../../shared/components/nodes-hierarchy/nodes-hierarchy.types';
import { NodesHierarchyService } from '../nodes-scheme/services/nodes-hierarchy.service';

@Component({
  selector: 'app-hierarchy-folder',
  templateUrl: './hierarchy-folder.component.html',
  styleUrls: ['./hierarchy-folder.component.scss'],
})
export class HierarchyFolderComponent implements HierarchyFolder<AzimuthFolderSelectionEmitter> {
  @Input()
  public set data(value: NodesSchemeHierarchyItem[]) {
    this._data = value;
  }

  @Input()
  public set sidebarExpanded(value: boolean) {
    this._sidebarExpanded = value;
  }

  @Input()
  public set deepLevel(value) {
    this._deepLevel = [...value, 1];
  }

  @Input() public selectedItem: AzimuthFolderSelectionEmitter;

  constructor(private hierarchy: NodesHierarchyService) { }

  public _data: NodesSchemeHierarchyItem[];
  public _sidebarExpanded: boolean;

  public _deepLevel;

  public toggleExpanding(item: NodesSchemeHierarchyItem): void {
    this.toggleExpandingRecursively(item.children, !this.isChildExpanded(item));
  }

  public selectionChanged(item: NodesSchemeHierarchyItem): void {
    this.selectedItem = { uuid: item.uuid, emitter: 'hierarchy' };
    this.hierarchy.selectedItem$.next(this.selectedItem);
  }

  public isChildExpanded(item: NodesSchemeHierarchyItem): boolean {
    return item.children.some(child => child.expanded);
  }

  private toggleExpandingRecursively(nodes: NodesSchemeHierarchyItem[], expand: boolean, firstChild = true): void {
    nodes.forEach(node => {
      node.expanded = expand;
      if (!expand) {
        this.toggleExpandingRecursively(node.children, expand, false);
      }
    });
  }
}
