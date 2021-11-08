import { Component, Host, OnInit, Provider } from '@angular/core';
import { Plan } from '@app/8.1/8.1.4_uav-information/components/flight-plans/types/plan';
import { Period, PeriodsOverTheYears } from '@app/8.1/8.1.4_uav-information/components/flight-plans/types/period';
import { FormControl, FormGroup } from '@angular/forms';
import { Document } from '@app/shared/components/ospo/documents/attach-document-dialog/attach-document-dialog.types';
import { FlightPlanService } from '@app/8.1/8.1.4_uav-information/components/flight-plans/services/flight-plan.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanDataService } from '@app/8.1/8.1.4_uav-information/components/flight-plans/components/plan/services/plan-data.service';
import { FlightPlansComponent } from '@app/8.1/8.1.4_uav-information/components/flight-plans/flight-plans.component';
import { SelectionTreeService } from '@app/8.1/8.1.4_uav-information/components/uav-node-folder/services/selection-tree.service';
import { RoleModelService } from '@app/shared/services/role-model.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
  providers: [PlanDataService]
})
export class PlanComponent implements OnInit {
  public arrayOfYear: number[] = [];
  public planData: Plan;
  public arrayOfPeriodByYear: Period[];
  public periodForm: FormGroup;
  public documents: Document[];
  private periodsArray: PeriodsOverTheYears[];

  constructor(
    public planService: FlightPlanService,
    public selectionTreeService: SelectionTreeService,
    public roleService: RoleModelService,
    private route: ActivatedRoute,
    private router: Router,
    private planDataService: PlanDataService,
    @Host() private flightPlansComponent: FlightPlansComponent
  ) {
    this.createPeriodForm()
  }

  public ngOnInit(): void {
    this.getPeriods()
  }

  public getPeriods(): void {
    const selectPeriodId = this.route.snapshot.queryParams.period;
    let selectedYear;
    let queryParams;

    this.planService.getFlightPlanPeriods().subscribe(periods => {
      this.periodsArray = periods;
      this.arrayOfYear = periods.map(item => item.year).sort().reverse();
      selectedYear = Number(this.route.snapshot.queryParams.year) || this.arrayOfYear[0];
      this.arrayOfPeriodByYear = this.planDataService.createPeriodsByYear(periods, selectedYear);
      this.periodForm.get('year').setValue(selectedYear);
      this.periodForm.get('period').setValue(selectPeriodId);
      queryParams = { ...this.route.snapshot.queryParams, year: selectedYear };
      this.router.navigate([], { relativeTo: this.route, queryParams, replaceUrl: true }).catch();
    });
  }

  public yearChanges(year: { originalEvent: MouseEvent, value: number }): void {
    const queryParams = { year: year.value };
    this.arrayOfPeriodByYear = this.planDataService.createPeriodsByYear(this.periodsArray, year.value);
    this.planData = null;
    this.flightPlansComponent.selectedTask = null;
    this.flightPlansComponent.tasks = [];
    this.router.navigate([], { relativeTo: this.route, queryParams, replaceUrl: true }).catch();
  }

  public periodChanges(period: { originalEvent: MouseEvent, value: string }): void {
    const queryParams = { year: this.route.snapshot.queryParams.year, period: period.value };
    this.flightPlansComponent.selectedTask = null;

    this.router.navigate([], { relativeTo: this.route, queryParams, replaceUrl: true }).catch();
  }

  public getLabelOfDocuments(): string {
    return this.documents?.length
      ? this.documents.length === 1 ? this.documents[0]?.name : 'Выбрано несколько документов'
      : '';
  }

  public openDocumentsModal(): void {
    this.planService.openDocumentationModalForAttach(this.planData.uuid, this.documents).subscribe(res => {
      this.documents = res.documents;
    });
  }

  public createPlan(): void {
    const periodForm = this.periodForm.value;

    this.planService.openConfirmModalForCreatePlan(periodForm).subscribe(res => {
      this.planData = res;
    });
  }

  public deletePlan(): void {
    this.planService.openConfirmModalForDeletePlan(this.planData.uuid).subscribe(_ => {
      this.planData = {} as Plan;
      this.flightPlansComponent.tasks = [];
    });
  }

  public changePlanStatusOnDelete(): void {
    this.planService.openConfirmModalForChangePlanStatusOnDelete(this.planData.uuid).subscribe(res => this.planData = res);
  }

  public savePlan(): void {
    this.planService.openConfirmModalForSavePlan(this.planData.uuid).subscribe(res => {
      this.planData = res;
      this.flightPlansComponent.tasks = this.flightPlansComponent.tasks.map(task => {
        if (task.status_name === 'new') {
          task.status_name = 'planned';
        }

        return task;
      });
    });
  }

  public checkHistory(): void {
    this.planService.openHistoryModal(this.planData.uuid);
  }

  private createPeriodForm(): void {
    const currentYear = this.route.snapshot.queryParams.year || new Date().getFullYear();

    this.periodForm = new FormGroup({
      year: new FormControl(currentYear),
      period: new FormControl(),
    });
  }
}
