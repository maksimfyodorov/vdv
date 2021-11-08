import { Component, forwardRef, EventEmitter, OnInit, Output } from '@angular/core';
import { MilitaryUnitItem } from './interfaces/interfaces';
import { MilitaryUnitsDropdownFlatService } from './services/military-units-dropdown-flat.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-military-units-dropdown-flat',
  templateUrl: './military-units-dropdown-flat.component.html',
  styleUrls: ['./military-units-dropdown-flat.component.scss'],
  providers: [MilitaryUnitsDropdownFlatService, {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MilitaryUnitsDropdownFlatComponent),
    multi: true,
  }],
})
export class MilitaryUnitsDropdownFlatComponent implements OnInit, ControlValueAccessor {

  public selectedMilitaryUnit: MilitaryUnitItem;
  public militaryUnits: MilitaryUnitItem[];
  public disabled = false;
  public shownMilitaryUnitsLabel: string;
  public searchValue: string;
  @Output() public selectedMilitaryUnitId = new EventEmitter<number>();

  constructor(private militaryUnitService: MilitaryUnitsDropdownFlatService) {
  }

  ngOnInit(): void {
    this.getMilitaryUnits();
  }


  public clearSelectedMilitaryUnit(): void {
    this.selectedMilitaryUnit = null;
    this.onChange(null);
  }

  public searchValueChange(search: string): void {
    this.getMilitaryUnits(search);
  }

  public writeValue(outsideValue: number): void {
    if (outsideValue) {
      this.militaryUnitService.getMilitaryUnitById(outsideValue).subscribe(res => this.selectedMilitaryUnit = res);
    } else {
      this.selectedMilitaryUnit = null;
    }
  }

  public updateValue(insideValue: MilitaryUnitItem): void {
    this.selectedMilitaryUnit = insideValue;
    this.onChange(insideValue.id);
    this.onTouched();
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private onChange = (value: any) => {
  };

  private onTouched = () => {
  };

  private getMilitaryUnits(search?: string): void {
    this.militaryUnitService.getMilitaryUnits(search).subscribe(res => this.militaryUnits = res);
  }
}
