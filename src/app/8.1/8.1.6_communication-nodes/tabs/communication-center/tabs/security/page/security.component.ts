import { Component, OnDestroy, OnInit } from '@angular/core';
import { SecurityHierarchyService } from '../services/security-hierarchy.service';
import { NodesSchemeHierarchyItem } from '../../../../azimuth-scheme/components/nodes-scheme/nodes.scheme.types';
import { Subscription } from 'rxjs';
import { BattlePost, CommunicationCenter, CommunicationNode, SecurityHierarchyItem } from '../../../types/nodes';
import {
  HierarchyMode,
  SecurityHierarchy,
  SecurityTech,
  SecurityTechStatus,
  SecurityTotal,
  TechSecurityItem,
} from '../../../../../../../shared/components/ospo/ospo-security/types/security.types';
import { SecurityService } from '../services/security.service';
import { LoaderService } from '../../../../../../../shared/components/loader/loader.service';
import { DialogService } from 'primeng/dynamicdialog';
import { AddTechComponent } from '../dialogs/add-tech/add-tech.component';
import { map, switchMap, takeWhile, tap } from 'rxjs/operators';
import { EditTechComponent } from '../dialogs/edit-tech/edit-tech.component';

export const COLS = [
  { field: 'node', header: 'Группа техники', template: 'nodeTemplate' },
  { field: 'summary', header: '', template: 'summaryTemplate' },
  { field: 'state', header: 'По штату', template: 'stateTemplate' },
  { field: 'stock', header: 'В наличии', template: 'stockTemplate' },
  { field: 'excess', header: 'Излишек', template: 'excessTemplate' },
  { field: 'lack', header: 'Недостаток', template: 'lackTemplate' },
  { field: 'broken', header: 'Неисправно', template: 'brokenTemplate' },
  { field: 'controls', header: '', template: 'controlsTemplate' },
];

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss'],
  providers: [LoaderService],
})
export class SecurityComponent implements OnInit, OnDestroy {
  public cols = COLS;
  public hierarchyDataSource: NodesSchemeHierarchyItem[];
  public selectedHierarchyItem: CommunicationNode & CommunicationCenter & BattlePost;
  public subscriptions: Subscription = new Subscription();
  public hierarchMode: HierarchyMode = 'bp';
  public tableDataSource: SecurityHierarchy;
  public techMode: boolean = false;
  public filteredDate: Date = new Date();
  public maxDate: Date = new Date();
  public disabledTable: boolean;
  public hasReport: boolean;

  constructor(
    private loader: LoaderService,
    private dialog: DialogService,
    private securityService: SecurityService,
    private hierarchy: SecurityHierarchyService
  ) {}

  ngOnInit(): void {
    this.getHierarchy();
    this.subscribeToSelectionChange();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public toggleHierarchyMode($event: boolean): void {
    this.hierarchMode = $event ? 'bp' : 'cn';
    this.getHierarchy();
  }

  public updateStatus(data: { item: TechSecurityItem; updatedStatus: SecurityTechStatus }): void {
    this.loader
      .startLoading(this.securityService.updateTechStatus(data.updatedStatus, data.item.uuid))
      .subscribe((res) => this.getSecurityHierarchy());
  }

  public addTech($event: SecurityHierarchyItem): void {
    this.dialog
      .open(AddTechComponent, { header: 'Добавить технику' })
      .onClose.pipe(
        takeWhile((res) => res),
        switchMap((res) =>
          this.securityService.addTech(
            res,
            $event.division?.id || $event.military_unit?.id || $event.cn_military_unit?.id
          )
        )
      )
      .subscribe((res) => {
        this.getSecurityHierarchy();
      });
  }

  public editTech($event: TechSecurityItem): void {
    this.dialog
      .open(EditTechComponent, { header: 'Редактировать технику', data: $event })
      .onClose.pipe(
        takeWhile((res) => res),
        map((res) => ({ ...res, documents: res.documents.map((doc) => ({ uuid: doc.uuid, name: doc.name })) })),
        switchMap((res) => this.securityService.editTech(res, $event.uuid))
      )
      .subscribe((res) => this.getSecurityHierarchy());
  }

  public deleteTech($event: TechSecurityItem): void {
    this.securityService.deleteTech($event).subscribe(() => this.getSecurityHierarchy());
  }

  private getHierarchy(): void {
    this.hierarchMode === 'bp' ? this.getHierarchyWithBattlePosts() : this.getHierarchyWithoutBattlePosts();
  }

  private getHierarchyWithBattlePosts(): void {
    this.securityService.getBattlePostHierarchy().subscribe((res) => {
      this.hierarchyDataSource = res;
    });
  }

  private getHierarchyWithoutBattlePosts(): void {
    this.securityService.getCommunicationNodesHierarchy().subscribe((res) => {
      this.hierarchyDataSource = res.hierarchy;
    });
  }

  private subscribeToSelectionChange(): void {
    this.subscriptions.add(
      this.hierarchy.observeSelectedItem().subscribe((res) => {
        this.selectedHierarchyItem = res;
        this.getSecurityHierarchy();
      })
    );
  }

  public getSecurityHierarchy(): void {
    this.loader
      .startLoading(
        this.securityService.getSecurityHierarchy(
          this.selectedHierarchyItem.uuid,
          this.hierarchMode,
          this.techMode,
          this.filteredDate
        )
      )
      .pipe(
        tap((res) => {
          this.tableDataSource = this.techMode
            ? { ...res, hierarchy: this.techMode ? this.flatHierarchy(res.hierarchy) : res.hierarchy }
            : res;
        }),
        switchMap(() => this.securityService.getReportStatus())
      )
      .subscribe(({ status }) => {
        this.hasReport = status;
        this.disabledTable = this.getEditableTableStatus();
      });
  }

  private getEditableTableStatus(): boolean {
    return this.hasReport || !this.checkDate();
  }

  public generateReport(): void {
    this.securityService.generateSecurityReport().subscribe(() => {
      this.hasReport = true;
      this.disabledTable = this.getEditableTableStatus();
    });
  }

  private flatHierarchy(
    hierarchy: Array<{ total: SecurityTotal; children: SecurityTech[] & any } & any>
  ): Array<{ total: SecurityTotal; children: SecurityTech[] & any } & any> {
    const newHierarchy = [];

    newHierarchy.push({
      ...hierarchy[0],
      children: hierarchy[0].children.filter((child) => child.point === 'security' || child.point === 'security_item'),
      expanded: true,
    });

    hierarchy[0].children.forEach((child) => {
      if (child.point === 'center') {
        newHierarchy.push({
          ...child,
          children: child.children.filter((child) => child.point === 'security' || child.point === 'security_item'),
          expanded: true,
        });
      }
    });

    hierarchy[0].children.forEach((child) => {
      child.children.forEach((children) => {
        if (children.point === 'bp') {
          newHierarchy.push({
            ...children,
            children: children.children.filter(
              (child) => child.point === 'security' || child.point === 'security_item'
            ),
            expanded: true,
          });
        }
      });
    });

    return newHierarchy;
  }

  private checkDate(): boolean {
    const filteredYear = this.filteredDate.getFullYear();
    const filteredMonth = this.filteredDate.getMonth() + 1;
    const filteredDay = this.filteredDate.getDate();

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();

    return filteredYear === currentYear && filteredMonth === currentMonth && filteredDay === currentDay;
  }
}
