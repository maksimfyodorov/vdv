import { Component, OnInit } from '@angular/core';
import { HierarchyMode } from '../../../../shared/components/ospo/ospo-security/types/security.types';
import { switchMap, tap } from 'rxjs/operators';
import { CompletenessService } from './completeness.service';
import { LoaderService } from '../../../../shared/components/loader/loader.service';
import { NodesSchemeHierarchyItem } from '../../../8.1.6_communication-nodes/tabs/azimuth-scheme/components/nodes-scheme/nodes.scheme.types';
import {
  BattlePost,
  CommunicationCenter,
  CommunicationNode,
} from '../../../8.1.6_communication-nodes/tabs/communication-center/types/nodes';
import { Subscription } from 'rxjs';
import { SecurityService } from '../../../8.1.6_communication-nodes/tabs/communication-center/tabs/security/services/security.service';
import { SecurityHierarchyService } from '../../../8.1.6_communication-nodes/tabs/communication-center/tabs/security/services/security-hierarchy.service';
import { SelectionTreeService } from '../../../8.1.4_uav-information/components/uav-node-folder/services/selection-tree.service';

@Component({
  selector: 'app-completness',
  templateUrl: './completness.component.html',
  styleUrls: ['./completness.component.scss']
})
export class CompletnessComponent implements OnInit {
  public hierarchyDataSource: NodesSchemeHierarchyItem[];
  public selectedUnitUuid;
  public selectedHierarchyItem;
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
    public selectionTreeService: SelectionTreeService,
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
      this.selectionTreeService.selectionTreeSelectItemSubject.subscribe((res) => {
        this.selectedHierarchyItem = res;
        this.selectedUnitUuid = res.uuid;
        console.log(this.selectedHierarchyItem);
        console.log(this.selectedUnitUuid);
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

  public createNewShdk(data: { value: any, shdk: any }): void {
    const divisionId = data.value.parent.id;

    this.completenessService
      .createNewShdk(divisionId, { shdk: data.shdk, group_code: this.groupCode })
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

  private flatHierarchy(hierarchy: any) {
    console.log(hierarchy);
    const newHierarchy = {
      ...hierarchy,
      hierarchy: {
        point: 'caption',
        label: 'Всего',
        total: { ...hierarchy.total },
        children: [
          {
            ...hierarchy.hierarchy,
            children: hierarchy.hierarchy?.children.filter((child) => child.point !== 'center'),
          },
          ...hierarchy.hierarchy?.children.filter((child) => child.point === 'center'),
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
