import { Component, OnInit } from '@angular/core';
import { NodeInfoDialogComponent } from './components/dialogs/node-info-dialog/node-info-dialog.component';
import { NodesSchemeService } from './components/nodes-scheme/services/nodes-scheme.service';
import { utils } from 'ues';
import { MatDialog } from '@angular/material/dialog';
import { Direction, NodesSchemeHierarchyItem } from './components/nodes-scheme/nodes.scheme.types';
import { NodesHierarchyService } from './components/nodes-scheme/services/nodes-hierarchy.service';
import { DirectionInfoDialogComponent } from './components/dialogs/direction-info-dialog/direction-info-dialog.component';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-azimuth-scheme',
  templateUrl: './azimuth-scheme.component.html',
  styleUrls: ['./azimuth-scheme.component.scss'],
})
export class AzimuthSchemeComponent implements OnInit {
  public hierarchyData: NodesSchemeHierarchyItem[];

  constructor(
    public readonly nodesHierarchy: NodesHierarchyService,
    private readonly nodesData: NodesSchemeService,
    private readonly dialog: MatDialog,
  ) { }

  public ngOnInit(): void {
    this.setProxyUesMapUrl();
  }

  public resetSelection(): void {
    this.nodesHierarchy.selectedItem$.next({ uuid: 0, emitter: 'hierarchy' });
  }

  public openDirectionInfoDialog($event): void {
      this.dialog.open(DirectionInfoDialogComponent, {
        width: '500px',
        hasBackdrop: false,
        autoFocus: false,
        data: $event,
      });
  }

  public openNodeInfoDialog(uuid: string): void {
    const node = this.nodesData.nodes$.value.find(n => n.uuid === uuid);

    if (node) {
      this.dialog.open(NodeInfoDialogComponent, {
        width: '500px',
        hasBackdrop: false,
        autoFocus: false,
        data: node,
      });
    }
  }

  private setProxyUesMapUrl(): void {
    utils.setProxyUrl(environment.pkrooUrl);
  }
}
