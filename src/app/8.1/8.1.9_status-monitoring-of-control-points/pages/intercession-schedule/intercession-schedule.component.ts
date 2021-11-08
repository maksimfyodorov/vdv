import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { calendarMoths, scheduleMonths } from './posts-schedule/mock';
import { BehaviorSubject } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { MonthCalendarComponent } from './month-calendar/month-calendar.component';
import { SMOCPApiService } from '../../services/smocp-api.service';
import { IntercessionScheduleServiceApi } from './services/intercession-schedule.service-api';
import { Post } from './types';
import { IntercessionScheduleDataService } from './services/intercession-schedule-data.service';

@Component({
  selector: 'app-intercession-schedule',
  templateUrl: './intercession-schedule.component.html',
  styleUrls: ['./intercession-schedule.component.scss'],
})
export class IntercessionScheduleComponent implements OnInit {

  @Input() militaryUnitId;
  months = scheduleMonths;
  IRZName = 'status-monitoring-of-control-points';
  selectedMonth = scheduleMonths[0];
  isEditMode = new BehaviorSubject(false);
  needClearPosts = new BehaviorSubject(false);
  needExportPosts = new BehaviorSubject(false);
  posts: Post[];

  constructor(
    private dialogService: DialogService,
    private intercessionScheduleServiceApi: IntercessionScheduleServiceApi,
    public intercessionScheduleDataService: IntercessionScheduleDataService,
  ) {
  }

  ngOnInit(): void {
    this.getPosts();
  }

  selectedPostChanged(index): void {
    this.intercessionScheduleDataService.currentPostSchedule = null;
    this.intercessionScheduleDataService.selectedPost = this.intercessionScheduleDataService.posts[index];
    this.intercessionScheduleServiceApi.getShiftsByPostUuid(this.intercessionScheduleDataService.selectedPost.uuid).subscribe(res => {
      this.intercessionScheduleDataService.shifts = res;
      console.log(res);
    });
  }

  getPosts(): void {
    this.intercessionScheduleServiceApi.getPostsByMUid(this.militaryUnitId, true).subscribe(res => {
      console.log(res);
      this.intercessionScheduleDataService.posts = res;
      this.intercessionScheduleDataService.selectedPost = this.intercessionScheduleDataService.posts[0];
      this.selectedPostChanged(0);
    });
  }

  clearPosts(): void {
    this.needClearPosts.next(true);
  }

  saveSchedule(): void {
    this.isEditMode.next(false);
    this.needExportPosts.next(true);
  }

  openMonthCalendarDialog(): void {
    this.dialogService.open(MonthCalendarComponent, {}).onClose.subscribe(res => {
      this.intercessionScheduleDataService.selectedMonth = res;
      this.getPostSchedule(res);
    });
  }

  getPostSchedule(selectedMonth): void {
    if (selectedMonth.uuid) {
      this.intercessionScheduleServiceApi.getPostScheduleByMonth(selectedMonth.uuid).subscribe(res => {
        this.intercessionScheduleDataService.selectedMonth = selectedMonth;
        console.log(res);
        this.generatePostSchedule(res);
      });
    } else {
      this.generatePostSchedule();
    }
  }

  generatePostSchedule(postSchedule?): void {
    const selectedMonth = this.intercessionScheduleDataService.selectedMonth.month.split('.');
    const month = +selectedMonth[0];
    const year = +selectedMonth[1];
    const dayCount = new Date(year, month, 0).getDate();

    const generatedPostSchedule = [];

    for (let i = 1; i < dayCount + 1; i++) {
      generatedPostSchedule.push({
        uuid: null,
        date_plan: new Date(year, month, i),
        shift: null,
        admittance_men: [],
      });
    }
    if (postSchedule) {
      for (let i = 0; i < generatedPostSchedule.length; i++) {
        for (let z = 0; z < postSchedule?.length; z++) {
          if (generatedPostSchedule[i]?.date_plan?.getDate() == +postSchedule[z].date_plan.split('.')[0]) {
            const convertedDate = postSchedule[z].date_plan.split('.');
            generatedPostSchedule[i].date_plan = new Date(convertedDate[2], convertedDate[1], convertedDate[0]);
            generatedPostSchedule[i].uuid = postSchedule[z].uuid;
            generatedPostSchedule[i].shift = postSchedule[z].shift;
            generatedPostSchedule[i].admittance_men = postSchedule[z].admittance_men;
            break;
          }
        }
      }
    }
    this.intercessionScheduleDataService.currentPostSchedule = generatedPostSchedule;
    console.log(generatedPostSchedule);

  }

  reportMonth(): void {
    this.selectedMonth.reported = true;
    this.isEditMode.next(false);
  }

}
