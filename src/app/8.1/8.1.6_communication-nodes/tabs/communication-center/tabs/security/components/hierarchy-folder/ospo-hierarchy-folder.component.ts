import { AfterViewInit, ChangeDetectorRef, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { HierarchyFolder } from '../../../../../../../../shared/components/nodes-hierarchy/nodes-hierarchy.types';
import {
  BattlePost,
  CommunicationCenter,
  CommunicationNode,
} from '../../../../types/nodes';
import { SecurityHierarchyService } from '../../services/security-hierarchy.service';

@Component({
  selector: 'app-ospo-hierarchy-folder',
  templateUrl: './ospo-hierarchy-folder.component.html',
  styleUrls: [
    './ospo-hierarchy-folder.component.scss',
    '../../../../../azimuth-scheme/components/hierarchy-folder/hierarchy-folder.component.scss']
})
export class OspoHierarchyFolderComponent implements
  HierarchyFolder<CommunicationNode[] & CommunicationCenter[] & BattlePost[]>,
  AfterViewInit
{
  @ViewChild('cn') private cnTemplate: TemplateRef<HTMLElement>;
  @ViewChild('center') private centerTemplate: TemplateRef<HTMLElement>;
  @ViewChild('bp') private battlePostTemplate: TemplateRef<HTMLElement>;
  @ViewChild('folded') private foldedTemplate: TemplateRef<HTMLElement>;

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

  constructor(
    private hierarchy: SecurityHierarchyService,
    private changeDetection: ChangeDetectorRef,
  ) { }

  public getTemplateOf(item: CommunicationNode & BattlePost & CommunicationCenter): TemplateRef<HTMLElement> {
    if (!this._sidebarExpanded) {
      return this.foldedTemplate;
    }

    switch (item.point) {
      case 'center': return this.centerTemplate;
      case 'bp': return this.battlePostTemplate;
      default: return this.cnTemplate;
    }
  }

  public ngAfterViewInit(): void {
    this.changeDetection.detectChanges();
  }

  public toggleExpanding(item: any): void {
    this.toggleExpandingRecursively(item.children, !this.isChildExpanded(item));
  }

  public selectionChanged(item: any): void {
    this.selectedItem = item;
    this.hierarchy.changeSelectedItem(this.selectedItem);
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
