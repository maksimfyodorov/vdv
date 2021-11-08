import { Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';
import { HierarchyFolder } from './nodes-hierarchy.types';

@Component({
  selector: 'app-nodes-hierarchy',
  templateUrl: './nodes-hierarchy.component.html',
  styleUrls: ['./nodes-hierarchy.component.scss'],
})
export class NodesHierarchyComponent {
  @Input() public switchLabel: string;
  @Input() public isSwitchChecked = true;
  @Input() public showDivisionsSwitch = true;
  @Output() public switchToggle: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public emitSidebarExpand: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() set dataSource(value) {
    if (value && this.folder) {
      this.setFolderData(value);
    }
  }

  @Input() set selectedItem(value: unknown) {
    if (value && this.folder) {
      this.folder.selectedItem = value;
    }
  }

  @ContentChild('folder') public folder: HierarchyFolder<unknown>;

  public sidebarExpanded = false;

  constructor() {}

  public expandSidebar(): void {
    this.sidebarExpanded = !this.sidebarExpanded;
    this.folder.sidebarExpanded = this.sidebarExpanded;
    this.emitSidebarExpand.emit(this.sidebarExpanded);
  }

  public emitSwitchValue(status: boolean): void {
    this.switchToggle.emit(status);
  }

  private setFolderData(value): void {
    this.folder.data = this.hideRecursively(value);
    this.folder.deepLevel = [];
    this.folder.sidebarExpanded = this.sidebarExpanded;
  }

  private hideRecursively(nodes: HierarchyFolder<unknown>[], firstLevelFlag = true): HierarchyFolder<unknown>[] {
    return nodes.map((node) => {
      if (node?.children.length) {
        node.children = this.hideRecursively(node.children, false);
      }

      return { ...node, expanded: firstLevelFlag };
    });
  }
}
