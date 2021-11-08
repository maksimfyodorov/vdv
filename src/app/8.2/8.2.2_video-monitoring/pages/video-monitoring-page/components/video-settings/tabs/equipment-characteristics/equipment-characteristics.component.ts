import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Equipment, Fixation } from '../../../../../../models/equipment.model';
import { MonitoringObject } from '../../../../../../models/monitoringObject.model';
import { StatusEquipment } from '../../../../../../models/statusEquipment';

@Component({
  selector: 'app-equipment-characteristics',
  templateUrl: './equipment-characteristics.component.html',
  styleUrls: ['./equipment-characteristics.component.scss'],
})
export class EquipmentCharacteristicsComponent implements OnInit {
  @Input() equipment: Equipment;
  @Input() fixations: Fixation[];
  @Input() allMonitoringObjects: MonitoringObject[];
  @Input() equipmentStatuses: StatusEquipment[];

  @Output() actionEmitter = new EventEmitter<{ type: string; item: any }>();

  isEditCharacheristics: boolean = false;

  formGroup: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      uuid: new FormControl(''),
      object: new FormControl(null),
      server: new FormControl(''),
      number_on_schema: new FormControl(''),
      installation_date: new FormControl(''),
      ip_address: new FormControl(''),
      number: new FormControl(''),
      description: new FormControl(''),
      model: new FormControl(''),
      standart: new FormControl(''),
      type: new FormControl(''),
      resolution: new FormControl(''),
      framerate: new FormControl(''),
      focus: new FormControl(''),
      viewingAngle: new FormControl(''),
      status: new FormControl(null, Validators.required),
      fixation_uuid: new FormControl(null, Validators.required),
    });
  }

  public editCharacheristics(): void {
    this.isEditCharacheristics = !this.isEditCharacheristics;

    this.formGroup.patchValue({
      ...this.equipment,
      fixation_uuid: this.equipment.fixation?.uuid,
      status: this.equipment.status.uuid,
      object: this.equipment.object ? this.equipment.object.uuid : null,
      installation_date: this.equipment.object ? new Date(this.equipment.installation_date) : null,
    });
  }

  public submitForm(): void {
    let numberOnSchema;

    const monitoringObject = this.allMonitoringObjects.find(
      (monitoringObject) => monitoringObject.uuid === this.formGroup.value.object
    );

    if (monitoringObject) {
      if (monitoringObject?.equipments.find((equip) => equip.uuid === this.formGroup.value.uuid)) {
        numberOnSchema = monitoringObject.equipments.find(
          (equip) => equip.uuid === this.formGroup.value.uuid
        ).number_on_schema;
      } else if (monitoringObject.equipments.length) {
        numberOnSchema =
          Number(monitoringObject.equipments[monitoringObject.equipments.length - 1].number_on_schema) + 1;
      } else {
        numberOnSchema = 1;
      }
    }

    const status = this.equipmentStatuses.find((status) => status.uuid === this.formGroup.value.status);

    const installation_date = new Date(
      new Date(this.formGroup.value.installation_date).setHours(
        new Date(this.formGroup.value.installation_date).getHours() + 3
      )
    ).toISOString();

    const newEquipment: Equipment = {
      uuid: this.formGroup.value.uuid,
      installation_date: this.formGroup.value.object ? installation_date : null,
      object: monitoringObject ? { uuid: monitoringObject.uuid, name: monitoringObject.name } : null,
      object_uuid: this.formGroup.value.object || null,
      description: this.formGroup.value.description,
      number_on_schema: monitoringObject ? numberOnSchema : null,
      position: monitoringObject ? this.equipment.position : { x: 0, y: 0 },
      angle: monitoringObject ? this.equipment.angle : 0,
      status: status,
      status_uuid: this.formGroup.value.status,
      fixation_uuid: this.formGroup.value.fixation_uuid,
    };

    this.updateEquipment(newEquipment);
    this.clear();
  }

  public clear(): void {
    this.formGroup.reset();
    this.isEditCharacheristics = false;
  }

  public deleteEquipment(): void {
    this.actionEmitter.emit({ type: 'delete', item: this.equipment });
  }

  public updateEquipment(equipment: Equipment): void {
    console.log(equipment);
    this.actionEmitter.emit({ type: 'update', item: equipment });
  }
}
