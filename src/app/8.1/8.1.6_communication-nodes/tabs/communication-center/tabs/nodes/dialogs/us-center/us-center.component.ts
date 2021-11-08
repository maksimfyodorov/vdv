import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoaderService } from '../../../../../../../../shared/components/loader/loader.service';
import { CommunicationNodesService } from '../../../../services/communication-nodes.service';
import { CommunicationCenter } from '../../../../types/nodes';
import { ACCESS_LEVELS } from '../../../../../../../../shared/components/ospo/military-units/military-units-dropdown/interfaces';

@Component({
  selector: 'app-us-center',
  templateUrl: './us-center.component.html',
  styleUrls: ['./us-center.component.scss'],
  providers: [LoaderService],
})
export class USCenterComponent {
  public tableDataBase: CommunicationCenter[] = [];
  public usForm: FormGroup;
  public availableAccessLevel = ACCESS_LEVELS.company;

  constructor(
    public loader: LoaderService,
    public config: DynamicDialogConfig,
    private dialog: DynamicDialogRef,
    private nodeService: CommunicationNodesService,
  ) {
    this.createForm();
    this.getCenters();
  }

  private createForm(): void {
    this.usForm = new FormGroup({
      division: new FormControl(null),
      number: new FormControl(null, Validators.required),
      center_type: new FormControl(null, Validators.required),
      uuid: new FormControl(null),
    });
  }

  public saveUsCenterForm(): void {
    const editableRow = this.tableDataBase.find(item => item.edit);
    if (!editableRow) {
      this.loader.startLoading(this.nodeService.createCommunicationCenter(this.getObjForBackend(), this.config.data.node_uuid ))
        .subscribe(res => {
        this.getCenters();
      });
      return;
    }
    this.loader.startLoading(this.nodeService.patchCommunicationCenter(this.getObjForBackend(), this.usForm.value.uuid))
      .subscribe(res => {
      this.getCenters();
    });
  }

  public doAction(mode: string, value: CommunicationCenter): void {
    const action = {
      edit: () => this.editUsCenter(value),
      delete: () => this.deleteUsCenter(value),
    };

    action[mode]();
  }

  private editUsCenter(value: CommunicationCenter): void {
    this.tableDataBase.forEach(item => {
      if (item.edit) {
        item.edit = false;
      }
    });

    value.edit = true;
    this.usForm.setValue({
      division: value.division,
      number: value.number,
      uuid: value.uuid,
      center_type: this.config.data.types.find(type => type.uuid === value.center_type.uuid )
    });
  }

  private deleteUsCenter(value: CommunicationCenter): void {
    this.loader.startLoading(this.nodeService.deleteCommunicationCenter(value.uuid)).subscribe(res => {
      this.tableDataBase = this.tableDataBase.filter(item => item !== value);
    });
  }

  private getCenters(): void {
    this.loader.startLoading(this.nodeService.getCommunicationCenters(this.config.data.node_uuid)).subscribe(res => {
      this.tableDataBase = res;
    });
  }

  private getObjForBackend(): any {
    const value = this.usForm.value;
    return {
      division: value.division ? { id: value.division?.id, label: value.division?.label } : null,
      number: value.number,
      center_type: value.center_type,
    };
  }
}
