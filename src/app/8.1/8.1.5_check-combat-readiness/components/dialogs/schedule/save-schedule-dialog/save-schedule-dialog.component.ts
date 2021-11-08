import { Component } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CheckCombatReadinessService } from '../../../../services/check-combat-readiness.service';

@Component({
  selector: 'app-save-schedule-dialog',
  templateUrl: './save-schedule-dialog.component.html',
  styleUrls: ['./save-schedule-dialog.component.scss']
})
export class SaveScheduleDialogComponent {

  constructor(
    public dialogRef: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig,
    private dialogService: DialogService,
    private http: CheckCombatReadinessService,
  ) { }

  public saveSchedule(): void {
    this.http.approveSchedule(this.dialogConfig.data.selected.uuid, {new_status: 'saved'}).subscribe(res => {
      this.dialogRef.close({status: true, scheduleUuid: this.dialogConfig.data.selected.uuid});
    });
  }
}
