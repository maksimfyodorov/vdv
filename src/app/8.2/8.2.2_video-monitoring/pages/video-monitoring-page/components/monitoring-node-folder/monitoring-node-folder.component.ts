import { Component, Input, OnInit } from '@angular/core';
import { UavSelectionHierarchy } from '../../../../../../8.1/8.1.4_uav-information/components/uav-node-folder/types/uav-selection-hierarchy';
import { AzimuthFolderSelectionEmitter } from '../../../../../../8.1/8.1.6_communication-nodes/tabs/azimuth-scheme/components/nodes-scheme/nodes.scheme.types';
import { VideoMonitoringService } from '../../services/video-monitoring.service';

@Component({
  selector: 'app-monitoring-node-folder',
  templateUrl: './monitoring-node-folder.component.html',
  styleUrls: [
    '../../../../../../8.1/8.1.6_communication-nodes/tabs/azimuth-scheme/components/hierarchy-folder/hierarchy-folder.component.scss',
    '../../../../../../8.1/8.1.4_uav-information/components/uav-node-folder/uav-node-folder.component.scss',
  ],
})
export class MonitoringNodeFolderComponent {
  @Input()
  public set data(value: UavSelectionHierarchy[]) {
    this._data = value;
  }

  @Input()
  public set folderExpanded(value: boolean) {
    this._folderExpanded = value;
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

  public _data: UavSelectionHierarchy[];
  public _folderExpanded = true;
  public _sidebarExpanded: boolean;

  public isChildExpanded = false;
  public _deepLevel;

  constructor(private monitoringService: VideoMonitoringService) {}

  public toggleExpanding(event): void {
    event.stopPropagation();
    this.isChildExpanded = !this.isChildExpanded;
  }

  public onClick(item: UavSelectionHierarchy): void {
    this.selectedItem = { uuid: item.id, emitter: 'hierarchy' };
    this.monitoringService.selectedMilitaryUnit$.next({
      id: Number(item.id),
      name: item.label,
      common_number_name: '',
    });
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
}
