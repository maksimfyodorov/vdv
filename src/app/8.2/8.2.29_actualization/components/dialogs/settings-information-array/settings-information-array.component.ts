import { Component, OnInit, OnDestroy } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomTree } from "./interfaces/custom-tree";
import { SettingsInfArrayService } from "./services/settings-inf-array.service";
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MilitaryUnitsDropdownService } from '../../../../../shared/components/ospo/military-units/military-units-dropdown/services/military-units-dropdown.service';
import { SettingInformationGroupComponent } from '../setting-information-group/setting-information-group.component';
import { NodeComponent } from './components/node/node.component';
import { Waiting } from './components/node/waiting';
import { InformationGroup, Track } from '../setting-information-group/interfaces';
import { CreateInformationArray } from './interfaces/actualization';
import { Executive } from '../../../../../shared/components/military/interfaces';

@Component({
  selector: 'app-settings-information-array',
  templateUrl: './settings-information-array.component.html',
  styleUrls: ['./settings-information-array.component.scss'],
  providers: [MilitaryUnitsDropdownService]
})
export class SettingsInformationArrayComponent implements OnInit, OnDestroy {
  infArray: InformationGroup[];
  files2: TreeNode[];
  tracking = new FormArray([]);
  refReportDialog: DynamicDialogRef;
  root_dir: string = ''
  tracks: Track[] = []
  editingFlag: boolean = false;

  waitings: Waiting[] = [];
  selectedForPropreties: string = ''
  folder;
  militaryForm: FormGroup;
  tree: CustomTree;
  selectedInfGroupNumber: string = ''
  selectedInfGroupSection: string = ''
  selectedInfGroupCharacter: string = ''
  selectedInfGroupForm: string[] = []
  infGroupForm: string = '';
  edittingUuid: string = '';
  getDirectoryStream$;
  flag: boolean = false;
  disableButton: boolean = false;
  responsible: Executive;
  supervising: Executive;
  supervising_uuid: string = ''
  responsible_uuid: string = ''


  constructor(
    private arrayService: SettingsInfArrayService,
    public dialogService: DialogService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
  ) { }

  ngOnInit(): void {
    this.getDirectoryStream$ = this.arrayService.getDirectory().subscribe(
      tree => {
        this.tree = tree;
      }
    )
    this.createMilitaryForm();
    if (this.config?.data) {
      this.proretiesInit();
    }
    else {
      this.flag = true
      this.initInformationGroup();
    }
  }

  addNode(node: Waiting): void {
    this.dialogService.open(NodeComponent, {
      header: 'Настройка ожиданий',
      width: '759px',
    }).onClose.subscribe(res => {
      if (res) {
        node.children.push({
          path: node.path + '/' + res.path,
          is_dir: res.is_dir,
          children: []
        })
      }
    });
  }

  deleteNode(node: Waiting) {
    this.findNode(this.waitings, node)
  }

  findNode(wait: Waiting[], node: Waiting) {
    wait.map(el => {
      if (el.path == node.path) {
        wait.splice(wait.indexOf(el), 1)
      }
      else if (el.children.length) {
        this.findNode(el.children, node)
      }
    })
  }

  addWaiting(): void {
    this.dialogService.open(NodeComponent, {
      header: 'Настройка ожиданий',
      width: '759px',
    }).onClose.subscribe(res => {
      if (res) {
        this.waitings.push(res as Waiting)
      }
    });
  }

  ngOnDestroy(): void {
    this.getDirectoryStream$.unsubscribe();
  }

  openInformationGroup(): void {
    this.refReportDialog = this.dialogService.open(SettingInformationGroupComponent, {
      header: 'Информационная группа',
      width: '1179px',
    });
  }

  selectLabel(itemTree: CustomTree): void {
    this.root_dir = itemTree.name;
  }

  addTrack(data: Track = null): void {
    const group = new FormGroup({
      info: new FormControl()
    });
    group.controls.info.setValue(data)
    this.tracking.push(group);
  }

  deleteTrack(n: number): void {
    this.tracking.removeAt(n);
  }

  showtrack(): void {
    this.tracks = [];
    this.tracking.value.forEach(element => {
      this.tracks.push(element.info);
    });
  }

  choose(): void {
    this.militaryForm.controls.number.setValue(this.militaryForm.value.group.number)
    this.militaryForm.controls.section.setValue(this.militaryForm.value.group.section.name)
    this.militaryForm.controls.character.setValue(this.militaryForm.value.group.character.name)
    if (this.flag === true) {
      for (let i = this.tracking.length - 1; i >= 0; i--) {
        this.deleteTrack(i)
      }
      this.militaryForm.value.group.tracks.forEach(element => {
        this.addTrack(element)
      });
    }
    this.selectedInfGroupForm = [];
    this.militaryForm.value.group.forms.forEach(element => {
      this.selectedInfGroupForm.push(element.name)
    });
    this.militaryForm.controls.form.setValue(this.selectedInfGroupForm.join(', '))
    this.flag = true
  }

  closeDialog(): void {
    this.ref.close();
  }

  saveInformationArray(): void {
    this.showtrack();
    let obj: CreateInformationArray = this.getRequestBody()
    if (obj) {
      this.disableButton = true
      if (!this.editingFlag) {
        this.makeNewArray(obj);
      }
      if (this.editingFlag) {
        this.editArray(obj);
      }
    }
  }

  private createMilitaryForm(): void {
    this.militaryForm = new FormGroup({
      identificator: new FormControl('', [Validators.required, Validators.minLength(1)]),
      military_unit: new FormControl('', [Validators.required, Validators.minLength(1)]),
      nco: new FormControl('', [Validators.required, Validators.minLength(1)]),
      group: new FormControl('', [Validators.required, Validators.minLength(1)]),
      number: new FormControl('', [Validators.required, Validators.minLength(1)]),
      section: new FormControl('', [Validators.required, Validators.minLength(1)]),
      character: new FormControl('', [Validators.required, Validators.minLength(1)]),
      form: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });
  }

  private getRequestBody(): CreateInformationArray {
    if (this.root_dir &&
      this.waitings.length &&
      this.tracks.length &&
      this.militaryForm.valid &&
      this.supervising &&
      this.responsible
    ) {
      let root: string;
      if (this.root_dir[0] == '.') {
        root = this.root_dir.substr(1);
      }
      else {
        root = this.root_dir;
      }
      const waitings = this.deleteAllPArent(this.waitings);
      let obj: CreateInformationArray = {
        identificator: this.militaryForm.value.identificator,
        root_dir: root,
        responsible_uuid: this.responsible.uuid,
        supervising_uuid: this.supervising.uuid,
        military_unit_id: this.militaryForm.value.military_unit.id,
        NCUO_id: this.militaryForm.value.nco,
        group_uuid: this.militaryForm.value.group.uuid,
        tracks: this.tracks,
        waitings: waitings
      }
      return obj
    }
    else {
      alert('Заполните все поля')
      return null
    }
  }

  deleteAllPArent(node: Waiting[]): Waiting[] {
    let newNode = node.map(element => {
      delete element?.parent
      if (element.children.length) {
        this.deleteAllPArent(element.children)
      }
      return element
    });
    return newNode
  }

  setResponse(event: Executive) {
    this.responsible = event;
  }

  setSupervising(event: Executive) {
    this.supervising = event;
  }

  private makeNewArray(obj: CreateInformationArray): void {
    this.arrayService.addArray(obj).subscribe(
      res => {
        this.disableButton = false;
        this.closeDialog();
      },
      err => {
        this.disableButton = false;
        alert('Ошибка')
      })
  }

  private editArray(obj: CreateInformationArray): void {
    this.arrayService.editArray(obj, this.edittingUuid).subscribe(
      res => {
        this.disableButton = false;
        this.closeDialog();
      },
      err => {
        this.disableButton = false;
        alert('Ошибка')
      })
  }

  private proretiesInit(): void {
    this.militaryForm.controls.identificator.setValue(this.config.data?.identificator);
    this.militaryForm.controls.military_unit.setValue(this.config.data?.unit);
    this.militaryForm.controls.nco.setValue(this.config.data?.nco);
    this.selectedForPropreties = this.config.data?.tree;
    this.root_dir = this.selectedForPropreties;
    this.supervising_uuid = this.config.data.supervising
    this.responsible_uuid = this.config.data.responsible
    this.initInformationGroup(this.config.data?.group);
    this.config.data?.tracks.forEach(element => {
      this.addTrack(element);
    });
    const changeType = (arr: Waiting[]): Waiting[] => {
      return arr.map(el => {
        return {
          path: el.path,
          is_dir: el.is_dir,
          children: el.children ? changeType(el.children) : [],
        }
      })
    }
    this.edittingUuid = this.config.data?.uuid;
    this.waitings = changeType(this.config.data.waitings)
    this.editingFlag = true;
  }

  private initInformationGroup(uuid: string = null): void {
    this.arrayService.getGroups().subscribe(res => {
      this.infArray = res;
      if (uuid === null) {
        this.militaryForm.controls.group.setValue(this.infArray[0]);
        this.choose();
      }
      else {
        for (let i = 0; i < this.infArray.length; i++) {
          if (this.infArray[i].uuid === uuid) {
            this.militaryForm.controls.group.setValue(this.infArray[i]);
            this.choose();
          }
        }
      }
    })
  }

}