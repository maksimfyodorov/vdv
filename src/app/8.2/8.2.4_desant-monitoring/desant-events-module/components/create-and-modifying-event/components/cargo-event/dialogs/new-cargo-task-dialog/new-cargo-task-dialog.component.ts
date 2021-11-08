import {Component, OnInit} from '@angular/core';
import {SelectTechSubdivisionComponent} from '../../../tech-event/dialogs/select-tech-subdivision/select-tech-subdivision.component';
import {OspoCoordinatesComponent} from '../../../../../../../../../shared/components/ospo/ospo-coordinates/components/ospo-coordinates/ospo-coordinates.component';
import {COLS_WITHOUT_HEIGHT} from '../../../../../../../../../shared/components/ospo/ospo-coordinates/infrastucture/table-cols';
import {HttpParams} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Airdrome, StaffTask} from '../../../../../../types/desant-events.type';
import {Coordinate} from '../../../../../../../../../8.1/8.1.4_uav-information/components/flight-plans/types/tasks';
import {CompletingTable, JumpStates} from '../../../../types/new-desant-event-dialog.types';
import {Aircraft} from '../../../../../../../types/aircraftInterface';
import {Document} from '../../../../../../../../../shared/components/ospo/documents/documents.types';
import {DesantEventsService} from '../../../../../../services/desant-events.service';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {NewTechTaskService} from '../../../tech-event/services/new-tech-task.service';
import {NewEventDataService} from '../../../../services/new-event-data.service';
import {LoaderService} from '../../../../../../../../../shared/components/loader/loader.service';
import {OlApiService} from '../../../../../../../../../shared/services/ol-api.service';

@Component({
  selector: 'app-new-cargo-task-dialog',
  templateUrl: './new-cargo-task-dialog.component.html',
  styleUrls: ['./new-cargo-task-dialog.component.scss'],
  providers: [DesantEventsService, OlApiService, DialogService, LoaderService],
})
export class NewCargoTaskDialogComponent implements OnInit {
  public form: FormGroup = this.initTaskForm();
  public allTasks: StaffTask[];
  public airportDeparture: Airdrome[];
  public landingAria: Coordinate;
  public selectedLandingAria: string;
  public jumpsState: JumpStates[];
  public selectedState = null;
  public banOtherAirplane = false;
  public otherAirplane: Aircraft[];
  public selectedSportTaskState = false;
  public documents: Document[] = [];
  public titleDoc = 'Добавить документы';
  public eventUUID: string;
  public selectedLandingAriaUUID: string;
  public selectedPlaceSpecialEvent: string;
  public selectedPlaceSpecialEventUUID: string;
  public notes: string;
  public allAirplane: Aircraft[];
  public newTaskUUID: string;
  public completingTableInfo: CompletingTable[];
  public componentState = '';

  constructor(public loader: LoaderService,
              private desantEventsService: DesantEventsService,
              private dialogService: DialogService,
              private dialogRef: DynamicDialogRef,
              private newTechTaskService: NewTechTaskService,
              private newEventDataService: NewEventDataService,
              private dynamicDialogConfig: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.form = this.initTaskForm();
    this.getAllDesantTasks();
    this.setJumpState();
    this.getAllAerodrome();
    this.getAllAircraft();
    this.banOtherAirplane = true;
    this.eventUUID = this.dynamicDialogConfig.data?.eventUUID;
    this.newTaskUUID = this.dynamicDialogConfig.data?.task_uuid;
    if (this.newTaskUUID) {
      this.componentState = 'edit';
      this.getStaffInfo();
      this.getTaskDocs();
      this.getCompletingTable();
    } else {
      this.componentState = 'create';
    }
  }

  public createOrChangeTask(): void {
    this.loader.startLoading(this.newTechTaskService.createNewStaffTask(this.setTaskParams())).subscribe(value => {
      this.newTaskUUID = value.uuid;
      this.componentState = 'edit';
    });
  }

  public closeModal(): void {
    this.dialogRef.close();
  }

  public addTechSubdivision(): void {
    this.dialogService.open(SelectTechSubdivisionComponent, {
      dismissableMask: true,
      header: 'Выбор ВВСТ',
      width: '1500px',
      data: {task_uuid: this.newTaskUUID, airplaneInfo: this.form.controls.airplane.value, mode: 'create'},
    }).onClose.subscribe(uuid => {
      if (uuid) {
        this.loader.startLoading(this.newTechTaskService.getCompletingInfo(this.getQueryParamsForEventCompleting(this.newTaskUUID))).subscribe(result => {
          this.completingTableInfo = result.data;
          this.completingTableInfo = result.data;
        });
      }
    });
  }

  public openCoordinateModal(mode: string): void {
    this.dialogService.open(OspoCoordinatesComponent, {
      dismissableMask: true,
      header: 'Координаты', width: '90%',
      data: {
        height: false,
        cols: COLS_WITHOUT_HEIGHT
      }
    }).onClose.subscribe(res => {
      if (res) {
        const coordinate = {
          mark: res.name,
          uuid: res.uuid,
          x: res.object_geom.coordinates[0],
          y: res.object_geom.coordinates[1],
        };
        if (mode === 'landing') {
          this.selectedLandingAriaUUID = coordinate.uuid;
          this.selectedLandingAria = `${coordinate.x}с.ш ${coordinate.y}в.д`;
        } else if (mode === 'special') {
          this.selectedPlaceSpecialEvent = `${coordinate.x}с.ш ${coordinate.y}в.д`;
          this.selectedPlaceSpecialEventUUID = coordinate.uuid;
        }
      }
    });

  }

  public changeCompleting(uuid: string): void {
    this.dialogService.open(SelectTechSubdivisionComponent, {
      dismissableMask: true,
      header: 'Выбор ВВСТ',
      width: '1500px',
      data: {
        task_uuid: this.newTaskUUID,
        airplaneInfo: this.form.controls.airplane.value,
        mode: 'edit',
        completing_uuid: uuid
      },
    }).onClose.subscribe(res => {
      if (res) {
        this.loader.startLoading(this.newTechTaskService.getCompletingInfo(this.getQueryParamsForEventCompleting(this.newTaskUUID))).subscribe(result => {
          this.completingTableInfo = result.data;
          this.completingTableInfo = result.data;
        });
      }
    });
  }

  public deleteCompleting(uuid: string): void {
    this.loader.startLoading(this.newTechTaskService.deleteCompleting(uuid)).subscribe(value => {
      this.getCompletingTable();
    });
  }

  private getAllDesantTasks(): void {
    this.loader.startLoading(this.desantEventsService.getDesantTask()).subscribe(value => this.allTasks = value.data);
  }

  private setJumpState(): void {
    this.newTechTaskService.getJumpsState().subscribe(value => {
      this.jumpsState = value.data;
      this.selectedState = this.jumpsState[0];
    });
  }

  private setTime(date: Date, time: Date): Date {
    const dateTimeSum = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours() + 3, time.getMinutes());
    return dateTimeSum;
  }

  private setTaskParams(): any {
    const otherAircraftUUID = [];
    if (this.otherAirplane) {
      this.otherAirplane?.forEach(value => otherAircraftUUID.push(value?.uuid));
    }

    const params = {
      date_end_plan: this.setTime(this.form.controls.date_end_plan.value, this.form.controls.time_end_plan.value).toISOString(),
      date_start_plan: this.setTime(this.form.controls.date_start_plan.value, this.form.controls.time_start_plan.value).toISOString(),
      note: this.form.controls.notes.value,
      prohibition_aircraft: this.banOtherAirplane,
      event_uuid: this.newEventDataService?.eventUUID,
      single_jumping_uuid: this.selectedState?.uuid,
      task_directory_uuid: this.form.controls.name.value.uuid,
      aerodrome_start_uuid: this.form.controls.airport_departure.value.uuid,
      aircraft_main_uuid: this.form.controls.airplane.value.uuid,
      platform_landing_area_uuid: this.selectedLandingAriaUUID,
      platform_place_for_special_events_uuid: this.selectedPlaceSpecialEventUUID,
      other_aircraft_uuids: otherAircraftUUID,
      sport_task: this.selectedSportTaskState,
    };
    return params;
  }

  private getAllAerodrome(): void {
    this.loader.startLoading(this.newTechTaskService.getAerodrome()).subscribe(value => this.airportDeparture = value.data);
  }

  private getAllAircraft(): void {
    this.loader.startLoading(this.newTechTaskService.getAircraftDirectory()).subscribe(value => this.allAirplane = value.data);
  }

  private getQueryParamsForEventCompleting(uuid: string): HttpParams {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('landing_task_uuid', uuid);
    return httpParams;
  }

  private getStaffInfo(): void {
    this.loader.startLoading(this.newTechTaskService.getStaffTaskFullInfo(this.newTaskUUID)).subscribe(value => this.setTaskFullInfo(value));
  }

  public changeTask(): void {
    this.loader.startLoading(this.newTechTaskService.changeStaffTask(this.newTaskUUID, this.setTaskParams())).subscribe();
  }

  public saveDocuments(): void {
    const chooseDocUUID = [];
    this.documents.forEach(value => chooseDocUUID.push(value.uuid));
    const docParams = {
      document_uuids: chooseDocUUID
    };
    this.loader.startLoading(this.newTechTaskService.putTaskDocuments(this.newTaskUUID, docParams)).subscribe(value => {
      this.getTaskDocs();
    });
  }

  private getTaskDocs(): void {
    this.loader.startLoading(this.newTechTaskService.getTaskDocuments(this.newTaskUUID)).subscribe(value => this.documents = value?.document);
  }

  private initTaskForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      date_start_plan: new FormControl('', Validators.required),
      time_start_plan: new FormControl('', Validators.required),
      date_end_plan: new FormControl('', Validators.required),
      time_end_plan: new FormControl('', Validators.required),
      airport_departure: new FormControl('', Validators.required),
      airplane: new FormControl('', Validators.required),
      notes: new FormControl('', Validators.required),
    });
  }

  private getCompletingTable(): void {
    this.loader.startLoading(this.newTechTaskService.getCompletingInfo(this.getQueryParamsForEventCompleting(this.newTaskUUID))).subscribe(result => {
      this.completingTableInfo = result.data;
    });
  }

  private setTaskFullInfo(value): void {
    const selectedJumpStateIndex = this.jumpsState?.findIndex(result => result?.uuid === value?.single_jumping.uuid);
    this.form.controls.date_start_plan?.setValue(new Date(value?.date_start_plan));
    this.form.controls.date_end_plan?.setValue(new Date(value?.date_end_plan));
    this.form.controls.notes?.setValue(value?.note);
    this.banOtherAirplane = value?.prohibition_aircraft;
    this.selectedState = this.jumpsState[selectedJumpStateIndex];
    this.form.controls.name?.setValue(value?.task_directory);
    this.form.controls.airport_departure?.setValue(value?.aerodrome_start);
    this.form.controls.airplane?.setValue(value?.aircraft_main);
    this.selectedLandingAria = `${value?.platform_landing_area?.x}с.ш ${value?.platform_landing_area?.y}в.д`;
    this.selectedPlaceSpecialEvent = `${value?.platform_place_for_special_events?.x}с.ш ${value?.platform_place_for_special_events?.y}в.д`;
    this.otherAirplane = value?.other_aircraft;
    this.selectedSportTaskState = value?.sport_task;
  }
}
