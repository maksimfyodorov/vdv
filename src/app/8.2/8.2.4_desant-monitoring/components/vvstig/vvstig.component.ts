import { AfterViewInit, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { mockTableDataSource } from '../../../../8.1/8.1.4_uav-information/components/uav-state/mockTableDataSource/mockTableDataSource';
import { UavStateHierarchy } from '../../../../8.1/8.1.4_uav-information/components/uav-state/types/uav-state-hierarchy';
import { SecurityHierarchy } from '../../../../shared/components/ospo/ospo-security/types/security.types';
import { VVSTIGTABLE } from './mock';
import {DesantTabsService} from '../../services/desant-tabs.service';



export const COLS = [
  { field: 'node', header: 'Группа техники', template: 'nodeTemplate' },
  { field: 'summary', header: '', template: 'summaryTemplate' },
  { field: 'state', header: 'По штату', template: 'stateTemplate' },
  { field: 'stock', header: 'В наличии', template: 'stockTemplate' },
  { field: 'excess', header: 'Излишек', template: 'excessTemplate' },
  { field: 'lack', header: 'Недостаток', template: 'lackTemplate' },
  { field: 'broken', header: 'Неисправно', template: 'brokenTemplate' },
  { field: 'needed', header: 'Требуется по расчету на десантирование', template: 'neededTemplate' },
];
@Component({
  selector: 'app-vvstig',
  templateUrl: './vvstig.component.html',
  styleUrls: ['./vvstig.component.scss'],
})
export class VvstigComponent implements OnInit,  AfterViewInit {
  public selectedIndex = 0;
  public mockTableDataSource: UavStateHierarchy = mockTableDataSource;
  public cols = [];
  public hierarchy: SecurityHierarchy = VVSTIGTABLE;

  constructor( private changeDetectorRef: ChangeDetectorRef,
               private desantTabsService: DesantTabsService,
  ) { }

  ngOnInit(): void {
    this.desantTabsService.activeTabIndex = 4;
  }

  ngAfterViewInit(): void {
    this.cols = COLS;
    this.changeDetectorRef.detectChanges();
  }

  onChange($event: { index: number; }): void {
    this.selectedIndex = $event.index;
  }
}
