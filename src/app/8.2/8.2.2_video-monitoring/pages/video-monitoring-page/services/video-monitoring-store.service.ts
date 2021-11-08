import { Injectable } from '@angular/core';
import { SelectItem } from 'primeng/api';

export interface SelectSection extends SelectItem {
  isActive: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class VideoMonitoringStoreService {
  visibleSettingsCameraPage: boolean = false;

  typesOfSchema: SelectSection[] = [
    { label: 'Объекты', value: 'Объекты', isActive: true },
    { label: 'Камеры', value: 'Камеры', isActive: false },
  ];

  selectedTypeOfSchema: SelectSection = this.typesOfSchema[0];

  typesOfFigure: any[] = [
    { value: 'rectangle', name: 'rectangle', icon: 'pi pi-th-large', isActive: false },
    {
      value: 'polygon',
      name: 'polygon',
      icon: 'pi pi-caret-up',
      isActive: false,
    },
  ];

  selectedTypeOfFigure: any = null;

  selectedItem: number = 0;

  rows: number = 10;

  styleSettingCam: string = '';

  visibleListEquipment: boolean = false;

  visibleCreateEquipmentDialog: boolean = false;

  contextMenuObjectState = {
    position: { x: 0, y: 0 },
    visible: false,
  };

  contextMenuEquipmentState = {
    position: { x: 0, y: 0 },
    visible: false,
  };

  visibleTools: boolean = false;

  constructor() {}
}
