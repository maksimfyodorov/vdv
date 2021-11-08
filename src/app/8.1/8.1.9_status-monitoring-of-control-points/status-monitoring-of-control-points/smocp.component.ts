import { Component, OnInit, AfterViewInit, ChangeDetectorRef, DoCheck, Output } from '@angular/core';
import { ButtonPositionChanger } from './button-position-changer';
import { SelectionTreeService } from '../../8.1.4_uav-information/components/uav-node-folder/services/selection-tree.service';
import { SecurityService } from '../../8.1.6_communication-nodes/tabs/communication-center/tabs/security/services/security.service';
import { NodesSchemeHierarchyItem } from '../../8.1.6_communication-nodes/tabs/azimuth-scheme/components/nodes-scheme/nodes.scheme.types';
import { IntercessionScheduleServiceApi } from '../pages/intercession-schedule/services/intercession-schedule.service-api';
import { IntercessionScheduleDataService } from '../pages/intercession-schedule/services/intercession-schedule-data.service';

@Component({
  selector: 'app-status-monitoring-of-control-points',
  templateUrl: './smocp.component.html',
  styleUrls: ['./smocp.component.scss'],
})
export class SmocpComponent implements OnInit, AfterViewInit {
  @Output() currentMUid;

  public IRZName = 'status-monitoring-of-control-points';
  public headerText = 'Cмены оперативного дежурства';
  buttonsPositionBeChanged = false;
  buttonPositionChanger = new ButtonPositionChanger('buttons-space', 'p-tabview-nav');
  public hierarchyDataSource: NodesSchemeHierarchyItem[];

  constructor(
    private securityService: SecurityService,
    public selectionTreeService: SelectionTreeService,
    public changeDetectorRef: ChangeDetectorRef,
    public intercessionScheduleServiceApi: IntercessionScheduleServiceApi,
    public intercessionScheduleDataService: IntercessionScheduleDataService) {

  }

  ngOnInit(): void {
    this.getHierarchyWithBattlePosts();
    this.subscribeToSelectedMu();
  }

  ngAfterViewInit(): void {
    this.selectionTreeService.createHierarchy();
    this.changeDetectorRef.detectChanges();
  }

  getMU(): void {
    this.intercessionScheduleServiceApi.getMuByMuId(this.currentMUid.uuid).subscribe(res => {
      this.intercessionScheduleDataService.MU = res;
      console.log(res);
    });
  }

  private getHierarchyWithBattlePosts(): void {
    this.securityService.getBattlePostHierarchy().subscribe((res) => {
      this.hierarchyDataSource = res;
    });
  }

  private subscribeToSelectedMu(): void {
    this.selectionTreeService.selectionTreeSelectItemSubject.subscribe(id => {
      this.currentMUid = id;
      this.getMU();
    });
  }

  tabChanged(event): void {
  }

}
