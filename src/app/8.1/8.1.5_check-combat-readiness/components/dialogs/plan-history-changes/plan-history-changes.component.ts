import { Component, OnInit } from '@angular/core';
import { PlanHistoryChange, HISTORY_CHANGES_STATUS_ICONS, HISTORY_CHANGES_STATUS_NAMES } from './plan-history-changes.types';
import { PlanHistoryChangesService } from './plan-history-changes.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CheckCombatReadinessDataService } from '../../../services/check-combat-readiness-data.service';
import { LoaderService } from '@app/shared/components/loader/loader.service';


@Component({
  selector: 'app-plan-history-changes',
  templateUrl: './plan-history-changes.component.html',
  styleUrls: ['./plan-history-changes.component.scss'],
  providers: [LoaderService]
})
export class PlanHistoryChangesComponent implements OnInit {

  public planHistoryChanges: PlanHistoryChange[];
  public statusIcon = HISTORY_CHANGES_STATUS_ICONS;
  public statusNames = HISTORY_CHANGES_STATUS_NAMES;

  constructor(
    public loader: LoaderService,
    private historyService: PlanHistoryChangesService,
    public config: DynamicDialogConfig,
    private checkCombatReadinessData: CheckCombatReadinessDataService,
  ) {
  }

  ngOnInit(): void {
    if (this.config.data?.key === 'inspection') {
      this.loader.startLoading(this.historyService.getInspectionHistory(this.checkCombatReadinessData.selectedInspectionId)).subscribe(res => {
        this.planHistoryChanges = res;
      });
    } else if (this.config.data?.key === 'scheduler') {
      this.loader.startLoading(this.historyService.getScheduleHistory(this.checkCombatReadinessData.selectedScheduleUuid)).subscribe(res => this.planHistoryChanges = res);
    } else if (this.config.data?.key === 'plan') {
      this.loader.startLoading(this.historyService.getPlanHistory(this.config.data?.uuid)).subscribe(res => {
        this.planHistoryChanges = res
      });
    } else {
      this.loader.startLoading(this.historyService.getInspectionHistory(this.checkCombatReadinessData.selectedScheduleUuid)).subscribe
      (res => this.planHistoryChanges = res);
    }
  }
}
