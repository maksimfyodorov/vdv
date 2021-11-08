import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OspoCoordinatesComponent } from '../../../../../../../../../shared/components/ospo/ospo-coordinates/components/ospo-coordinates/ospo-coordinates.component';
import { COLS_WITHOUT_HEIGHT } from '../../../../../../../../../shared/components/ospo/ospo-coordinates/infrastucture/table-cols';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-repair-form',
  templateUrl: './repair-form.component.html',
  styleUrls: ['./repair-form.component.scss'],
})
export class RepairFormComponent {
  @Input() public formGroup: FormGroup;

  @Input()
  public set index(index: number) {
    this.setHeader(index);
  }

  public header: string;

  constructor(private dialogService: DialogService) {}

  private setHeader(numberRepair: number): void {
    this.header = `Ремонт ${numberRepair + 1}`;
  }

  public openCoorditanesDialog(): void {
    this.dialogService
      .open(OspoCoordinatesComponent, {
        header: 'Координаты',
        width: '90%',
        data: {
          height: false,
          cols: COLS_WITHOUT_HEIGHT,
        },
      })
      .onClose.subscribe((res) => {
        const coordinate = {
          mark: res.name,
          uuid: res.uuid,
          x: res.object_geom.coordinates[0],
          y: res.object_geom.coordinates[1],
        };
        this.formGroup.get('coordinate').setValue(coordinate);
      });
  }
}
