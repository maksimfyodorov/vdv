import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { MilitaryUnitHierarchyItem } from '../../../../../shared/components/ospo/military-units/military-units-sidebar/interfaces/interfaces';
import { TransferPlan, TransferType } from '../../../interfaces/interface';
import { EventTableDataService } from '../../../services/event-table-data.service';
import { EventTableService } from '../../../services/event-table.service';
import { mergeMap } from 'rxjs/operators';
import { PlanCreateComponent } from '../../plan-create/plan-create.component';
import { HistoryModalComponent } from '../history-modal/history-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-monitor-signal',
  templateUrl: './monitor-signal.component.html',
  styleUrls: ['./monitor-signal.component.scss']
})
export class MonitorSignalComponent implements OnInit, OnDestroy {

  public plan: TransferPlan[] = [];
  public selectedPlan: TransferPlan;
  public militaryUnit: MilitaryUnitHierarchyItem;
  public editFlag: boolean = false;
  public addVfFlag: boolean = false;
  public timerFlag: boolean = false;
  public transferTypes: TransferType[];
  public subscriptions: Subscription[] = [];

  public showEvent: any[] = [];

  public selectedType: TransferType = {
    uuid: 'safsafasfa',
    name: 'Постоянная всБГ -> Повышенная всБГ -> Военная опасность всБГ -> Полная всБГ',
    index: [1, 2, 3, 4],
  }

  public selectedTypeCopy: TransferType;

  constructor(
    public dialogService: DialogService,
    public eventTableDataService: EventTableDataService,
    public httpService: EventTableService,
  ) { }

  public ngOnInit(): void {
    this.subscriptions.push(this.eventTableDataService.returnMilitaryUnit().subscribe(res => {
      this.onSelectMilitaryUnit(res)
    }))
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(el => el.unsubscribe());
  }

  public deletePlan(): void {
    if (this.selectedPlan) {
      this.httpService.deletePlan(this.selectedPlan.uuid).pipe(
        mergeMap(() => this.httpService.getPlan(this.militaryUnit.id))
      ).subscribe(res => {
        this.plan = res;
        this.selectedPlan = this.plan[0];
      })
    }
  }

  public addPlan(): void {
    this.subscriptions.push(this.dialogService.open(PlanCreateComponent, {
      header: 'Наименование плана',
      width: '600px',
    }).onClose.subscribe(res => {
      if (this.militaryUnit) this.httpService.postPlan(this.militaryUnit.id, res).subscribe(plan => {
        this.selectedPlan = plan;
        this.plan.push(plan);
      })
    }));
  }

  public selectPlan(): void {
    this.httpService.getTransferUnit(this.selectedPlan.uuid).subscribe()
  }

  public changeEditFlag(): void {
    this.editFlag = !this.editFlag;
  }

  public showHistory(): void {
    this.subscriptions.push(this.dialogService.open(HistoryModalComponent, {
      header: 'История плана',
      width: '1000px',
      data: {
        uuid: this.selectedPlan.uuid,
      }
    }).onClose.subscribe());
  }

  public onSelectMilitaryUnit(militaryUnit: MilitaryUnitHierarchyItem): void {
    if (militaryUnit) {
      this.militaryUnit = militaryUnit;
      this.httpService.getPlan(militaryUnit.id).subscribe(plans => {
        if (plans) {
          this.plan = plans;
          this.selectedPlan = this.plan[0];
          this.selectPlan();
        }
        else {
          this.selectedPlan = null;
        }
      })
    }
  }
}
