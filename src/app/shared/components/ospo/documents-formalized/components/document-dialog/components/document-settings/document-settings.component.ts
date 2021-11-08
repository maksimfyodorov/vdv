import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { Periods, PERIODS, WEEKS_NUMBERS } from './document-settings.constants';
import { DocumentSettingsService } from './services/document-settings.service';
import { DialogService } from 'primeng/dynamicdialog';
import { AbstractControl, FormArray, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Executive, MilitaryMen } from '../../../../../../military/interfaces';
import { DocumentConfig, Militaries, MilitaryUnits } from '../../../../interfaces/document-config.interfaces';
import { LoaderService } from '@app/shared/components/loader/loader.service';
import { MilitaryUnit } from '@app/shared/components/ospo/military-units/military-units-dropdown/interfaces';
import { TreeNode } from 'primeng/api';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Period } from '@app/8.1/8.1.4_uav-information/components/flight-plans/types/period';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-document-settings',
  templateUrl: './document-settings.component.html',
  styleUrls: ['./document-settings.component.scss'],
  providers: [DocumentSettingsService, {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DocumentSettingsComponent),
    multi: true,
  }],
})
export class DocumentSettingsComponent implements OnInit {

  @Input()
  public configData: DocumentConfig;

  public get periodsArray(): FormArray {
    return this.documentSettingsForm.get('periods') as FormArray;
  }

  public get militaryUnitsArray(): FormArray {
    return this.documentSettingsForm.get('military_units') as FormArray;
  }

  public get signersArray(): FormArray {
    return this.documentSettingsForm.get('signers') as FormArray;
  }

  public get approversArray(): FormArray {
    return this.documentSettingsForm.get('approvers') as FormArray;
  }

  public get coordinatorsArray(): FormArray {
    return this.documentSettingsForm.get('coordinators') as FormArray;
  }

  public get selectedMilitaryUnits(): MilitaryUnit[] {
    return this._selectedMilitaryUnits;
  }

  public set selectedMilitaryUnits(value: MilitaryUnit[]) {
    this._selectedMilitaryUnits = value;
    this.militaryUnitsArray.clear();
    value.forEach(_ => this.militaryUnitsArray.push(this.createMilitaryUnit()));
    this.militaryUnitsArray.patchValue(value);
  }

  public documentSettingsForm: FormGroup;
  public isExpanded = true;
  public periodsToRender: Periods[] = [];
  public weeksNumbers: number[] = WEEKS_NUMBERS;
  public years: number[] = [];
  public periods: Periods;
  public militaryUnits: MilitaryUnits;
  public fetchedMilitaryUnits: MilitaryUnit[] = [];
  public filteredMilitaryUnits: MilitaryUnit[] = [];
  public flatMilitaryUnitsList: MilitaryUnit[] = [];
  public isSearching = false;
  public signers: Militaries;
  public approvers: Militaries;
  public coordinators: Militaries;
  public militaryUnit: number | null;
  public yearsInPeriodsSection: number[] = [];
  private fetchedPeriods: Period[] = [];
  private count = 0;
  private _selectedMilitaryUnits: MilitaryUnit[] = [];

  constructor(
    private readonly documentSettingsService: DocumentSettingsService,
    private readonly dialogService: DialogService,
    private readonly fb: FormBuilder,
    private readonly loader: LoaderService,
  ) {
  }

  public ngOnInit(): void {
    this.getConfigData();
    this.getPeriodsToRender();
    this.buildForm();
    this.getFetchedPeriods();
    this.getSigners();
    this.getApprovers();
    this.getCoordinators();
    this.documentSettingsService.getYears().subscribe(res => this.years = res);
    this.setPresetedMilitaryMen();
    this.militaryUnit && this.getMilitaryUnits();
    this.formChanges();
    this.searchMilitaryUnits();
  }

  public ngAfterViewInit(): void {
    this.checkFormValidityOnInit();
  }

  public createPeriod(): void {
    this.periodsArray.push(this._createPeriod());
  }

  public deletePeriod(index: number): void {
    this.periodsArray.removeAt(index);
  }

  public deleteMilitaryUnit(index: number, militaryUnit: AbstractControl): void {
    this.documentSettingsForm.get('military_units_search').setValue('');
    this.militaryUnitsArray.removeAt(index);
    const currentMilitaryUnitIndex = this._selectedMilitaryUnits.findIndex(m => m.id === militaryUnit.value.id);
    this._selectedMilitaryUnits.splice(currentMilitaryUnitIndex, 1);
  }

  public createSigner(): void {
    this.signersArray.push(this._createMilitaryMan());
  }

  public deleteSigner(index: number): void {
    this.signersArray.removeAt(index);
  }

  public createCoordinator(): void {
    this.coordinatorsArray.push(this._createMilitaryMan());
  }

  public deleteCoordinator(index: number): void {
    this.coordinatorsArray.removeAt(index);
  }

  public createApprover(): void {
    this.approversArray.push(this._createMilitaryMan());
  }

  public deleteApprover(index: number): void {
    this.approversArray.removeAt(index);
  }

  public getMilitaryMan(event: MilitaryMen | Executive, itemOfFormArray: AbstractControl): void {
    const militaryMan = {
      name: `${event.military_man.name.substr(0, 1)}.${event.military_man.surname}`,
      rank: event.military_man.rank.name,
      rank_and_name: `${event.military_man.rank.name} ${event.military_man.name.substr(0, 1)}.${event.military_man.surname}`,
      division: event.military_man.division,
      appointment: event.appointment.name,
      military_man_uuid: event.military_man.uuid,
    };

    itemOfFormArray.patchValue(militaryMan);
  }

  public writeValue(outsideValue: any): void {
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  private getSigners(): void {
    this.configFormArray(this.signers, this.signersArray);
  }

  public toggleButton(event: MatSlideToggleChange): void {
    this.documentSettingsForm.get('military_units_search').setValue('');
    event.checked ? this.getDivisions() : this.getMilitaryUnits();
  }

  public yearInPeriodsSectionChanged(event: { originalEvent: MouseEvent, value: number }, period: AbstractControl): void {
    const periodsOfYear = this.fetchedPeriods.filter(period => period.year === event.value);
    period.get('periodValue').get('periods').patchValue({
      periodsOfYear,
      selectedPeriodUuid: null,
      selectedPeriod: null,
    });
  }

  public selectedPeriodChanged(event: { originalEvent: MouseEvent, value: string }, period: AbstractControl): void {
    const selectedPeriod = this.fetchedPeriods.find(period => period.uuid === event.value);
    period.get('periodValue').get('periods').patchValue({ selectedPeriod });
  }

  public clearMilitaryUnitsArray(): void {
    this.documentSettingsForm.get('military_units_search').setValue('');
    this.militaryUnitsArray.clear();
    this._selectedMilitaryUnits = [];
  }

  private getApprovers(): void {
    this.configFormArray(this.approvers, this.approversArray);
  }

  private getCoordinators(): void {
    this.configFormArray(this.coordinators, this.coordinatorsArray);
  }

  private configFormArray(militaries: Militaries, formArray: FormArray): void {
    const amount = Math.max(militaries.amount, militaries.amountOfRequired, militaries.preseted.length);
    for (let i = 0; i < amount; i++) {
      formArray.push(this._createMilitaryMan());
    }

    if (militaries.amountOfRequired) {
      for (let i = 0; i < formArray.controls.length; i++) {
        formArray.controls[i].patchValue({ required: true });
        formArray.controls[i].get('name').setValidators(Validators.required);
        formArray.controls[i].updateValueAndValidity();

        if (i === militaries.amountOfRequired - 1) break;
      }
    }
  }

  private formChanges(): void {
    this.documentSettingsForm.valueChanges.subscribe((formValue) => {
      this.onChange(this.getFormValue(formValue));
    });
  }

  private onChange = (value: any) => {
  };

  private onTouched = () => {
  };

  private buildForm(): void {
    const conditionsForValidation = this.militaryUnits.areShown && this.militaryUnits.required && this.militaryUnit;

    this.documentSettingsForm = this.fb.group({
      periods: this.fb.array([this._createPeriod()]),
      military_units_search: [null],
      military_units: this.fb.array([], conditionsForValidation && Validators.required),
      signers: this.fb.array([]),
      approvers: this.fb.array([]),
      coordinators: this.fb.array([]),
    });
  }

  private _createPeriod(): FormGroup {
    return this.fb.group({
      period: [this.periodsToRender[0].value],
      periodValue: this.fb.group({
        day: [null],
        week: this.fb.group({
          weekNumber: [null],
          yearInWeekPeriod: [null],
        }),
        month: [null],
        periods: this.fb.group({
          yearInPeriodsSection: [null],
          selectedPeriodUuid: [null],
          selectedPeriod: [null],
          periodsOfYear: [[]],
        }),
        year: [null],
      }),
    });
  }

  private _createMilitaryMan(): FormGroup {
    return this.fb.group({
      name: [null],
      rank: [null],
      rank_and_name: [null],
      appointment: [null],
      division: [null],
      military_man_uuid: [null],
      militaries: [null],
      required: [null],
    });
  }

  private getFormValue(formValue: any): any {
    return this.documentSettingsForm.valid ? formValue : null;
  }

  private getPeriodsToRender(): void {
    this.periodsToRender = PERIODS.filter(item => this.configData.periods[item.value]);
  }

  private getConfigData(): void {
    this.periods = this.configData.periods;
    this.militaryUnits = this.configData.militaryUnits;
    this.signers = this.configData.signers;
    this.approvers = this.configData.approvers;
    this.coordinators = this.configData.coordinators;
    this.militaryUnit = this.configData.militaryUnit;
  }

  private checkFormValidityOnInit(): void {
    this.onChange(this.getFormValue(this.documentSettingsForm.value));
  }

  private setPresetedMilitaryMen(): void {
    const areAnyPresetedMilitaryMen = (this.signers.preseted.length + this.approvers.preseted.length + this.coordinators.preseted.length) > 0;

    if (areAnyPresetedMilitaryMen) {
      this.isExpanded = false;

      const requestBody = {
        subscribing: [...this.signers.preseted],
        approving: [...this.approvers.preseted],
        confirming: [...this.coordinators.preseted],
      };

      this.loader.startLoading(this.documentSettingsService.setPresetedMilitaryMen(requestBody)).subscribe(res => {
        this.documentSettingsService.getMilitaryMenFromBackend(this.signersArray, res.subscribing);
        this.documentSettingsService.getMilitaryMenFromBackend(this.approversArray, res.approving);
        this.documentSettingsService.getMilitaryMenFromBackend(this.coordinatorsArray, res.confirming);

        this.isExpanded = true;
      });
    }
  }

  private expandRecursiveMilitaryUnits(): void {
    this.fetchedMilitaryUnits.forEach(militaryUnit => this.expandRecursive(militaryUnit));
  }

  private expandRecursive(militaryUnit: TreeNode): void {
    militaryUnit.expanded = true;
    if (militaryUnit.children) {
      militaryUnit.children.forEach(childNode => {
        this.expandRecursive(childNode);
      });
    }
  }

  private replaceSelectedMilitaryUnits(): void {
    this._selectedMilitaryUnits.forEach(militaryUnit => {
      this.fetchedMilitaryUnits = this.fetchedMilitaryUnits.map(m => {
        if (m.id === militaryUnit.id) return militaryUnit;
        return m;
      });
    });
  }

  private getMilitaryUnits(): void {
    if (!this.count) this.isExpanded = false;

    this.loader.startLoading(this.documentSettingsService.getMilitaryUnits(this.militaryUnit)).subscribe(res => {
      this.fetchedMilitaryUnits = res;
      this.replaceSelectedMilitaryUnits();
      this.getFlatMilitaryUnitsList();
      this.expandRecursiveMilitaryUnits();
      if (!this.count) this.isExpanded = true;
      this.count++;
    });
  }

  private getDivisions(): void {
    this.loader.startLoading(this.documentSettingsService.getDivisions(this.militaryUnit)).subscribe(res => {
      this.fetchedMilitaryUnits = res;
      this.replaceSelectedMilitaryUnits();
      this.getFlatMilitaryUnitsList();
      this.expandRecursiveMilitaryUnits();
    });
  }

  private getFetchedPeriods(): void {
    this.isExpanded = false;

    this.loader.startLoading(this.documentSettingsService.getFetchedPeriods()).subscribe(res => {
      this.fetchedPeriods = res.data;
      this.yearsInPeriodsSection = [...new Set(this.fetchedPeriods.map(item => item.year))].reverse();
      this.isExpanded = true;
    });
  }

  private createMilitaryUnit(): FormGroup {
    return this.fb.group({
      id: [null],
      label: [null],
      expanded: [null],
      parent: [null],
      children: [[]],
      access_level: this.fb.group({
        id: [null],
        name: [null],
      }),
    });
  }

  private searchMilitaryUnits(): void {
    this.documentSettingsForm.get('military_units_search').valueChanges
      .pipe(
        tap(_ => this.isSearching = true),
        map(value => value.toLowerCase()),
      )
      .subscribe(res => {
        this.filteredMilitaryUnits = this.flatMilitaryUnitsList.filter(militaryUnit => ~militaryUnit.label.toLowerCase().indexOf(res));
        this.filteredMilitaryUnits.forEach(militaryUnit => militaryUnit.expanded = false);

        if (res === '') {
          this.isSearching = false;
          this.filteredMilitaryUnits = [];
          this.expandRecursiveMilitaryUnits();
        }
      });
  }

  private getFlatMilitaryUnitsList(): void {
    this.flatMilitaryUnitsList = [];
    this.fetchedMilitaryUnits.forEach(militaryUnit => this.addItemsToArrayRecursive(militaryUnit));
  }

  private addItemsToArrayRecursive(militaryUnit: MilitaryUnit): void {
    this.flatMilitaryUnitsList.push(militaryUnit);
    if (militaryUnit.children) {
      militaryUnit.children.forEach(childMilitaryUnit => this.addItemsToArrayRecursive(childMilitaryUnit));
    }
  }
}
