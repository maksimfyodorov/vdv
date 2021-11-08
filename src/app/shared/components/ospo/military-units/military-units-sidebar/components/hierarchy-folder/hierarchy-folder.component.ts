import { Component, Input, OnInit } from '@angular/core';
import { HierarchyFolder } from '../../../../../nodes-hierarchy/nodes-hierarchy.types';
import { HierarchyService } from '../../services/hierarchy.service';
import { MilitaryUnitHierarchyItem } from '../../interfaces/interfaces';

@Component({
  selector: 'app-hierarchy-folder',
  templateUrl: './hierarchy-folder.component.html',
  styleUrls: ['./hierarchy-folder.component.scss']
})
export class HierarchyFolderComponent implements OnInit, HierarchyFolder<MilitaryUnitHierarchyItem> {

  @Input()
  public set data(value: any[]) {
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

  @Input() public selectedItem: any;


  public _data: any[];
  public _sidebarExpanded: boolean;

  public _deepLevel;

  constructor(private hierarchy: HierarchyService) { }

  public ngOnInit(): void {
  }


  public toggleExpanding(item: any): void {
    this.toggleExpandingRecursively(item.children, !this.isChildExpanded(item));
  }

  public selectionChanged(item: any): void {
    this.selectedItem = item;
    this.hierarchy.selectedItem$.next(this.selectedItem);
  }

  public isChildExpanded(item: any): boolean {
    return item.children.some(child => child.expanded);
  }

  private toggleExpandingRecursively(nodes: any[], expand: boolean): void {
    nodes.forEach(node => {
      node.expanded = expand;
      if (!expand) {
        this.toggleExpandingRecursively(node.children, expand);
      }
    });
  }

}
