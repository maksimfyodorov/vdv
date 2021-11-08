import { Component, EventEmitter, Input, Output, SkipSelf, ViewChild } from '@angular/core';
import { SecurityHierarchy, SecurityTechStatus, SecurityTemplates, TechSecurityItem } from '../../types/security.types';
import { LoaderService } from '../../../../loader/loader.service';
import { SecurityHierarchyItem } from '../../../../../../8.1/8.1.6_communication-nodes/tabs/communication-center/types/nodes';
import { TreeTable } from 'primeng/treetable';
import { first } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-security-table',
  templateUrl: './security-table.component.html',
  styleUrls: ['./security-table.component.scss'],
  providers: [LoaderService],
})
export class SecurityTableComponent {
  @ViewChild('tableTemplates') public tableTemplates: SecurityTemplates;
  @ViewChild(TreeTable) public treeTable: TreeTable;

  @Input() public cols;
  @Input() public set dataSource(value: SecurityHierarchy) {
    if (this._dataSource) {
      this._dataSource.hierarchy = value.hierarchy;
      this._dataSource.total = value.total;
    } else {
      this._dataSource = value;
    }

    this.expandHierarchy();
  }
  public get dataSource(): SecurityHierarchy {
    return this._dataSource;
  }
  @Input() public viewSecurityItem: boolean = false;
  @Input() public disabled: boolean = false;

  @Output() public updateStatus: EventEmitter<TechSecurityItem> = new EventEmitter<TechSecurityItem>();
  @Output() public addTech: EventEmitter<SecurityHierarchyItem> = new EventEmitter<SecurityHierarchyItem>();
  @Output() public editTech: EventEmitter<TechSecurityItem> = new EventEmitter<TechSecurityItem>();
  @Output() public deleteTech: EventEmitter<TechSecurityItem> = new EventEmitter<TechSecurityItem>();
  @Output() public chooseTech: EventEmitter<any> = new EventEmitter<any>();

  private _dataSource: SecurityHierarchy;

  constructor(@SkipSelf() public loader: LoaderService) { }

  public changeTechStatus(data: any): void {
    const updatedStatus = this.setCheckboxesState(data.checked, data.data, data.condition);
    this.updateTechStatus({ item: data.data, updatedStatus });
  }

  public getTemplate(template: string): any {
    return this.tableTemplates[template];
  }

  public doAction(event: any): void {
    const action = {
      changeStatus: () => this.changeTechStatus(event.value),
      edit: () => this.openEditTechModal(event.value),
      add: () => this.openAddTechModal(event.value),
      delete: () => this.deleteItemTech(event.value),
      chooseTech: () => this.chooseTechItem(event.value),
    };

    action[event.key]?.();
  }

  private setCheckboxesState($event: boolean, data: TechSecurityItem, condition: string): SecurityTechStatus {
    let updatedStatus: SecurityTechStatus;

    for (const key in data.conditions) {
      if (data.conditions.hasOwnProperty(key)) {
        if (key !== 'uuid') {
          data.conditions[key].status = false;
          if (key === condition) {
            data.conditions[key].status = $event;
            updatedStatus = data.conditions[key];
          }
        }
      }
    }

    return updatedStatus;
  }

  private updateTechStatus(data): void {
    this.updateStatus.emit(data);
  }

  private openAddTechModal(data: SecurityHierarchyItem): void {
    this.addTech.emit(data);
  }

  private openEditTechModal(data: TechSecurityItem): void {
    this.editTech.emit(data);
  }

  private deleteItemTech(data: TechSecurityItem): void {
    this.deleteTech.emit(data);
  }

  private chooseTechItem(value: any) {
    this.chooseTech.emit(value);
  }

  private expandHierarchy(): void {
    for (const key in this._dataSource?.hierarchy) {
      this._dataSource.hierarchy[key].expanded = true;
      this._dataSource.hierarchy[key].children.forEach((children) => this.expandChild(children));
    }
  }

  private expandChild(child): void {
    child.expanded = true;
    if (child.children?.length) {
      child.children.forEach((children) => this.expandChild(children));
    }
  }
}
