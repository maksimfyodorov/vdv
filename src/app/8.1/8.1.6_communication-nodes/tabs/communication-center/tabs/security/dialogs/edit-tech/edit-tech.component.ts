import { Component, Input, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Repair,
  TechSecurityItem,
} from '../../../../../../../../shared/components/ospo/ospo-security/types/security.types';
import { Document } from '../../../../../../../../shared/components/ospo/documents/documents.types';
import { Port } from '../../../../../../../../shared/components/ports/interfaces';
import { portsValidator } from './ports.validator';
import { MenuItem } from 'primeng/api';
import { getDateWithTimeOffset } from '../../../../../../../../shared/utils/date-format';
import { OspoCoordinatesComponent } from '../../../../../../../../shared/components/ospo/ospo-coordinates/components/ospo-coordinates/ospo-coordinates.component';
import { COLS_WITHOUT_HEIGHT } from '../../../../../../../../shared/components/ospo/ospo-coordinates/infrastucture/table-cols';

@Component({
  selector: 'app-edit-tech',
  templateUrl: './edit-tech.component.html',
  styleUrls: ['./edit-tech.component.scss'],
})
export class EditTechComponent implements OnInit {
  public form: FormGroup;
  public techItem: TechSecurityItem;
  public tabItems: MenuItem[] = [
    { label: 'Общее', command: () => (this.activeTabItem = this.tabItems[0]) },
    { label: 'Информационные порты', command: () => (this.activeTabItem = this.tabItems[1]) },
    { label: 'Документы', command: () => (this.activeTabItem = this.tabItems[2]) },
    { label: 'Ремонты', command: () => (this.activeTabItem = this.tabItems[3]) },
  ];
  @Input() public activeTabItem: MenuItem = this.tabItems[0];

  public hasRepair = false;

  constructor(
    private dialogService: DialogService,
    public config: DynamicDialogConfig,
    private dialog: DynamicDialogRef
  ) {
    this.techItem = config.data;
  }

  ngOnInit(): void {
    this.createForm();
  }

  public close(): void {
    this.dialog.close();
  }

  public save(): void {
    this.formatDateInRepairs();
    this.dialog.close(this.form.value);
  }

  public portsChanged($event: Port[]): void {
    this.form.get('ports').setValue($event);
  }

  public documentsChanged($event: Document[]): void {
    this.form.get('documents').setValue($event);
  }

  public createRepair(): void {
    this.hasRepair = true;
    this.getRepairFormGroups().push(this.createRepairFormGroup());
  }

  private formatDateInRepairs(): void {
    const repairsFormArray = this.form.get('repairs') as FormArray;
    const newRepairsWithFormattedDates = repairsFormArray.value.map((repair) => {
      return {
        ...repair,
        sending_date: getDateWithTimeOffset(repair.sending_date),
        receipt_date: getDateWithTimeOffset(repair.receipt_date),
        installation_date: getDateWithTimeOffset(repair.installation_date),
      };
    });

    this.form.get('repairs').setValue(newRepairsWithFormattedDates);
  }

  private createRepairFormGroup(repair?: Repair): FormGroup {
    return new FormGroup({
      uuid: new FormControl(repair ? repair.uuid : null),
      sending_date: new FormControl(repair ? new Date(repair.sending_date) : null, Validators.required),
      receipt_date: new FormControl(repair ? new Date(repair.receipt_date) : null, Validators.required),
      installation_date: new FormControl(repair ? new Date(repair.installation_date) : null, Validators.required),
      coordinate: new FormControl(repair ? repair.coordinate : null, Validators.required),
    });
  }

  private getRepairFormGroups(): FormArray {
    return this.form.controls['repairs'] as FormArray;
  }

  private createForm(): void {
    this.form = new FormGroup({
      number: new FormControl(this.techItem.number),
      year: new FormControl(this.techItem.year),
      ports: new FormControl(this.techItem.ports, portsValidator()),
      documents: new FormControl(this.techItem.documents),
      note: new FormControl(this.techItem.note),
      coordinate: new FormControl(this.techItem.coordinate),
      vvst_sample: new FormControl({
        name: this.config.data.parent.name,
        uuid: this.config.data.parent.uuid,
      }),
      repairs: new FormArray(this.techItem.repairs.map(this.createRepairFormGroup)),
    });
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
        this.form.get('coordinate').setValue(coordinate);
      });
  }
}
