import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormArray, FormControl, FormGroup, } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { PromptDialogComponent } from '../../../../../../../shared/components/prompt-dialog/prompt-dialog.component';
import { BCHS, BchsGroup, MilitaryCity, Mode } from '../../../../../interfaces/interface';
import { BchsService } from '../../../../services/bchs.service';
import { CounterListService } from '../../../../services/counter-list.service';
import { StateService } from '../../../../services/state.service';
import { OspoCoordinatesComponent } from '../../../../../../../shared/components/ospo/ospo-coordinates/components/ospo-coordinates/ospo-coordinates.component';
import { COLS_WITHOUT_HEIGHT } from '../../../../../../../shared/components/ospo/ospo-coordinates/infrastucture/table-cols';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { BackEndCoordinates } from '../../../../../../../shared/components/ospo/ospo-coordinates/types/mark';

enum BchsControl {
  "ОГ “Антитеррор”" = 'mode',
  "Подразделения антитеррора в/г" = 'strengthGarrisonArray',
  "Подразделения антитеррора гарнизона" = 'antiterrorGarrison',
  "Подразделения усиления гарнизона" = 'strengthGarrison',
  "Резерв в НГ (НЗ)" = 'reserve',
  "Моб. рез. КВВО" = 'mobileReserve',
  "Функц. гр. ОШ ФСБ-КТО" = 'functionGroup',
  "Подразделение ликвидации последствий теракта" = 'liquidationDivision',
}

@Component({
  selector: 'app-military-city',
  templateUrl: './military-city.component.html',
  styleUrls: ['./military-city.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MilitaryCityComponent implements OnInit, ControlValueAccessor, OnDestroy {

  @Input() bchsData: BCHS;
  @Input() report: any;

  public trueBchsData: BCHS;
  public bchsForm: FormGroup;
  public formArray: FormArray;
  public headGarrisonArray: FormArray;
  public militaryCityUuid: string;
  public militaryCity: MilitaryCity;
  public objectCategories: BchsGroup[];
  public choseCategory: Mode;
  public reportUuid: string = '';
  public bchs: BCHS;
  public bchsGroup: Mode[];
  public showBchsFlag: boolean = false;
  public subscription = new Subscription();
  public amplificationsUuid: string[];

  constructor(
    private stateService: StateService,
    private http: CounterListService,
    private dialogService: DialogService,
    private bchsService: BchsService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {

    this.bchsForm = new FormGroup({
      strengthGarrisonArray: new FormControl(null),
      strengthGarrison: new FormControl(null),
      antiterrorGarrison: new FormControl(null),
      reserve: new FormControl(null),
      mobileReserve: new FormControl(null),
      functionGroup: new FormControl(null),
      liquidationDivision: new FormControl(null),
      cityName: new FormControl(null),
      cityNumber: new FormControl(0),
      coordinates: new FormControl(null),
      mode: new FormControl(null),
    });

  }

  public ngOnInit(): void {
    this.loadCategories();
    this.getBchsGroup();
    this.stateService.returnReportUuid().subscribe(res => this.reportUuid = res);
    if (this.bchsData) this.setBchsData(this.bchsData);
    this.trueBchsData = this.bchsData;
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public writeValue(value: any): void { }

  public registerOnChange(): void { }

  public registerOnTouched(): void { }

  public selectLabel(itemTree: MilitaryCity): void {
    this.amplificationsUuid = [];
    const data = this.report.bchs.find(r => r.military_station_uuid == itemTree.uuid);
    data?.uuid ? this.getBchs(data.uuid) : this.getBchs('');
    this.selectLabelWithoutChangingBCHS(itemTree);
  }

  public selectLabelWithoutChangingBCHS(itemTree: MilitaryCity): void {
    this.militaryCity = itemTree;
    this.militaryCityUuid = itemTree.uuid;
    this.bchsForm.controls['coordinates'].setValue(String(itemTree?.coordinate?.object_geom?.coordinates[0]) + ' ' + String(itemTree?.coordinate?.object_geom?.coordinates[1]));
    const index = itemTree.name.indexOf('-');
    if (index >= 0) {
      const row = itemTree.name.slice(index + 1)
      this.bchsForm.controls['cityNumber'].setValue(row);
      this.bchsForm.controls['cityName'].setValue(itemTree.name.slice(0, index));
      return
    }
    this.bchsForm.controls['cityName'].setValue(itemTree?.name);
    this.bchsForm.controls['cityNumber'].setValue(0);
  }

  public findGroup(reportName: string): Mode {
    return this.bchsGroup ? this.bchsGroup.find((r: Mode) => r.name === reportName) : null;
  }

  public setBchsData(bchsData: BCHS): void {
    if (bchsData) {
      this.showBchsFlag = true;
      this.bchs = bchsData;
      this.setAmplifications(bchsData);
      bchsData.groups.forEach(element => {
        this.setData(element);
      });
      this.militaryCityUuid = bchsData.military_station.uuid;
      this.choseCategory = bchsData.object_category;
      this.getMilitaryCityWithoutChangingBCHS(bchsData.military_station.uuid);
      this.changeDetectorRef.detectChanges();
    }
  }

  public getMilitaryCity(militaryStationUuid: string): void {
    this.bchsService.getMilitaryStation(militaryStationUuid).subscribe(res => this.selectLabel(res));
  }

  public getMilitaryCityWithoutChangingBCHS(militaryStationUuid: string): void {
    this.bchsService.getMilitaryStation(militaryStationUuid).subscribe(res => this.selectLabelWithoutChangingBCHS(res));
  }

  public setAmplifications(bchsData: BCHS): void {
    let amplifications = [];
    let amplificationsUuid = [];
    bchsData?.amplification_objects.forEach(element => {
      let obj = {
        name: element.amplification_object.name,
        garrisonStr: {
          soldiers: element?.amplification_shdk_count ? element?.amplification_shdk_count : null,
          work_time: element?.amplification_work_time?.work_time ? element?.amplification_work_time?.work_time : null,
          not_work_time: element?.amplification_not_work_time?.not_work_time ? element?.amplification_not_work_time?.not_work_time : null,
          autoTransport: element?.amplification_vvst_at_count ? element?.amplification_vvst_at_count : null,
          armoredTransport: element?.amplification_vvst_bt_count ? element?.amplification_vvst_bt_count : null,
        },
      };
      amplifications.push(obj);
      amplificationsUuid.push(element.amplification_object.uuid);
    });
    this.amplificationsUuid = amplificationsUuid;
    this.bchsForm.controls['strengthGarrisonArray'].patchValue(amplifications);
  }

  public setData(bchs: BchsGroup): void {
    const name = BchsControl[bchs.name];
    const workTime = bchs?.work_time?.work_time;
    const notWorkTime = bchs?.not_work_time?.not_work_time;
    name === "mode" ? this.setModeData(bchs, workTime, notWorkTime, name) : this.setNotModeData(bchs, workTime, notWorkTime, name);
  }

  public setModeData(bchs: BchsGroup, workTime: string, notWorkTime: string, name: string): void {
    const soldiers = bchs.shdk_mode_v_count;
    const secondSoldiers = bchs.shdk_mode_ab_count;
    this.bchsForm.controls[name].patchValue({
      soldiers: soldiers ? soldiers : null,
      secondSoldiers: secondSoldiers ? secondSoldiers : null,
      work_time: workTime ? workTime : null,
      not_work_time: notWorkTime ? notWorkTime : null,
    });
  }

  public setNotModeData(bchs: BchsGroup, workTime: string, notWorkTime: string, name: string): void {
    const soldiers = bchs.shdk_bchs_group_count;
    const vvstBchsAtCount = bchs?.vvst_bchs_at_count;
    const vvstBchsBtCount = bchs?.vvst_bchs_bt_count;
    this.bchsForm.controls[name].patchValue({
      soldiers: soldiers ? soldiers : null,
      work_time: workTime ? workTime : null,
      not_work_time: notWorkTime ? notWorkTime : null,
      autoTransport: vvstBchsAtCount ? vvstBchsAtCount : null,
      armoredTransport: vvstBchsBtCount ? vvstBchsBtCount : null,
    });
  }

  public makeBCHS(): void {
    this.http.makeBCHS(this.choseCategory.uuid, this.militaryCity.uuid, this.reportUuid).pipe(
      tap(res => {
        this.bchs = res;
        this.showBchsFlag = true;
        this.getBchs(this.bchs.uuid);
        this.changeDetectorRef.detectChanges();
      }),
      mergeMap(() => this.http.httpReport(this.reportUuid))
    ).subscribe(res => this.http.report.next(res))
  }

  public getBchsGroup(): void {
    this.bchsService.getBchsGroup().subscribe(res => {
      this.bchsGroup = res.data;
      this.changeDetectorRef.detectChanges();
    });
  }

  public loadCategories(): void {
    this.http.getObjectCategory().subscribe(res => this.objectCategories = res.data);
  }

  public selectType(e: Mode): void {
    this.choseCategory = e;
  }

  public editType(e: Mode): void {
    this.dialogService.open(PromptDialogComponent, {
      header: 'Изменение категории объекта',
    }).onClose.pipe(filter(res => res))
      .subscribe(res => { this.http.editObjectCategory(res, e.uuid).subscribe(() => this.loadCategories()) });
  }

  public showNoBchsInThisCity() {
    this.clearValues();
    this.showBchsFlag = false;
    this.changeDetectorRef.detectChanges();
  }

  public deleteType(e: Mode): void {
    this.http.deleteObjectCategory(e.uuid).subscribe(() => this.loadCategories());
  }

  public createType(e: string): void {
    this.http.addObjectCategory(e).subscribe(() => this.loadCategories());
  }

  public clearValues(): void {
    this.clearValueBySelector('strengthGarrison');
    this.clearValueBySelector('antiterrorGarrison');
    this.clearValueBySelector('functionGroup');
    this.clearValueBySelector('liquidationDivision');
    this.clearValueBySelector('reserve');
    this.clearArrayValueBySelector('strengthGarrisonArray');
    this.clearValueMode();
  }

  public clearBCHS() {
    this.bchsService.clearBchs(this.bchs.uuid).subscribe(() => {
      this.clearValues();
      this.getBchs(this.bchs.uuid)
    });
  }

  public clearValueMode(): void {
    this.bchsForm.controls["mode"].patchValue({
      soldiers: null,
      secondSoldiers: null,
      work_time: null,
      not_work_time: null,
    });
  }

  public clearValueBySelector(name: string): void {
    this.bchsForm.controls[name].patchValue({
      soldiers: null,
      work_time: null,
      not_work_time: null,
      autoTransport: null,
      armoredTransport: null,
    });
  }

  public clearArrayValueBySelector(name: string): void {
    this.bchsForm.controls[name].patchValue(null);
  }

  public setCoordinate(): void {
    this.dialogService.open(OspoCoordinatesComponent, {
      header: 'Координаты', width: '90%',
      data: {
        height: false,
        cols: COLS_WITHOUT_HEIGHT,
      }
    }).onClose.pipe(
      filter(res => res),
      map(res => ` ${res.object_geom.coordinates[0]} ${res.object_geom.coordinates[1]}`)
    ).subscribe(res => {
      this.bchsForm.controls['coordinates'].setValue(res);
    });
  }

  private getBchs(uuid: string) {
    if (uuid) {
      this.bchsService.getBchs(uuid).pipe(
        filter(res => !!res)
      ).subscribe(res => {
        this.trueBchsData = res;
        this.setBchsData(this.trueBchsData);
      })
    }
    else {
      this.showNoBchsInThisCity();
    }
  }
}