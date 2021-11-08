import { EventEmitter, Input, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';

import { CreateEditPersonnelComponent } from '../../dialogs/create-edit-personnel/create-edit-personnel.component';
import { ReasonAbsenceComponent } from '../../dialogs/reason-absence/reason-absence.component';

import { takeWhile } from 'rxjs/operators';

import { LoaderService } from '../../../loader/loader.service';
import { Output } from '@angular/core';
import { SelectMilitaryMenComponent } from '../../../military/dialogs/select-military-men/select-military-men.component';

@Component({
  selector: 'app-completeness-table',
  templateUrl: './completeness-table.component.html',
  styleUrls: ['./completeness-table.component.scss'],
})
export class CompletenessTableComponent implements OnInit {
  @ViewChild('tableTemplates') tableTemplates: any;

  @Output() deleteRecordShdkEmitter = new EventEmitter<any>();
  @Output() deleteMilitaryManEmitter = new EventEmitter<{ shdkUuid: number; militaryMan: any }>();
  @Output() createNewShdkEmitter = new EventEmitter<{ divisionId: number; shdk: any }>();
  @Output() updateMilitaryManEmitter = new EventEmitter<{ shdkUuid: number; militaryMan: any }>();
  @Output() changeStatusEmitter = new EventEmitter<{ shdkUuid: number; status: any }>();

  @Input() set hierarchy(value) {
    if (value) {
      this._hierarchy = value;
      this.expandHierarchy();
    }
  }

  @Input() disabled: boolean = true;

  @Input() public hierarchyMode = 'bp';

  _hierarchy: any;

  columns = [
    { field: 'node', header: '', template: 'nodeTemplate' },
    { field: 'state', header: 'По штату', template: 'stateTemplate' },
    { field: 'list', header: 'По списку', template: 'listTemplate' },
    { field: 'face', header: 'На лицо', template: 'faceTemplate' },
    { field: 'disease', header: 'Болен', template: 'diseaseTemplate' },
    { field: 'command', header: 'Команд.', template: 'commandTemplate' },
    { field: 'empty', header: 'Отсутств.', template: 'emptyTemplate' },
    { field: 'procent', header: 'Процент', template: 'procentTemplate' },
    { field: 'controls', header: '', template: 'controlsTemplate' },
  ];

  constructor(private dialogService: DialogService, public loader: LoaderService) {}

  ngOnInit() {}

  public doAction(action) {
    const actions = {
      add: this.showEditPersonnelDialog.bind(this),
      deleteSecurityItem: this.deleteRecordShdk.bind(this),
      deleteMilitaryMan: this.deleteMilitaryMan.bind(this),
      edit: this.showEditServicemanDialog.bind(this),
      changeStatus: this.changeStatus.bind(this),
      setReason: this.showReasonAbsenceDialog.bind(this),
      addEmptyShdk: this.addEmptyShdk.bind(this),
    };

    actions[action.key]?.(action.value);
  }

  private deleteRecordShdk(value): void {
    this.deleteRecordShdkEmitter.emit(value.node.uuid);
  }

  private deleteMilitaryMan(value): void {
    const reqBody = { is_add: false, military_man: value.node.military_man };
    delete reqBody.military_man.expanded;
    delete reqBody.military_man.parent;
    this.deleteMilitaryManEmitter.emit({ shdkUuid: value.node.uuid, militaryMan: reqBody });
  }

  private showEditPersonnelDialog(value): void {
    let division = value.parent?.division;
    let callSignState;

    switch (value.parent.point) {
      case 'cn':
        callSignState = value.parent.call_sign;
        break;
      case 'center':
        callSignState = value.parent.center_type.name;
        break;
      case 'bp':
        callSignState = value.parent.type.name;
        break;
    }

    if (value.node.point === 'cn' || value.node.point === 'center' || value.node.point === 'bp') {
      division = value.node.division;
      switch (value.node.point) {
        case 'cn':
          callSignState = value.node.call_sign;
          break;
        case 'center':
          callSignState = value.node.center_type.name;
          break;
        case 'bp':
          callSignState = value.node.type.name;
          break;
      }
    }

    this.dialogService
      .open(CreateEditPersonnelComponent, {
        header: `Настройка личного состава по штату - ${callSignState}`,
        data: { value },
      })
      .onClose.pipe(takeWhile((res) => res))
      .subscribe((res) => {
        console.log({ divisionId: division.id, shdk: res });
        this.createNewShdkEmitter.emit({ divisionId: division.id, shdk: res });
      });
  }

  private showEditServicemanDialog(value): void {
    this.dialogService
      .open(SelectMilitaryMenComponent, {
        data: {
          value,
          mode: 'single',
          rankCategory: value.node.rank.category,
        },
        header: 'Выбрать военнослужащего',
        width: '1400px',
      })
      .onClose.pipe(takeWhile((res) => res))
      .subscribe((res) => {
        const reqBody = { is_add: true, military_man: res };
        this.updateMilitaryManEmitter.emit({ shdkUuid: value.node.uuid, militaryMan: reqBody });
      });
  }

  private showReasonAbsenceDialog(value): void {
    this.dialogService
      .open(ReasonAbsenceComponent, { data: { value }, header: 'Причина отсутствия', width: '476px' })
      .onClose.subscribe((res) => {
        this.changeStatusEmitter.emit({ shdkUuid: value.data.node.uuid, status: res });
      });
  }

  private changeStatus(value): void {
    for (const key in value.data.node.military_man.conditions) {
      value.data.node.military_man.conditions[key].status = false;
    }
    value.data.node.military_man.conditions[value.statusName].status = value.checked;

    if (value.statusName === 'lack') {
      this.showReasonAbsenceDialog(value);
    } else {
      const reqBody = { status: { ...value.data.node.military_man.conditions[value.statusName] } };
      this.changeStatusEmitter.emit({ shdkUuid: value.data.node.uuid, status: reqBody });
    }
  }

  public getTemplate(point): void {
    return this.tableTemplates[point];
  }

  private expandHierarchy(): void {
    this._hierarchy.hierarchy.expanded = true;
    this._hierarchy.hierarchy.children.forEach((children) => {
      this.expandChild(children);
    });
  }

  private expandChild(child): void {
    child.expanded = true;
    if (child.children?.length) {
      child.children.forEach((children) => this.expandChild(children));
    }
  }

  private addEmptyShdk(value): void {
    const reqBody = {
      divisionId: value.parent?.parent?.division.id,
      shdk: [{
        appointment: value.node.appointment,
        count: 1,
        rank: value.node.rank,
      }]
    };
    this.createNewShdkEmitter.emit(reqBody);
  }
}
