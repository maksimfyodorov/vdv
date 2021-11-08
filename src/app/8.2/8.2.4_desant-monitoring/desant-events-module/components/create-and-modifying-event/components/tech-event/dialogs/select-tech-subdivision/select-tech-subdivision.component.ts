import {Component, OnInit} from '@angular/core';
import {VvstParachuteSystemComponent} from '../../../desant-event-staff/dialogs/vvst-parachute-system/vvst-parachute-system.component';
import {Paratroopers} from '../../../../types/new-desant-event-dialog.types';
import {HttpParams} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Divisions, ParachuteSystem} from '../../../../../../types/desant-events.type';
import {Aircraft} from '../../../../../../../types/aircraftInterface';
import {LoaderService} from '../../../../../../../../../shared/components/loader/loader.service';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {NewEventApiService} from '../../../../services/new-event-api.service';
import {NewEventDataService} from '../../../../services/new-event-data.service';

@Component({
  selector: 'app-select-tech-subdivision',
  templateUrl: './select-tech-subdivision.component.html',
  styleUrls: ['./select-tech-subdivision.component.scss'],
  providers: [DialogService, LoaderService],
})
export class SelectTechSubdivisionComponent implements OnInit {
  public form: FormGroup = this.initForm();
  public subdivisions: Divisions[];
  public subdivisionMilitaryCount: number;
  public parachuteSystems: ParachuteSystem[];
  public paratroopers: Paratroopers[];
  public airplaneType: Aircraft;
  public selectedParatroopers: Paratroopers[];
  public totalParatroopers: number;
  public departuresNumber: number;
  public departuresNumberRecommended: number;
  public dateParachutePacking: string;
  private newTaskUUID: string;
  private completingUUID: string;
  private selectedDesantUnits: Paratroopers[];
  private componentState: string;

  constructor(public loader: LoaderService,
              private dialogService: DialogService,
              private dynamicDialogConfig: DynamicDialogConfig,
              private newEventService: NewEventApiService,
              private newEventDataService: NewEventDataService,
              private dialogRef: DynamicDialogRef) {
  }

  ngOnInit(): void {
    this.form = this.initForm();
    this.getDivisionList();
    this.getParachuteSystems();
    this.newTaskUUID = this.dynamicDialogConfig.data?.task_uuid;
    this.airplaneType = this.dynamicDialogConfig.data?.airplaneInfo;
    if (this.dynamicDialogConfig.data?.completing_uuid) {
      this.componentState = 'edit';
      this.newEventService.getCompletingFullInfo(this.dynamicDialogConfig.data?.completing_uuid).subscribe(value => {
        this.setChangeCompletingInfo(value);
      });
    }
  }


  public getVVSTGroups(): void {
    this.loader.startLoading(this.newEventService.getParatroopers(this.setQueryParamsForGetParatroopers(this.form.controls?.subdivisions?.value?.id.toString()))).subscribe(value => {
      this.paratroopers = value?.data;
      for (const variable in this.paratroopers) {
        this.paratroopers[variable] = Object.assign({
          date_parachute_packing_main: null,
          date_parachute_packing_reserve: null,
        }, this.paratroopers[variable]);
      }
    });
    this.totalParatroopers = this.paratroopers?.length;
  }

  public addParatrooper(): void {
    if (this.componentState === 'edit') {
      this.changeCompletingLanding();
    } else {
      this.loader.startLoading(this.newEventService.postNewStaffCompleting(this.setNewCompletingParams())).subscribe(value => {
        this.completingUUID = value.uuid;
        if (value) {
          this.loader.startLoading(this.newEventService.postParatrooperForStaff(this.addParatroopersParams(this.selectedParatroopers))).subscribe(result => {
            if (result) {
              this.dialogRef.close(this.completingUUID);
            } else {
              console.error('Произошла ошибка добавления парашютистов');
            }
          });
        } else {
          console.error('Произошла ошибка создания этапа');
        }
      });
    }
  }

  public closeModal(): void {
    this.dialogRef.close();
  }

  public setParatroopersFullName(name: string, middle_name: string, surname: string): string {
    return `${surname} ${name.substr(0, 1)}.${middle_name.substr(0, 1)}.`;
  }

  public showSelectionMenu(): void {
    this.dialogService.open(VvstParachuteSystemComponent, {
      dismissableMask: true,
      header: 'Техника ВДС',
      width: '1193px'
    });
  }

  private setNewCompletingParams(): any {
    const params = {
      ready_time: this.form.controls.ready_time.value,
      departure_count: this.departuresNumber,
      date_plan: this.setTime(this.form.controls.desant_date.value).toISOString(),
      task_uuid: this.newTaskUUID,
      division_id: this.form.controls.subdivisions.value?.id,
    };
    return params;
  }

  private addParatroopersParams(selectedParatrooper: Paratroopers[]): any {
    this.selectedDesantUnits = selectedParatrooper;
    const params = {
      items: [],
    };
    for (const index in selectedParatrooper) {
      this.selectedDesantUnits[index] = Object.assign({
        completing_uuid: this.completingUUID,
        paratrooper_uuid: this.selectedDesantUnits[index].uuid,
        vvst_fixation_main_uuid: this.selectedDesantUnits[index].vvst_fixation_main?.uuid,
        vvst_fixation_reserve_uuid: this.selectedDesantUnits[index].vvst_fixation_reserve?.uuid,
        date_parachute_packing_main: this.setTime(this.selectedDesantUnits[index].date_parachute_packing_main).toISOString(),
        date_parachute_packing_reserve: this.setTime(this.selectedDesantUnits[index].date_parachute_packing_reserve).toISOString(),
      });
      params.items.push(this.selectedDesantUnits[index]);
    }
    return params;
  }

  private setQueryParamsForGetParatroopers(id: string): HttpParams {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('division_id', id);
    return httpParams;
  }

  public setDatePackingGeneral($event: Date): void {
    // TODO: Реализовать метод массовой замены даты укладки
  }

  public calculateOnRow($event: any): void {
    this.subdivisionMilitaryCount = this.selectedParatroopers?.length;
    this.departuresNumberRecommended = this.calculateNumberOfDeparture(this.subdivisionMilitaryCount);
  }

  public calculateOnHeaderRow($event: any): void {
    this.subdivisionMilitaryCount = this.selectedParatroopers?.length;
    this.departuresNumberRecommended = this.calculateNumberOfDeparture(this.subdivisionMilitaryCount);
  }

  private calculateNumberOfDeparture(elementCount: number): number {
    let numberOfDeparture = 1;
    if (elementCount % this.airplaneType?.capacity_ls !== 0) {
      numberOfDeparture += Math.floor(elementCount / this.airplaneType?.capacity_ls);
    } else {
      numberOfDeparture = elementCount / this.airplaneType?.capacity_ls;
    }
    return numberOfDeparture;
  }

  private setTime(date: string): Date {
    const dateInput = new Date(date);
    const dateMSK = new Date(dateInput.setHours(dateInput.getHours() + 3));
    return dateMSK;
  }

  private initForm(): FormGroup {
    return new FormGroup({
      subdivisions: new FormControl('', Validators.required),
      ready_time: new FormControl('', Validators.required),
      desant_date: new FormControl('', Validators.required),
      airplane: new FormControl('', Validators.required),
      departure_count: new FormControl('', Validators.required),
      parachute_system: new FormControl('', Validators.required),
      date_picking_general: new FormControl('', Validators.required),
    });
  }

  private getDivisionList(): void {
    this.loader.startLoading(this.newEventService.getDivisionByMilitaryUnit(84000000)).subscribe(value => {
      this.subdivisions = value;
    });
  }

  private getParachuteSystems(): void {
    this.loader.startLoading(this.newEventService.getParachute()).subscribe(value => {
      this.parachuteSystems = value.data;
    });
  }

  private setChangeCompletingInfo(value: any): void {
    this.completingUUID = value.uuid;
    this.departuresNumber = value?.departure_count;
    this.form.controls.ready_time.setValue(value?.ready_time);
    this.form.controls.desant_date.setValue(new Date(value?.date_plan));
    this.loader.startLoading(this.newEventService.getDivisionByMilitaryUnit(84000000)).subscribe(res => {
      res.forEach(element => {
        if (element.id === value.division.id) {
          this.form.controls.subdivisions.setValue(element);
          this.getVVSTGroups();
        }
      });
    });
  }

  private changeCompletingLanding(): void {
    this.loader.startLoading(this.newEventService.putCompleting(this.setNewCompletingParams(), this.completingUUID)).subscribe(value => {
      if (value) {
        this.loader.startLoading(this.newEventService.putParatrooperForStaff(this.addParatroopersParams(this.selectedParatroopers), this.completingUUID)).subscribe(result => {
          if (result) {
            this.dialogRef.close(this.completingUUID);
          } else {
            // TODO: На back-e пока не работает
            console.error('Произошла ошибка добавления парашютистов');
          }
        });
      } else {
        console.error('Произошла ошибка создания изменения этапа');
      }
    });
  }
}
