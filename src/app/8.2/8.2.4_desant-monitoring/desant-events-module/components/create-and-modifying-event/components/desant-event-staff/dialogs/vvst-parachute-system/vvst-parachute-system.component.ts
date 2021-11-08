import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {kavo} from './mock';
import {ColumnsVVST} from '../../../../types/new-desant-event-dialog.types';

export const COLS: ColumnsVVST[] = [
  {field: 'node', header: 'Группа техники', template: 'nodeTemplate'},
  {field: 'summary', header: '', template: 'summaryTemplate'},
  {field: 'state', header: 'По штату', template: 'stateTemplate'},
  {field: 'stock', header: 'В наличии', template: 'stockTemplate'},
  {field: 'excess', header: 'Излишек', template: 'excessTemplate'},
  {field: 'lack', header: 'Недостаток', template: 'lackTemplate'},
  {field: 'broken', header: 'Неисправно', template: 'brokenTemplate'},
];

@Component({
  selector: 'app-vvst-parachute-system',
  templateUrl: './vvst-parachute-system.component.html',
  styleUrls: ['./vvst-parachute-system.component.scss']
})

export class VvstParachuteSystemComponent implements OnInit, AfterViewInit {
  public columns: ColumnsVVST[];
  public tableDataSource = kavo;


  constructor(private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.columns = COLS;
    this.changeDetectorRef.detectChanges();
  }

}
