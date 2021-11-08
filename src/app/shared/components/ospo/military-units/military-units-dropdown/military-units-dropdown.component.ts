import { Component, DoCheck, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { MilitaryUnit, selectionMode } from './interfaces';
import { MilitaryUnitsDropdownService } from './services/military-units-dropdown.service';
import { HttpParams } from '@angular/common/http';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-military-units-dropdown',
  templateUrl: './military-units-dropdown.component.html',
  styleUrls: ['./military-units-dropdown.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MilitaryUnitsDropdownComponent),
    multi: true,
  }],
})
export class MilitaryUnitsDropdownComponent implements OnInit, ControlValueAccessor {

  public set selectedMilitaryUnits(value: MilitaryUnit[] | MilitaryUnit) {
    this.updateValue(value);
    this.setShownMilitaryUnitsLabels(value);
    this._selectedMilitaryUnits = value;
  }

  public get selectedMilitaryUnits(): MilitaryUnit[] | MilitaryUnit {
    return this._selectedMilitaryUnits;
  }

  @Input() set showDivisionOf(value: number) {
    this._showDivisionOf = value;
    this.getMilitaryUnits();
  }

  get showDivisionOf(): number {
    return this._showDivisionOf;
  }

  @Input() public accessLevels: number[];
  @Input() public selectionMode: selectionMode = 'single';
  public militaryUnits: MilitaryUnit[];
  public _selectedMilitaryUnits: MilitaryUnit[] | MilitaryUnit;
  public shownMilitaryUnitsLabels: string;
  public searchValue: string;
  public disabled = false;
  private outsideMilitaryUnitValue: MilitaryUnit[] | MilitaryUnit;
  private _showDivisionOf: number;

  constructor(public militaryUnitService: MilitaryUnitsDropdownService, public element: ElementRef) {
  }

  public ngOnInit(): void {
    this.getMilitaryUnits();
  }

  public searchValueChange(event: any): void {
    this.getMilitaryUnits(this.createHttpParams(event));
  }

  public setShownMilitaryUnitsLabels(value: MilitaryUnit[] | MilitaryUnit | null): void {
    if (Array.isArray(value)) {
      this.shownMilitaryUnitsLabels = value.map(item => item.label).join(', ');
    } else if (typeof value === 'object' && value !== null) {
      this.shownMilitaryUnitsLabels = value.label;
    }
    if (value === null) {
      this.shownMilitaryUnitsLabels = '';
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  public writeValue(outsideValue: MilitaryUnit[] | MilitaryUnit): void {
    this.outsideMilitaryUnitValue = outsideValue;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public updateValue(insideValue: MilitaryUnit[] | MilitaryUnit): void {
    if (this.accessLevels) {
      this.onChange(this.removeSelectablePropRecursive(insideValue));
    } else {
      this.onChange(insideValue);
    }
    this.onTouched();
  }

  public clearSelectedMilitaryUnits(): void {
    this.selectedMilitaryUnits = null;
  }

  private getMilitaryUnits(httpParams?: HttpParams): void {
    if (!this.showDivisionOf) {
      this.militaryUnitService.getMilitaryUnits().subscribe(res => {
        this.militaryUnits = this.accessLevels ? this.addSelectablePropRecursive(res) : res;
        this.selectedMilitaryUnits = this.findOutsideValueInMilitaryUnits(this.outsideMilitaryUnitValue);
      });
    } else {
      this.militaryUnitService.getDivisions(this.showDivisionOf).subscribe(res => {
        this.militaryUnits = this.accessLevels ? this.addSelectablePropRecursive(res) : res;
        this.selectedMilitaryUnits = this.findOutsideValueInMilitaryUnits(this.outsideMilitaryUnitValue);
      });
    }
  }

  private createHttpParams(value: string): HttpParams {
    return new HttpParams().append('search', value);
  }

  private onChange = (value: any) => {
  };

  private onTouched = () => {
  };

  private treeSearch(array: MilitaryUnit[], searchId: number): MilitaryUnit {
    for (const militaryUnit of array) {
      if (militaryUnit.id === searchId) {
        return militaryUnit;
      } else if (militaryUnit.children && militaryUnit.children.length) {
        const result = this.treeSearch(militaryUnit.children, searchId);
        if (result) {
          return result;
        }
      }
    }
  }

  private addSelectablePropRecursive(array: MilitaryUnit[]): MilitaryUnit[] {
    const updatedArray = [];
    for (const militaryUnit of array) {
      militaryUnit.selectable = this.accessLevels.includes(militaryUnit.access_level?.id);
      if (militaryUnit.children && militaryUnit.children.length) {
        militaryUnit.children = this.addSelectablePropRecursive(militaryUnit.children);
      }
      updatedArray.push(militaryUnit);
    }
    return updatedArray;
  }

  private removeSelectablePropRecursive(data: MilitaryUnit | MilitaryUnit[]): MilitaryUnit | MilitaryUnit[] {
    let result;
    if (Array.isArray(data)) {
      result = [];
      for (const militaryUnit of data) {
        delete militaryUnit.selectable;
        if (militaryUnit.children && militaryUnit.children.length) {
          militaryUnit.children = this.removeSelectablePropRecursive(militaryUnit.children) as MilitaryUnit[];
        }
        result.push(militaryUnit);
      }
    } else if (typeof data === 'object') {
      delete data?.selectable;
      result = data;
    }

    return result;
  }

  private findOutsideValueInMilitaryUnits(outsideValue: MilitaryUnit | MilitaryUnit[]): MilitaryUnit | MilitaryUnit[] {
    let findResult: MilitaryUnit | MilitaryUnit[];
    if (Array.isArray(outsideValue)) {
      const result = [] as MilitaryUnit[];
      outsideValue.forEach(item => result.push(this.treeSearch(this.militaryUnits, item.id)));
      findResult = result;
    } else if (typeof outsideValue === 'object' && outsideValue !== null) {
      findResult = this.treeSearch(this.militaryUnits, outsideValue.id);
    }
    return findResult;
  }


}
