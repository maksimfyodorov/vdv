import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { BattlePost, CommunicationCenter, CommunicationNode } from '../../types/nodes';
import { SecurityHierarchyService } from '../security/services/security-hierarchy.service';
import { NodesSchemeHierarchyItem } from '../../../azimuth-scheme/components/nodes-scheme/nodes.scheme.types';
import { HierarchyMode } from '../../../../../../shared/components/ospo/ospo-security/types/security.types';
import { SecurityService } from '../security/services/security.service';
import { CompletenessService } from './services/completeness-table.service';
import { LoaderService } from '../../../../../../shared/components/loader/loader.service';
import { switchMap, tap } from 'rxjs/operators';
@Component({
  selector: 'app-completeness',
  templateUrl: './completeness.component.html',
  styleUrls: ['./completeness.component.scss'],
})
export class CompletenessComponent implements OnInit, OnDestroy {
  public hierarchyDataSource: NodesSchemeHierarchyItem[];
  public selectedUnitUuid: string;
  public selectedHierarchyItem: CommunicationNode & CommunicationCenter & BattlePost;
  public subscriptions: Subscription = new Subscription();
  public hierarchMode: HierarchyMode = 'bp';
  public filteredDate: Date = new Date();
  public maxDate: Date = new Date();
  public completenessHierarchy: any;
  public groupCode = '8.1.6';
  public disabledTable: boolean;
  public hasReport: boolean;

  constructor(
    private securityService: SecurityService,
    private hierarchy: SecurityHierarchyService,
    private completenessService: CompletenessService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.getHierarchyWithBattlePosts();
    this.subscribeToSelectionChange();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public getCompletenessHierarchy(): void {
    this.loader
      .startLoading(this.completenessService.getCompletenessHierarchy(this.selectedUnitUuid, this.filteredDate))
      .pipe(
        tap((res) => {
          this.completenessHierarchy = this.flatHierarchy(res);
        }),
        switchMap(() => this.completenessService.getReportStatus())
      )
      .subscribe(({ status }) => {
        this.hasReport = status;
        this.disabledTable = this.getEditableTableStatus();
      });
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
        this.selectedUnitUuid = res.uuid;
        this.getCompletenessHierarchy();
      })
    );
  }

  public toggleHierarchyMode($event: boolean): void {
    this.hierarchMode = $event ? 'bp' : 'cn';
    $event ? this.getHierarchyWithBattlePosts() : this.getHierarchyWithoutBattlePosts();
  }

  public deleteRecordShdk(recordShdkUuid: number): void {
    this.completenessService.deleteShdkRecord(recordShdkUuid).subscribe(() => this.getCompletenessHierarchy());
  }

  public deleteMilitaryMan(data: { shdkUuid: number; militaryMan: any }): void {
    this.completenessService
      .updateMilitaryMan(data.shdkUuid, data.militaryMan)
      .subscribe(() => this.getCompletenessHierarchy());
  }

  public createNewShdk(data: { divisionId: number; shdk: any }): void {
    this.completenessService
      .createNewShdk(data.divisionId, { shdk: data.shdk, group_code: this.groupCode })
      .subscribe(() => this.getCompletenessHierarchy());
  }

  public updateMilitaryMan(data: { shdkUuid: number; militaryMan: any }): void {
    this.completenessService
      .updateMilitaryMan(data.shdkUuid, data.militaryMan)
      .subscribe(() => this.getCompletenessHierarchy());
  }

  public changeStatus(data: { shdkUuid: number; status: any }): void {
    if (data.status) {
      this.completenessService
        .changeStatusShdk(data.shdkUuid, data.status)
        .subscribe(() => this.getCompletenessHierarchy());
    } else {
      this.getCompletenessHierarchy();
    }
  }

  private getEditableTableStatus(): boolean {
    return this.hasReport || !this.checkDate();
  }

  public generateReport(): void {
    this.completenessService.generateCompletenessReport().subscribe(() => {
      this.hasReport = true;
      this.disabledTable = this.getEditableTableStatus();
    });
  }

  private flatHierarchy(hierarchy: any): any {
    const newHierarchy = {
      ...hierarchy,
      hierarchy: {
        point: 'caption',
        label: 'Всего',
        total: { ...hierarchy.total },
        children: [
          {
            ...hierarchy.hierarchy,
            children: hierarchy.hierarchy.children.filter((child) => child.point !== 'center'),
          },
          ...hierarchy.hierarchy.children.filter((child) => child.point === 'center'),
        ],
      },
    };

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
