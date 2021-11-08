import { Component, OnInit } from '@angular/core';

import { SelectionTreeService } from '../../../../8.1/8.1.4_uav-information/components/uav-node-folder/services/selection-tree.service';
import { VideoMonitoringService } from './services/video-monitoring.service';

import { SelectSection, VideoMonitoringStoreService } from './services/video-monitoring-store.service';
import { forkJoin, Subscription } from 'rxjs';
import { ToolState } from '../../store/toolState';
import { ListenerState } from '../../store/listenerState';
import { RectangleTool } from '../../tools/RectangleTool';
import { PolygonTool } from '../../tools/PolygonTool';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EquipmentTool } from '../../tools/EquipmentTool';
import { MonitoringObject, MonitoringObjectFigure } from '../../models/monitoringObject.model';
import { Schema } from '../../models/schema.model';
import { Equipment, EquipmentFigure, Fixation } from '../../models/equipment.model';
import { StatusEquipment } from '../../models/statusEquipment';
import { MilitaryUnit } from '../../../../shared/components/ospo/documents/attach-document-dialog/attach-document-dialog.types';
import { CanvasState } from '../../store/canvasState';

export enum Target {
  object = 'object_uuid',
  military_unit = 'military_unit_id',
}

@Component({
  selector: 'app-video-monitoring-page',
  templateUrl: './video-monitoring-page.component.html',
  styleUrls: ['./video-monitoring-page.component.scss'],
})
export class VideoMonitoringPageComponent implements OnInit {
  militaryUnits: MilitaryUnit[];

  fixations: Fixation[];

  selectedMilitaryUnit: MilitaryUnit;

  selectedMonitoringObjects: MonitoringObject[] = [];
  allMonitoringObjects: MonitoringObject[] = [];
  selectedMonitoringObject: MonitoringObject;

  equipments: Equipment[] = [];
  equipmentStatuses: StatusEquipment[] = [];
  selectedEquipment: Equipment;

  subscriptions: Subscription[] = [];

  canvas: HTMLCanvasElement;
  canvasState: CanvasState;
  toolState: ToolState;
  listenerState: ListenerState;

  formGroup: FormGroup;

  contextMenuObjectItems = [
    { name: 'Ред./Сохр.', callback: this.setEditSchema.bind(this) },
    { name: 'Удалить', callback: this.deleteSchema.bind(this) },
  ];

  contextMenuEquipmentItems = [
    { name: 'Изменить угол', callback: this.setEditEquipment.bind(this) },
    // { name: 'Переместить', callback: this.setEquipmentTool.bind(this) },
    { name: 'Характеристики', callback: this.showCharacteristicsEquipment.bind(this) },
    { name: 'Открепить', callback: this.unattachEquipment.bind(this) },
  ];

  notInstalledEquipments: Equipment[];
  workingEquipmentsCount: number;

  private target: Target = null;

  constructor(
    public monitoringService: VideoMonitoringService,
    public selectionTreeService: SelectionTreeService,
    public pageStore: VideoMonitoringStoreService
  ) {}

  ngOnInit(): void {
    this.initFormGroup();
    this.getAllMonitoringObjects();
    this.getAllEquipments();
    this.getMilitaryUnits();

    this.subscriptions.push(
      this.monitoringService.selectedMilitaryUnit$.subscribe((res) => {
        this.getFixationsMilitaryUnit(res.id);
        this.selectedMilitaryUnit = res;
        this.getAllMonitoringObjects();
      })
    );

    this.monitoringService.getAllEquipmentStatuses().subscribe((statuses) => {
      this.equipmentStatuses = statuses;
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private getFixationsMilitaryUnit(militaryUnitId: number): void {
    this.monitoringService.getFixationsByMilitaryUnit(militaryUnitId).subscribe((res) => {
      this.fixations = res;
    });
  }

  private getMilitaryUnits(): void {
    this.monitoringService.getMilitaryUnits().subscribe((res) => (this.militaryUnits = res));
  }

  private getAllMonitoringObjects(): void {
    this.monitoringService.getAllMonitoringObjects().subscribe((res) => {
      this.allMonitoringObjects = res;
      if (this.selectedMilitaryUnit.id) {
        this.selectedMonitoringObjects = res.filter(
          (monitoringObject) => monitoringObject.military_unit.id === this.selectedMilitaryUnit.id
        );
      } else {
        this.selectedMonitoringObjects = res;
      }
    });
  }

  public addNewMonitoringObject(): void {
    const newMonitoringObject: MonitoringObject = {
      uuid: null,
      name: `Объект №${this.selectedMonitoringObjects.length + 1}`,
      number: (this.allMonitoringObjects.length + 1).toString(),
      military_unit: this.monitoringService.selectedMilitaryUnit$.getValue(),
      military_unit_id: this.monitoringService.selectedMilitaryUnit$.getValue().id,
      schema: [],
      equipments: [],
    };

    this.monitoringService.createMonitoringObject(newMonitoringObject).subscribe((res) => {
      this.onRowSelect(res);
      this.getAllMonitoringObjects();
    });
  }

  public deleteMonitoringObject(): void {
    this.monitoringService.deleteMonitoringObject(this.canvasState.object.getMonitoringObject()).subscribe(() => {
      this.onRowUnselect();
      this.getAllMonitoringObjects();
      this.getAllEquipments();
    });
  }

  private getAllEquipments(): void {
    this.monitoringService.getAllEquipment().subscribe((res) => {
      this.equipments = res;
    });
  }

  public createEquipment(): void {
    const monitoringObject = this.allMonitoringObjects.find(
      (monitoringObject) => monitoringObject.uuid === this.formGroup.value.location
    );

    const status = this.equipmentStatuses.find((status) => status.uuid === this.formGroup.value.status);

    const installation_date = new Date(
      new Date(this.formGroup.value.installation_date).setHours(
        new Date(this.formGroup.value.installation_date).getHours() + 3
      )
    ).toISOString();

    const newEquipment: Equipment = {
      uuid: null,
      object: monitoringObject || null,
      object_uuid: monitoringObject ? monitoringObject.uuid.toString() : null,
      status: status,
      status_uuid: status.uuid,
      installation_date: installation_date || null,
      number_on_schema: monitoringObject ? (monitoringObject.equipments.length + 1).toString() : null,
      angle: 0,
      description: this.formGroup.value.description,
      position: { x: 0, y: 0 },
      fixation_uuid: this.formGroup.value.fixation_uuid,
    };

    this.monitoringService.addNewEquipment(newEquipment).subscribe((equipment) => {
      this.getAllMonitoringObjects();
      this.getAllEquipments();
      this.clearForm();
      if (this.pageStore.selectedTypeOfSchema === this.pageStore.typesOfSchema[0]) {
        this.canvasState.object.addNewEquipment({ ...equipment, isHover: false, isEdit: false });
        this.showAvailableEquipments();
        this.selectedEquipment = equipment;
        this.setTool('equipment');
      }
    });
  }

  private initFormGroup(): void {
    this.formGroup = new FormGroup({
      name: new FormControl(''),
      location: new FormControl(null),
      ip_address: new FormControl(''),
      installation_date: new FormControl(''),
      number: new FormControl(''),
      description: new FormControl(''),
      status: new FormControl(null, Validators.required),
      fixation_uuid: new FormControl(null, Validators.required),
    });
  }

  setCanvasNativeElement(canvasNativeElement: HTMLCanvasElement): void {
    this.canvas = canvasNativeElement;
    this.canvasState = new CanvasState(this.canvas, this.monitoringService, this.pageStore);
    this.listenerState = new ListenerState(this.canvasState);
    this.toolState = new ToolState();

    this.subscriptions.push(
      this.monitoringService.selectedMilitaryUnit$.subscribe(() => {
        this.onRowUnselect();
      })
    );
  }

  onRowSelect(monitoringObject: MonitoringObject): void {
    this.target = Target.object;
    this.selectedMonitoringObject = monitoringObject;
    this.setTool('none');
    this.listenerState.destroyListeners();
    const mappedMonitoringObjects: MonitoringObject = {
      ...monitoringObject,
      schema: monitoringObject.schema.map((schema) => {
        return { ...schema, isEdit: false, isHover: false };
      }),
      equipments: monitoringObject.equipments.map((equipment) => {
        return { ...equipment, isEdit: false, isHover: false };
      }),
    };
    this.canvasState.object = new MonitoringObjectFigure(mappedMonitoringObjects);

    this.notInstalledEquipments = monitoringObject.equipments.filter((equipment) => !equipment.is_attached);
    console.log(this.notInstalledEquipments);
  }

  onRowUnselect(): void {
    this.setTool('none');
    if (this.pageStore.visibleTools) {
      this.pageStore.visibleTools = !this.pageStore.visibleTools;
    }
    this.listenerState.destroyListeners();
    this.canvasState.object = new MonitoringObjectFigure(null);
    this.selectedMonitoringObject = null;
    this.pageStore.visibleListEquipment = false;
  }

  setTool(nameOfTool: string): void {
    switch (nameOfTool) {
      case 'none':
        this.listenerState.destroyListeners();
        break;
      case 'rectangle':
        this.toolState.tool = new RectangleTool(this.canvasState, this.listenerState, this.createSchema.bind(this));
        break;
      case 'polygon':
        this.toolState.tool = new PolygonTool(this.canvasState, this.listenerState, this.createSchema.bind(this));
        break;
      case 'equipment':
        this.setEquipmentTool(this.selectedEquipment);
        break;
    }
  }

  showTools(): void {
    this.pageStore.visibleTools = !this.pageStore.visibleTools;
    if (!this.pageStore.visibleTools) {
      this.setTool('none');
    }
  }

  resetMilitaryUnit(): void {
    this.monitoringService.selectedMilitaryUnit$.next({ id: 0, name: '', common_number_name: '' });
  }

  selectTypeOfTable(type: SelectSection): void {
    this.pageStore.selectedTypeOfSchema = type;
    this.pageStore.typesOfSchema.forEach((typeOfSchema) => (typeOfSchema.isActive = false));
    type.isActive = true;

    type.value === 'Объекты'
      ? (this.pageStore.visibleSettingsCameraPage = false)
      : (this.pageStore.visibleSettingsCameraPage = true);
    this.onRowUnselect();
  }

  showCreateEquipmentDialog(): void {
    if (this.pageStore.selectedTypeOfSchema === this.pageStore.typesOfSchema[0]) {
      this.formGroup.patchValue({
        location: this.selectedMonitoringObject.uuid,
      });
    }
    this.pageStore.visibleCreateEquipmentDialog = true;
  }

  clearForm(): void {
    this.formGroup.reset();
    this.pageStore.visibleCreateEquipmentDialog = false;
  }

  showAvailableEquipments(): void {
    this.listenerState.destroyListeners();
    this.toolState.tool = null;
    this.selectedEquipment = null;
    // this.notInstalledEquipment = this.getNotInstalledEquipments(this.canvasState.object.getMonitoringObject());
    this.pageStore.visibleListEquipment = !this.pageStore.visibleListEquipment;
  }

  setEditSchema(editedSchema: Schema): void {
    // this.canvasState.setEditedSchema(schema);
    this.canvasState.object.getMonitoringObject().schema.forEach((schema) => {
      if (schema.uuid === editedSchema.uuid) {
        editedSchema.isEdit = !editedSchema.isEdit;
        if (!editedSchema.isEdit) {
          this.monitoringService.updateSchema(this.canvasState.object.getMonitoringObject()).subscribe(() => {
            editedSchema = editedSchema.isEdit ? editedSchema : null;
            this.getAllMonitoringObjects();
            this.getAllEquipments();
          });
        }
      } else {
        schema.isEdit = false;
      }
    });
    this.setTool('none');
  }

  deleteSchema(schema: Schema): void {
    this.monitoringService.deleteSchema(schema).subscribe(() => {
      this.canvasState.deleteSchema(schema);
      this.getAllMonitoringObjects();
      this.getAllEquipments();
    });
  }

  createSchema(schema: Schema): void {
    this.monitoringService
      .createNewSchema({
        target: this.target,
        targetUuid: this.canvasState.object.getMonitoringObject().uuid.toString(),
        newSchema: schema,
      })
      .subscribe(
        (res) => {
          this.selectedMonitoringObject?.schema.push(res);
          this.getAllMonitoringObjects();
        },
        () => {
          this.canvasState.object.getMonitoringObject().schema.pop();
        }
      );
  }

  setEditEquipment(equipment: Equipment): void {
    equipment.isEdit = !equipment.isEdit;
    const updatedObject: Equipment = {
      ...equipment,
      object: {
        uuid: this.canvasState.object.getMonitoringObject().uuid,
        name: this.canvasState.object.getMonitoringObject().name,
      },
    };
    if (!equipment.isEdit) {
      this.monitoringService.updateEquipment(updatedObject).subscribe(() => {
        this.getAllMonitoringObjects();
      });
    }
    this.setTool('none');
  }

  setEquipmentTool(equipment: Equipment): void {
    if (equipment) {
      const editedEquipment: Equipment = {
        ...equipment,
        position: { x: 0, y: 0 },
        status_uuid: equipment.status.uuid,
        object: {
          uuid: this.canvasState.object.getMonitoringObject().uuid,
          name: this.canvasState.object.getMonitoringObject().name,
        },
      };

      this.toolState.tool = new EquipmentTool(
        this.canvasState,
        this.listenerState,
        new EquipmentFigure(editedEquipment),
        this.attachEquipment.bind(this)
      );
    } else {
      this.listenerState.destroyListeners();
    }
  }

  attachEquipment(equipment: Equipment): void {
    let allEquipments: Equipment[] = [];

    this.canvasState.object.getMonitoringObject().schema.forEach((schema) => {
      allEquipments = [...allEquipments, ...schema.equipments];
    });

    const equipmentNumbers = allEquipments.map((equip) => Number(equip.number_on_schema));

    const numberOnSchema = equipmentNumbers.length ? (Math.max(...equipmentNumbers) + 1).toString() : '1';

    equipment.number_on_schema = numberOnSchema;

    this.canvasState.object.getMonitoringObject().schema = this.canvasState.object
      .getMonitoringObject()
      .schema.map((schema) => {
        if (
          schema.lines.find((line) => line.start_x === equipment.position.x && line.start_y === equipment.position.y)
        ) {
          return { ...schema, equipments: [...schema.equipments, equipment] };
        }
        return schema;
      });

    this.canvasState.object.getMonitoringObject().equipments.forEach((equip) => {
      if (equip.uuid === equipment.uuid) {
        this.target === Target.object ? (equip.is_attached = true) : (equip.is_attached_to_military_unit = true);
      }
    });

    this.monitoringService.updateSchema(this.canvasState.object.getMonitoringObject()).subscribe(() => {
      this.getAllMonitoringObjects();
      this.getAllEquipments();
      this.pageStore.visibleListEquipment = false;
      this.notInstalledEquipments = this.canvasState.object
        .getMonitoringObject()
        .equipments.filter((equipment) =>
          this.target === Target.object ? !equipment.is_attached : !equipment.is_attached_to_military_unit
        );
    });
  }

  unattachEquipment(equipment: Equipment): void {
    const unattachedEquipment: Equipment = {
      ...equipment,
      object: this.target === Target.military_unit ? equipment.object : null,
      object_uuid: this.target === Target.military_unit ? equipment.object_uuid : null,
      number_on_schema: null,
      installation_date: null,
      position: { x: 0, y: 0 },
    };

    this.monitoringService.updateEquipment(unattachedEquipment).subscribe(() => {
      this.canvasState.unatttachEquipment(unattachedEquipment);
      this.getAllMonitoringObjects();
      this.getAllEquipments();
    });
  }

  deleteEquipment(equipment: Equipment): void {
    this.monitoringService.deleteEquipment(equipment).subscribe(() => {
      this.selectedEquipment = null;
      this.getAllMonitoringObjects();
      this.getAllEquipments();
    });
  }

  updateEquipment(equipment: Equipment): void {
    this.monitoringService.updateEquipment(equipment).subscribe((res) => {
      this.selectedEquipment = res;
      this.getAllMonitoringObjects();
      this.getAllEquipments();
    });
  }

  saveMonitoringObjectName(): void {
    const updatedMonitoringObject = {
      ...this.canvasState.object.getMonitoringObject(),
      military_unit_id: this.canvasState.object.getMonitoringObject().military_unit.id,
    };
    this.monitoringService.updateMonitoringObject(updatedMonitoringObject).subscribe((response) => {
      this.selectedMonitoringObject = response;
      this.getAllMonitoringObjects();
    });
  }

  changeNameMonitoringObject(name: string): void {
    this.canvasState.object.getMonitoringObject().name = name;
  }

  resetMonitoringObjectName(): void {
    this.canvasState.object.getMonitoringObject().name = this.selectedMonitoringObject.name;
  }

  showCharacteristicsEquipment(selectedEquipment: Equipment): void {
    this.onRowUnselect();
    this.selectedEquipment = this.equipments.find((equipment) => equipment.uuid === selectedEquipment.uuid);
    this.selectTypeOfTable(this.pageStore.typesOfSchema[1]);
    this.showPageWithSelectedEquipment(selectedEquipment);
  }

  private showPageWithSelectedEquipment(selectedEquipment: Equipment): void {
    const firstView = 0;
    const equipmentIndex = this.equipments.findIndex((equipment) => equipment.uuid === selectedEquipment.uuid);
    this.pageStore.selectedItem = firstView + equipmentIndex - (equipmentIndex % this.pageStore.rows);
  }

  getWorkingEquipmentLength(monitoringObject: MonitoringObject): number {
    return monitoringObject.equipments?.filter(
      (equipment) =>
        equipment?.status?.uuid === 'a48a28a8-1fc3-4d2d-8028-3402d3292b65' &&
        equipment?.position?.x !== 0 &&
        equipment?.position?.y !== 0
    ).length;
  }

  showMilitaryUnitSchema(): void {
    forkJoin({
      schema: this.monitoringService.getMilitaryUnitSchema(this.selectedMilitaryUnit.id),
      equipments: this.monitoringService.getMilitaryUnitEquipment(this.selectedMilitaryUnit.id),
    }).subscribe((res) => {
      this.target = Target.military_unit;
      this.selectedMonitoringObject = null;
      const mappedMonitoringObject: MonitoringObject = {
        uuid: this.selectedMilitaryUnit.id,
        name: this.selectedMilitaryUnit.name,
        schema: res.schema.data,
        equipments: res.equipments.result,
      };
      this.canvasState.object = new MonitoringObjectFigure(mappedMonitoringObject);
      this.notInstalledEquipments = this.notInstalledEquipments = this.canvasState.object
        .getMonitoringObject()
        .equipments.filter((equipment) => !equipment.is_attached_to_military_unit);
    });
  }

  public doAction(action: { type: string; item: any }) {
    switch (action.type) {
      case 'delete':
        this.deleteEquipment(action.item);
        break;
      case 'update':
        this.updateEquipment(action.item);
        break;
    }
  }
}
