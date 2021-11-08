import {Component, forwardRef, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Document} from '../../../../../../../shared/components/ospo/documents/documents.types';
import {NewEventDataService} from '../../services/new-event-data.service';
import {YearsService} from '../../../../../components/indication-off-the-year/components/services/years.service';
import {NewEventParams} from '../../../../types/desant-events.type';
import {MilitaryUnit} from 'src/app/shared/components/ospo/military-units/military-units-dropdown/interfaces';
import {FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {MilitaryComponent} from 'src/app/shared/components/military/military.component';
import {Period} from 'src/app/common-pages/settings/interfaces';
import {HttpParams} from '@angular/common/http';
import {LoaderService} from 'src/app/shared/components/loader/loader.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {NewEventApiService} from '../../services/new-event-api.service';
import {DesantTabsService} from '../../../../../services/desant-tabs.service';

@Component({
  selector: 'app-general-event-info',
  templateUrl: './general-event-info.component.html',
  styleUrls: ['./general-event-info.component.scss'],
  providers: [YearsService, LoaderService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MilitaryComponent),
      multi: true
    }
  ],
})
export class GeneralEventInfoComponent implements OnInit, OnDestroy {
  @Output() createdEventID = '';
  public documents: Document[] = [];
  public dateStartEvent: string;
  public dateEndEvent: string;
  public military_units: MilitaryUnit;
  public eventExistName: string[];
  public titleDoc = 'Файлы по мероприятию';
  public eventDescription: string;
  public periods: Period[];
  public filteredPeriods: Period[];
  public selectedPeriod: Period;
  public years = new Set();
  public eventExist = new Set();
  public form: FormGroup = this.initEventForm();
  public componentMode: string;
  public shdkInputUUID: string;
  private _selectedYear: number;
  private selectedMilitaryUnitID: number;
  private createdEventUUID: string;
  public yearsArray = [];
  private querySubscription: Subscription;


  constructor(public loader: LoaderService,
              public newEventService: NewEventApiService,
              public newEventDataService: NewEventDataService,
              private yearsService: YearsService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private desantTabService: DesantTabsService
  ) {
  }

  ngOnInit(): void {
    this.newEventDataService.activeTab = 0;
    this.form = this.initEventForm();
    this.querySubscription = this.activatedRoute.queryParams.subscribe(
      (queryParam: any) => {
        this.createdEventUUID = queryParam['uuid'];
        this.newEventDataService.eventUUID = queryParam['uuid'];
      }
    );
    // TODO: Поменять на динамическое, когда будет готов автовыбор militaryUnit
    this.selectedMilitaryUnitID = 84000000;
    this.getPeriods();
    this.getEventExist();
    if (this.createdEventUUID) {
      this.newEventDataService.newEventComponentState = 'edit';
      this.loader.startLoading(this.newEventService.getEventGeneralInfo(this.createdEventUUID)).subscribe(value => {
        this.shdkInputUUID = value?.shdk?.uuid;
        this.setFormValue(value);
      });
    }
  }
  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }

  public createOrChangeEvent(): void {
    if (this.form.valid && this.newEventDataService.newEventComponentState === 'create') {
      this.form.disable();
      this.loader.startLoading(this.newEventService.createNewEvent(this.setNewEventParams())).subscribe(value => {
        if (value) {
          this.newEventDataService.eventUUID = value.uuid;
          this.newEventDataService.newEventComponentState = 'edit';
          this.componentMode = 'edit';
          this.router.navigate(['.'], { relativeTo: this.activatedRoute, queryParams: {uuid: value.uuid}, queryParamsHandling: 'merge'});
        }
        this.form.enable();
      });
    } else {
      this.form.disable();
      this.loader.startLoading(this.newEventService.changeEvent(this.setChangeEventParams(), this.newEventDataService.eventUUID)).subscribe();
      this.form.enable();
    }

  }

  private getEventExist(): void {
   this.loader.startLoading(this.newEventService.getEventExistName(this.createExistEventParams(this.selectedMilitaryUnitID))).subscribe(value => {
      this.eventExistName = value.data;
      this.eventExistName.forEach(exist => this.eventExist.add(exist));
    });
  }


  public unicYears(): void {
    this.periods.forEach(period => this.years.add(period.year));
    this.years.forEach(value => this.yearsArray.push(value));

  }

  set selectedYear(year: number) {
    this._selectedYear = year;
  }

  get selectedYear(): number {
    return this._selectedYear;
  }

  public changeYearUuid(event: { value: number; }): void {
    this.selectedYear = event.value;
  }

  public onChange(event): void {
    this.filteredPeriods = this.periods?.filter((period) => period.year === event.value || period.year === event);
    this.form.controls.period.enable();
  }

  private getPeriods(): void {
    this.loader.startLoading(this.yearsService.getPeriods()).subscribe(res => {
        this.periods = res.data;
        this.unicYears();
      }
    );
  }

  private setNewEventParams(): any {
    const chooseDocUUID = [];
    this.documents.forEach(value => chooseDocUUID.push(value.uuid));
    this.selectedMilitaryUnitID = this.newEventDataService.selectedMilitaryUnit?.id;
    const params = {
      name: this.form.controls.name.value,
      description: this.form.controls.description.value,
      military_unit_id: this.selectedMilitaryUnitID,
      event_documents_uuid: chooseDocUUID,
      period_uuid: this.form.controls.period.value.uuid,
      shdk_uuid: this.form.controls.shdk_uuid.value.shdk_uuid,
      date_start_plan: this.setTime(this.form.controls.date_start_plan.value).toISOString(),
      date_end_plan: this.setTime(this.form.controls.date_end_plan.value).toISOString(),
    };
    return params;
  }


  private setChangeEventParams(): NewEventParams {
    const chooseDocUUID = [];
    this.documents.forEach(value => chooseDocUUID.push(value.uuid));
    this.selectedMilitaryUnitID = this.newEventDataService.selectedMilitaryUnit?.id;
    const params = {
      name: this.form.controls.name.value,
      description: this.form.controls.description.value,
      event_documents_uuid: chooseDocUUID,
      period_uuid: this.form.controls.period.value.uuid,
      shdk_uuid: this.form.controls.shdk_uuid.value.shdk_uuid,
      date_start_plan: this.setTime(this.form.controls.date_start_plan.value).toISOString(),
      date_end_plan: this.setTime(this.form.controls.date_end_plan.value).toISOString(),

    };
    return params;
  }

  private initEventForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      date_start_plan: new FormControl(null, Validators.required),
      date_end_plan: new FormControl(null, Validators.required),
      year: new FormControl(null, Validators.required),
      period: new FormControl({value: '', disabled: true}, Validators.required),
      shdk_uuid: new FormControl(null, Validators.required)
    });
  }

  private setTime(date: string): Date {
    const dateInput = new Date(date);
    const dateMSK = new Date(dateInput.setHours(dateInput.getHours() + 3));
    return dateMSK;
  }

  private setFormValue(eventGeneralInfo: any): void {
    this.form.controls.year?.setValue(eventGeneralInfo?.period.year);
    this.onChange(this.form.controls.year.value);
    this.form.controls.name?.setValue(eventGeneralInfo?.name);
    this.form.controls.date_start_plan?.setValue(new Date(eventGeneralInfo?.date_start_plan));
    this.form.controls.date_end_plan?.setValue(new Date(eventGeneralInfo?.date_end_plan));
    this.form.controls.description?.setValue(eventGeneralInfo?.description);
    this.form.controls.shdk_uuid.setValue(eventGeneralInfo?.shdk?.uuid);
    this.form.controls.period.setValue(eventGeneralInfo?.period);
    this.documents = eventGeneralInfo.event_documents;
  }

  private createExistEventParams(military_unit_id: number): HttpParams {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('military_unit_id', military_unit_id.toString());
    return httpParams;
  }
}
