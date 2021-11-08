import { Component, OnInit, OnDestroy, LOCALE_ID } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ReportComponent } from '.././components/dialogs/report/report.component';
import { SettingInformationGroupComponent } from '.././components/dialogs/setting-information-group/setting-information-group.component';
import { SettingsInformationArrayComponent } from '.././components/dialogs/settings-information-array/settings-information-array.component';
import { SharedProperty, Server } from './auth';
import { AuthService } from './auth.service';
import { forkJoin, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AttachDocumentDialogComponent } from '../../../shared/components/ospo/documents/attach-document-dialog/attach-document-dialog.component';
import { MilitaryUnitsDropdownService } from '../../../shared/components/ospo/military-units/military-units-dropdown/services/military-units-dropdown.service';
import { MilitaryUnit } from '../../../shared/components/ospo/military-units/military-units-dropdown/interfaces';
import { ActualizationService } from './actualization.service';
import { registerLocaleData } from '@angular/common';
import { AttachDocumentDialogService } from '../../../shared/components/ospo/documents/attach-document-dialog/attach-document-dialog.service';
import ru from '@angular/common/locales/ru';
import { Regulation } from '../components/dialogs/settings-information-array/interfaces/regulation';
import { Check } from '../components/dialogs/settings-information-array/interfaces/check';
import { Actualization, Files } from '../components/dialogs/settings-information-array/interfaces/actualization';
import { DocumentPreview } from '../../../shared/components/ospo/documents/attach-document-dialog/attach-document-dialog.types';

registerLocaleData(ru);

@Component({
  selector: 'app-actualization',
  templateUrl: './actualization.component.html',
  styleUrls: ['./actualization.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'ru-RU' }],
})

export class ActualizationComponent implements OnInit, OnDestroy {


  connectErrorMessage: string;
  inputSearch: string;
  value: Date = new Date();
  actualizations: Actualization[];
  selectedProducts: Actualization[];
  isConnect = false;
  selectedRows = [];
  spinnerFlag = false;
  regulations: Regulation[] = [];
  refReportDialog: DynamicDialogRef;
  selectFlag: boolean = false;
  is_edit: boolean = false;
  is_delete: boolean = false;
  editServer: string = '';
  currentDoc: DocumentPreview;
  check: Check;
  serverTypes: SharedProperty[];
  servers: Server[];
  selectedServerTypes: SharedProperty;
  selectedServers: Server;
  login: string;
  password: string;
  serverStream$ = new Subject<SharedProperty>();
  getServerTypeStream$;
  disableButton: boolean = false;
  first: number = 0;
  totalRecords: number = 0;

  constructor(
    public attach: AttachDocumentDialogService,
    public dialogService: DialogService,
    private auth: AuthService,
    private actual: ActualizationService,
    private militaryService: MilitaryUnitsDropdownService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('login11') && localStorage.getItem('password11')) {
      this.isConnect = true;
    }
    this.loadServersType();
  }

  ngOnDestroy(): void {
    this.serverStream$.unsubscribe();
    this.getServerTypeStream$.unsubscribe();
  }

  paginate(e: any) {
    if (this.inputSearch) {
      this.getArray(this.inputSearch, e.row, e.first);
    }
    else {
      this.getArray(null, e.row, e.first);
    }
  }

  selectServerType(e: Event): void {
    this.serverStream$.next(this.selectedServerTypes);
  }

  showReportDialog(row: Actualization[]): void {
    this.refReportDialog = this.dialogService.open(ReportComponent, {
      header: 'Отчет',
      width: '861px',
      data: [{ ...row }],
    });
  }

  openSettingInformationGroup(): void {
    this.refReportDialog = this.dialogService.open(SettingInformationGroupComponent, {
      header: 'Информационная группа',
      width: '1179px',
    });
  }

  openSettingInformationArray(): void {
    this.refReportDialog = this.dialogService.open(SettingsInformationArrayComponent, {
      header: 'Информационный массив',
      width: '1179px',
      dismissableMask: true,
    });
    this.refReportDialog.onClose.subscribe(() => {
      this.getArray();
    });
  }

  public openAttachDocuments(item = null): void {
    if (item == null) {
      this.dialogService.open(AttachDocumentDialogComponent, {
        header: 'Добавление документов',
        data: {
          addRegulation: true,
          attachMode: 'single',
        },
      }).onClose.subscribe(res => {
        this.getRegulation();
      });
    } else {
      this.attach.getDocument(item.document_uuid).subscribe(res => {
        this.currentDoc = res;
        this.dialogService.open(AttachDocumentDialogComponent, {
          header: 'Добавление документов',
          data: {
            selectedDocuments: this.currentDoc,
            addRegulation: true,
            attachMode: 'single',
          },
        }).onClose.subscribe(res => {
          this.getRegulation();
        });
      });
    }
  }

  connect(): void {
    let obj = {
      login: this.login,
      password: this.password,
      user_uuid: 'c8359722-283a-47b7-ad89-8a17e10f0cea',
      server_uuid: this.selectedServers.uuid,
    };
    this.disableButton = true;
    this.auth.connect(obj).subscribe(
      res => {
        this.setLocal();
        this.isConnect = true;
        this.getArray();
        this.getRegulation();
        this.getCheck();
        this.disableButton = false;
        this.connectErrorMessage = '';
      },
      error => {
        this.remove();
        this.isConnect = false;
        this.disableButton = false;
        this.connectErrorMessage = 'Пользователю запрещено подключаться к НЦУО';
      },
    );
  }

  disconnect(): void {
    this.disableButton = true;
    this.auth.disconnect().subscribe(
      res => {
        this.password = '';
        this.remove();
        this.isConnect = false;
        this.disableButton = false;
      },
      error => {
        this.remove();
        this.isConnect = false;
        this.disableButton = false;
      },
    );
  }

  editProduct(product: Actualization): void {
    this.spinnerFlag = true;
    forkJoin([this.auth.getSingleArr(product.uuid), this.militaryService.getMilitaryUnits()]).subscribe(([infArr, units]) => {
      const id = this.getMilitaryUnit(Number(infArr.military_unit_id), units);
      const ncoId = infArr.NCUO_id;
      this.refReportDialog = this.dialogService.open(SettingsInformationArrayComponent, {
        header: 'Информационный массив',
        data: {
          identificator: infArr.identificator,
          unit: id,
          nco: ncoId,
          tree: './' + infArr.root_dir,
          group: infArr.group_uuid,
          tracks: infArr.tracks,
          waitings: infArr.waitings,
          uuid: product.uuid,
          responsible: infArr.responsible_uuid,
          supervising: infArr.supervising_uuid
        },
        width: '1179px',
      });
      this.refReportDialog.onClose.subscribe(() => {
        this.getArray();
        this.spinnerFlag = false;
      });
    });
  }

  setLocal(): void {
    let t = '';
    for (let i = 0; i < this.password.length; i++) {
      t = t + 's';
    }
    localStorage.setItem('password11', t);
  }

  checkStatus(files: Files[]): string {
    let count = 0;
    let status;
    if (!files) {
      status = `Не проверялся`;
      return status;
    }
    if (files) {
      for (let i = 0; i < files.length; i++) {
        if (files[i].status === 'Не обновлён') {
          count++;
        }
      }
      if (count > 0 && files.length - count > 0) {
        status = `Обновлено ${files.length - count} из ${files.length}`;
      } else if (files.length - count == files.length) {
        status = `Обновлён`;
      } else {
        status = `Не обновлён`;
      }
      return status;
    }
  }

  getBackground(status: string): string {
    if (status == `Обновлён`) {
      return '#82C91E';
    }
    if (status == `Не обновлён` || status.includes(`Обновлено`)) {
      return '#FA5252';
    }
    if (status == `Не проверялся`) {
      return '#67737E';
    }
  }

  isConnected(): boolean {
    return this.isConnect;
  }

  selectInputItem(event: Server): void {
    this.selectedServers = event;
  }

  editInputItem(event: Server, inputType: string): void {
    this.is_edit = true;
    this.selectedServers = event;
  }

  deleteInputItem(event: Server, inputType: string): void {
    this.is_delete = true;
    this.selectedServers = event;
  }

  addInputItem(event: string, inputType: string): void {
    let obj = {
      server: event,
    };
    this.auth.addServer(this.selectedServerTypes.uuid, obj).subscribe(() => this.reloadServers());
  }

  delServerItem(): void {
    this.auth.deleteServer(this.selectedServers.uuid, this.selectedServers.server_type.uuid).subscribe(() => {
      this.reloadServers();
      this.is_delete = false;
    });
  }

  saveEditableItem(): void {
    let obj = {
      server: this.editServer,
    };
    this.auth.editServer(this.selectedServers.uuid, this.selectedServers.server_type.uuid, obj).subscribe(() => {
      this.reloadServers();
      this.editServer = '';
    });
    this.is_edit = false;
  }

  cancelEdit(): void {
    this.is_edit = false;
    this.is_delete = false;
    this.editServer = '';
  }

  deleteRegulation(regulation: Regulation): void {
    this.actual.deleteRegulation(regulation).subscribe(() => this.getRegulation());
  }

  deleteProduct(array: Actualization): void {
    const result = confirm('Вы точно хотите удалить массив?');
    if (result) {
      this.auth.deleteArray(array.uuid).subscribe(() => this.getArray());
    }
  }

  makeCheck(): void {
    let arr: string[] = [];
    this.selectedProducts.forEach(element => {
      arr.push(element.uuid);
    });
    this.attach.postCheck(arr).subscribe(() => {
      this.getArray();
      this.getCheck();
    });
    this.selectedProducts = [];
  }

  deleteCheck(item: Check): void {
    this.attach.deleteCheck(item).subscribe(() => {
      this.getArray();
      this.getCheck();
    },
      err => {
        alert('Невозможно удалить эту проверку');
      });
  }

  changeTypeOfDate(value: string): string {
    if (value) {
      let day = value.substr(0, 2);
      let month = value.substr(3, 2);
      let year = value.substr(6);
      return (`${month}.${day}.${year}`);
    }
  }

  onSearch() {
    if (this.isConnect) {
      this.getArray(this.inputSearch)
    }
  }

  private loadServersType(): void {
    this.serverStream$.pipe(
      switchMap(res => this.auth.getServers(res),
      ),
    ).subscribe(
      res => {
        this.servers = res;
        this.selectedServers = this.servers[0];
      },
      error => {
        this.remove();
        this.isConnect = false;
      },
    );

    this.getServerTypeStream$ = this.auth.getServerType().subscribe(
      res => {
        this.serverTypes = res;
        this.selectedServerTypes = this.serverTypes[0];
        this.serverStream$.next(this.selectedServerTypes);
      },
      error => {
        this.isConnect = false;
      },
    );
  }

  private reloadServers(): void {
    this.auth.getServers(this.selectedServerTypes)
      .subscribe(
        res => {
          this.servers = res;
          this.selectedServers = this.servers[0];
        },
        error => {
          this.remove();
          this.isConnect = false;
        },
      );
  }

  private getRegulation(): void {
    this.actual.getRegulations().subscribe(item => {
      this.regulations = item;
    });
  }

  private getCheck(): void {
    this.attach.getCheck().subscribe(res => this.check = res);
  }

  private getArray(search: string = null, limit: number = 8, offset: number = 0): void {
    this.auth.getArray(search, limit, offset).subscribe(
      res => {
        this.actualizations = res.result;
        this.totalRecords = res.count;
      },
    );
  }

  private getMilitaryUnit(id: number, units: MilitaryUnit[]): MilitaryUnit | null {
    const foundUnit = this.checkChildId(units, id);
    if (foundUnit) {
      return foundUnit;
    } else {
      return null;
    }
  }

  private checkChildId(things: MilitaryUnit[], id: number): MilitaryUnit | null {
    const result = things.map((thing) => {
      if (thing.id === id) {
        return thing;
      }
      if (thing.children) {
        return this.checkChildId(thing.children, id);
      } else {
        return null;
      }
    }).filter(elem => !!elem);
    if (result.length > 0) {
      return result[0];
    } else {
      return null;
    }
  }

  private remove(): void {
    localStorage.removeItem('login11');
    localStorage.removeItem('password11');
  }
}