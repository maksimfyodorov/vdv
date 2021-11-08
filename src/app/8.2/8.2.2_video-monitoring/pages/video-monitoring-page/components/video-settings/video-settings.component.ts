import { EventEmitter, Input } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

import { Equipment, Fixation } from '../../../../models/equipment.model';
import { MonitoringObject } from '../../../../models/monitoringObject.model';
import { StatusEquipment } from '../../../../models/statusEquipment';
import { DialogService } from 'primeng/dynamicdialog';
import { CufComponent } from '../../../../../../shared/components/ospo/cuf/cuf.component';
import { VideoMonitoringService } from '../../services/video-monitoring.service';
import { takeWhile } from 'rxjs/operators';
import { LoaderService } from '../../../../../../shared/components/loader/loader.service';

interface SelectSection extends SelectItem {
  isActive: boolean;
}

@Component({
  selector: 'app-video-settings',
  templateUrl: './video-settings.component.html',
  styleUrls: ['./video-settings.component.scss'],
  providers: [LoaderService],
})
export class VideoSettingsComponent implements OnInit {
  @Input() equipment: Equipment;
  @Input() fixations: Fixation[];
  @Input() allMonitoringObjects: MonitoringObject[] = [];
  @Input() equipmentStatuses: StatusEquipment[];

  @Output() actionEmitter = new EventEmitter<{ type: string; item: any }>();

  sections: SelectSection[] = [{ value: 0, label: 'Характеристики', isActive: true }];
  selectedSection: SelectSection = this.sections[0];

  constructor(
    private dialog: DialogService,
    private videoService: VideoMonitoringService,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
  }

  public selectSection(section: SelectSection): void {
    this.selectedSection = section;
    this.sections.forEach((section) => (section.isActive = false));
    section.isActive = true;
  }

  doAction(action: { type: string; item: any }): void {
    this.actionEmitter.emit(action);
  }

  public openCufDialog(): void {
    this.dialog.open(CufComponent, {
      header: `Контроль работы`,
      data: {
        equipment: this.equipment,
        targetType: 0,
      },
    }).onClose.pipe(takeWhile(res => res)).subscribe(res => {
      switch (res.mode) {
        case 'auto':
          this.loaderService
            .startLoading(this.videoService.patchFixationCuf(this.equipment.fixation.uuid, res.data.uuid))
            .subscribe(uuids => this.equipment.fixation.cuf_uuid = uuids.cuf_uuid);
          break;
        case 'manual':
          this.loaderService
            .startLoading(this.videoService.getEquipment(this.equipment.uuid))
            .subscribe(updatedEquipment => this.equipment = updatedEquipment);
          break;
      }
    });
  }
}
