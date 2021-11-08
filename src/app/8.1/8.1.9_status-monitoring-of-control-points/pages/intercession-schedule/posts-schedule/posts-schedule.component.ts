import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { MilitaryManEditDialogComponent } from '../../dialogs/military-man-edit-dialog/military-man-edit-dialog.component';
import { BehaviorSubject } from 'rxjs';
import { IntercessionScheduleDataService } from '../services/intercession-schedule-data.service';
import { IntercessionScheduleServiceApi } from '../services/intercession-schedule.service-api';

@Component({
  selector: 'app-posts-schedule',
  templateUrl: './posts-schedule.component.html',
  styleUrls: ['./posts-schedule.component.scss'],
})
export class PostsScheduleComponent implements OnInit, DoCheck {

  @Input() canEdit = true;
  @Input() needSaveData: BehaviorSubject<any>;
  @Input() postsValues;
  @Input() editionSubscribe: BehaviorSubject<any>;
  @Input() needClearSubscribe: BehaviorSubject<any>;
  @Input() shift;

  hasNewChangesOnPreparingData = true;
  preparingData = [];
  isEdit = false;

  constructor(
    private dialogService: DialogService,
    public intercessionScheduleDataService: IntercessionScheduleDataService,
    private intercessionScheduleServiceApi: IntercessionScheduleServiceApi,
  ) {
  }

  ngOnInit(): void {
    this.subscribeToNeedExportData();
    this.checkEditionStatus();
    this.checkClearStatus();
  }

  ngDoCheck() {
    // console.log(this.preparingData);
  }

  exportValues(): void {
    console.log(this.postsValues);
    this.intercessionScheduleServiceApi.createSchedule(this.postsValues).subscribe(result => {
    });
  }

  subscribeToNeedExportData(): void {
    this.needSaveData.subscribe(res => {
      if (res === true) {
        this.needSaveData.next(false);
        this.exportValues();
      }
    });
  }

  addAdmittanceMen(post): void {
    const emptyAdmittanceMen = {
      admittance_name: '',
      full_name: '',
      position: '',
      rank: '',
      status: null,
    };
    post.admittance_men.push(emptyAdmittanceMen);
    this.editMilitaryMan(emptyAdmittanceMen, post);
  }

  checkClearStatus(): void {
    this.needClearSubscribe.subscribe(res => {
      if (res) {
        this.needClearSubscribe.next(false);
        this.clearPosts();
      }
    });
  }

  checkEditionStatus(): void {
    this.editionSubscribe.subscribe(res => {
      this.isEdit = res;
    });
  }

  clearPosts(): void {
    for (let i = 0; i < this.postsValues.length; i++) {
      this.postsValues[i].admittance_men = [];
      this.postsValues[i].shift = null;
      this.postsValues[i].uuid = null;
    }
  }

  editMilitaryMan(admittanceMan, post): any {
    this.dialogService.open(MilitaryManEditDialogComponent, {
      header: 'Выберите военнослужащего',
      data: {
        allMilitaryMen: this.intercessionScheduleDataService.MU,
      },
      closable: false,
    }).onClose.subscribe(result => {
      let currentPostIndex;
      for (let i = 0; i < this.postsValues.length; i++) {
        if (post === this.postsValues[i]) {
          currentPostIndex = i;
        }
      }
      for (let i = 0; i < post.admittance_men.length; i++) {
        if (admittanceMan.uuid === post.admittance_men[i].uuid) {
          post.admittance_men[i] = result;
          this.postsValues[currentPostIndex] = post;
          console.log(this.postsValues);
          return;
        }
      }
      post.admittance_men.push(result);
      this.postsValues[currentPostIndex] = post;
      return;
    });
  }

  deleteMilitaryMan(selectedMan, post): void {
    let currentPostIndex;
    for (let i = 0; i < this.postsValues.length; i++) {
      if (post === this.postsValues[i]) {
        currentPostIndex = i;
      }
    }
    for (let i = 0; i < post.admittance_men.length; i++) {
      if (post.admittance_men[i] === selectedMan) {
        post.admittance_men.splice(i, 1);
        this.postsValues[currentPostIndex].admittance_men = post.admittance_men;
        return;
      }
    }
  }

  shiftChanged(shift, post): void {
    for (let i = 0; i < this.postsValues.length; i++) {
      if (this.postsValues[i].date_plan === post.date_plan) {
        console.log(shift.value);
        this.postsValues[i].shift = shift.value;
      }
    }
  }

}
