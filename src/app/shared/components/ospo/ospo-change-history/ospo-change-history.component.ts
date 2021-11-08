import {Component, Input, OnInit} from '@angular/core';
import {OSPOHistoryChanges, OSPOChangeStatus} from './interfaces/camera-history.interface';
import {CameraChangeHistoryService} from './services/camera-change-history.service';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-ospo-change-history',
  templateUrl: './ospo-change-history.component.html',
  styleUrls: ['./ospo-change-history.component.scss'],
  providers: [CameraChangeHistoryService],
})


export class OspoChangeHistoryComponent implements OnInit {
  public changeHistory: OSPOHistoryChanges[];
  public statuses: OSPOChangeStatus[];


  constructor(private cameraChangeHistoryService: CameraChangeHistoryService,
              private dynamicDialogConfig: DynamicDialogConfig,
              ) {
  }

  ngOnInit(): void {
    this.statuses = this.dynamicDialogConfig?.data?.statuses;
    this.changeHistory = this.dynamicDialogConfig?.data?.history;
  }

}
