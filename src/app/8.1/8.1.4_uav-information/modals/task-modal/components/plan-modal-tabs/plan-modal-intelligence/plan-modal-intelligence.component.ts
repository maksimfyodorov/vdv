import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoordinatesDialogService } from '../../../../../../../shared/components/ospo/ospo-coordinates/services/coordinates-dialog.service';
import { FormGroup } from '@angular/forms';
import { CoordinateModel, TaskModalDynamicConfigData, TaskMode } from '../../../types/task-modal';
import { RoleModelService } from '../../../../../../../shared/services/role-model.service';

const CONTROL_OF_COORDINATES = {
  start: 'coordinates_start_uuid',
  landing: 'coordinates_landing_uuid',
  NSO: 'coordinates_nsu_location_uuid',
};

@Component({
             selector: 'app-plan-modal-intelligence',
             templateUrl: './plan-modal-intelligence.component.html',
             styleUrls: ['./plan-modal-intelligence.component.scss'],
           })
export class PlanModalIntelligenceComponent implements OnInit {
  @Input() public form: FormGroup;
  @Input() public data: TaskModalDynamicConfigData;
  @Output() public actionEmit: EventEmitter<string> = new EventEmitter<string>();

  public coordinateModel: CoordinateModel[];

  public coordinates: { [key: string]: any } = {};

  constructor(
    private coordinatesService: CoordinatesDialogService,
  ) {
  }

  ngOnInit(): void {
    this.coordinateModel = [
      { title: 'Старт', type: 'start', formControl: this.form.get('coordinates_start_uuid') },
      { title: 'Приземление', type: 'landing', formControl: this.form.get('coordinates_landing_uuid') },
      { title: 'Расположение НСУ', type: 'NSO', formControl: this.form.get('coordinates_nsu_location_uuid') },
    ];
  }

  public selectCoordinates(type: string): void {
    this.coordinatesService.openOSPOCoordinatesWithoutHeight().subscribe(res => {

      this.coordinates[type] = res.object_geom.coordinates;

      this.form.controls[CONTROL_OF_COORDINATES[type]].setValue(res.uuid);
    });
  }

  public getCoordinatesValue(type: string, coordinateType: string): string | number {
    if (this.coordinates[type]) {
      if (coordinateType === 'latitude') {
        return this.coordinates[type]?.[0] || '';
      }
      if (coordinateType === 'longitude') {
        return this.coordinates[type]?.[1] || '';
      }
    }

    return '';
  }

  public checkTaskMode(modes: TaskMode[]): boolean {
    return modes.includes(this.data.mode.mode);
  }
}

@Component({
             selector: 'app-plan-modal-intelligence-edit',
             templateUrl: './plan-modal-intelligence.component.html',
             styleUrls: ['./plan-modal-intelligence.component.scss'],
           })
export class PlanModalIntelligenceEditComponent extends PlanModalIntelligenceComponent implements OnInit {
  constructor(
    coordinatesService: CoordinatesDialogService,
  ) {
    super(coordinatesService);
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.form.patchValue(this.data.task);

    this.coordinates = {
      start: [this.data.task.coordinates_start?.x, this.data.task.coordinates_start?.y],
      landing: [this.data.task.coordinates_landing?.x, this.data.task.coordinates_landing?.y],
      NSO: [this.data.task.coordinates_nsu_location?.x, this.data.task.coordinates_nsu_location?.y],
    };

    this.form.get('coordinates_start_uuid').setValue(this.data.task.coordinates_start?.uuid);
    this.form.get('coordinates_landing_uuid').setValue(this.data.task.coordinates_landing?.uuid);
    this.form.get('coordinates_nsu_location_uuid').setValue(this.data.task.coordinates_nsu_location?.uuid);
  }
}

@Component({
             selector: 'app-plan-modal-intelligence-disable',
             templateUrl: './plan-modal-intelligence.component.html',
             styleUrls: ['./plan-modal-intelligence.component.scss'],
           })
export class PlanModalIntelligenceDisableComponent extends PlanModalIntelligenceEditComponent implements OnInit {
  constructor(
    coordinatesService: CoordinatesDialogService,
    private roleService: RoleModelService,
  ) {
    super(coordinatesService);
  }

  public ngOnInit(): void {
    super.ngOnInit();

    // if (this.roleService.userAccessLevel$.value !== 'command') {
    this.form.disable();
    // }
  }
}
