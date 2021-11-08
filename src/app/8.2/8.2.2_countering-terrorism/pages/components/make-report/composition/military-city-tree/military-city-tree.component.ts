import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AddMilitaryCityComponent } from './add-military-city/add-military-city.component'
import { MilitaryCity } from '../../../../../interfaces/interface'
import { StateService } from '../../../../services/state.service';
import { MilitaryUnitHierarchyItem } from '../../../../../../../shared/components/ospo/military-units/military-units-sidebar/interfaces/interfaces';
import { CounterListService } from '../../../../services/counter-list.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-military-city-tree',
  templateUrl: './military-city-tree.component.html',
  styleUrls: ['./military-city-tree.component.scss']
})
export class MilitaryCityTreeComponent implements OnInit, OnDestroy {

  public dataSource: MilitaryCity[];
  public selectedItem: MilitaryCity[];
  public onSelected: boolean = false;
  public militaryUnit: MilitaryUnitHierarchyItem;
  public id: string;
  public subscriptions: Subscription;

  @Output() onSelectItem = new EventEmitter<MilitaryCity>();

  constructor(
    private httpCounter: CounterListService,
    private changeDetectorRef: ChangeDetectorRef,
    private dialogService: DialogService,
    private state: StateService,
  ) { }

  public ngOnInit(): void {
    this.state.returnMilitaryUnit().subscribe(res => {
      this.militaryUnit = res;
      this.getReportUuid();
    })
  }

  public ngOnDestroy(): void {
  }

  public getReportUuid(): void {
    this.subscriptions = this.state.returnReportUuid().subscribe(res => {
      this.id = res;
      this.getTreeData();
    })
    this.subscriptions.unsubscribe();
  }

  public selectItem(item: MilitaryCity): void {
    this.onSelected = true;
    this.onSelectItem.emit(item);
  }

  public getTreeData(): void {
    this.httpCounter.getReport().subscribe(res => {
      this.dataSource = res?.gip_tree;
      this.changeDetectorRef.detectChanges();
    })
  }

  public addMilitaryCity(): void {
    this.dialogService.open(AddMilitaryCityComponent, {
      header: 'Военный городок',
    }).onClose.pipe(filter(res => res)).subscribe(res => {
      this.getReport();
    })
  }

  private getReport(): void {
    this.httpCounter.httpReport(this.id).subscribe(res => this.httpCounter.report.next(res))
  }
}

