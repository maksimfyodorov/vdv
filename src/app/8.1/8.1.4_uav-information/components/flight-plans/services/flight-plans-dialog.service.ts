import { Injectable } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import {
  PlanModalIntelligenceComponent,
  PlanModalIntelligenceDisableComponent,
  PlanModalIntelligenceEditComponent
} from '../../../modals/task-modal/components/plan-modal-tabs/plan-modal-intelligence/plan-modal-intelligence.component';
import {
  PlanModalParametersComponent,
  PlanModalParametersDisableComponent,
  PlanModalParametersEditComponent
} from '../../../modals/task-modal/components/plan-modal-tabs/plan-modal-parameters/plan-modal-parameters.component';
import {
  PlanModalTrackPointsComponent,
  PlanModalTrackPointsDisableComponent,
  PlanModalTrackPointsEditComponent
} from '../../../modals/task-modal/components/plan-modal-tabs/plan-modal-track-points/plan-modal-track-points.component';
import {
  PlanModalReportComponent,
  PlanModalReportDisableComponent,
  PlanModalReportEditComponent
} from '../../../modals/task-modal/components/plan-modal-tabs/plan-modal-report/plan-modal-report.component';
import { Observable } from 'rxjs';
import { Task } from '../types/tasks';
import { TaskModalComponent } from '../../../modals/task-modal/task-modal.component';
import { ConfirmationDialogComponent } from '../../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { TaskModeGroup } from '../../../modals/task-modal/types/task-modal';

export const TASKS_COMPONENTS_FOR_CREATE = [PlanModalIntelligenceComponent, PlanModalParametersComponent, PlanModalTrackPointsComponent, PlanModalReportComponent];
export const TASKS_COMPONENTS_FOR_EDIT = [PlanModalIntelligenceEditComponent, PlanModalParametersEditComponent, PlanModalTrackPointsEditComponent, PlanModalReportEditComponent];
export const TASKS_COMPONENTS_FOR_PLANNED = [PlanModalIntelligenceDisableComponent, PlanModalParametersDisableComponent, PlanModalTrackPointsDisableComponent, PlanModalReportDisableComponent];
export const TASKS_COMPONENTS_FOR_VIEW = [PlanModalIntelligenceDisableComponent, PlanModalParametersDisableComponent, PlanModalTrackPointsDisableComponent, PlanModalReportEditComponent];

@Injectable()
export class FlightPlansDialogService {

  constructor(
    private dialogService: DialogService,
  ) { }

  public openTaskModal(mode: TaskModeGroup, tabComponents: unknown, task?: Task): Observable<any> {
    return this.dialogService.open(TaskModalComponent, {
      height: '710px',
      header: 'Задание на полет',
      contentStyle: { height: '100%', overflow: 'visible' },
      data: {
        mode,
        task,
        tabComponents,
      },
    }).onClose;
  }

  public openConfirmModal(config: any): Observable<boolean> {
    return this.dialogService.open(ConfirmationDialogComponent, config).onClose;
  }
}
