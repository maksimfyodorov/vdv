import { Component, DoCheck, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { RoleModelService } from '../../../../../../shared/services/role-model.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateScheduleService } from './create-schedule.service';
import { LoaderService } from '../../../../../../shared/components/loader/loader.service';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.scss'],
  providers: [LoaderService],
})
export class CreateScheduleComponent implements OnInit {

  public yearOptions = [];
  public reasonOptions = [];
  public form: FormGroup;
  public currentReason: any;

  constructor(
    public dialogRef: DynamicDialogRef,
    public roleService: RoleModelService,
    public loader: LoaderService,
    private http: CreateScheduleService,
  ) {
    this.initForm();
  }

  public ngOnInit(): void {
    this.getAvailableSchedules();
  }

  public createSchedule(): void {
    this.loader.startLoading(this.http.createSchedule(this.form.value)).subscribe(res => {
      this.dialogRef.close({
        status: true,
        schedule: res
      });
    });
  }

  public close(): void {
    this.dialogRef.close();
  }

  public scheduleChanged($event: any): void {
    this.currentReason = this.yearOptions.find(item => item.year === $event.value).reason;
    this.form.get('reason_id').setValue(this.currentReason?.id);
  }

  private getAvailableSchedules(): void {
    this.loader.startLoading(this.http.getAvailableSchedules()).subscribe(res => {
      this.yearOptions = res.schedules;
      this.reasonOptions = res.reasons;
    });
  }

  private initForm(): void {
    this.form = new FormGroup({
      year: new FormControl('', Validators.required),
      reason_uuid: new FormControl('', Validators.required),
    });
  }
}
