import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { SelectMilitaryMenComponent } from './dialogs/select-military-men/select-military-men.component';
import { ExecutiveService } from './dialogs/select-shdk/services/executive.service';
import { ExecutiveComponent } from './dialogs/select-shdk/shdk/executive.component';
import { Executive, MilitaryMen } from './interfaces';
import { MilitaryUnitsDropdownFlatService } from '../ospo/military-units/military-units-dropdown-flat/services/military-units-dropdown-flat.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-military',
  templateUrl: './military.component.html',
  styleUrls: ['./military.component.scss'],
  providers: [MilitaryUnitsDropdownFlatService, {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MilitaryComponent),
    multi: true,
  }],
})
export class MilitaryComponent implements OnInit, ControlValueAccessor {

  @Input() selectedMilitary: string = '';
  @Input() loadExecutive: boolean = false;
  @Output() public appointment: EventEmitter<MilitaryMen | Executive> = new EventEmitter<MilitaryMen | Executive>();

  setSelectedMilitary: MilitaryMen | Executive;
  selectedMilitaryMen: string;
  public disabled = false;

  constructor(
    public dialogService: DialogService,
    public executiveService: ExecutiveService,
  ) {
  }

  ngOnInit(): void {
    if (this.selectedMilitary && this.loadExecutive) {
      this.loadSelectedShdk();
    }
  }

  loadSelectedShdk(): void {
    this.executiveService.getShdk(null).subscribe(res => {
      res.result.forEach(element => {
        if (element.uuid === this.selectedMilitary) {
          this.setSelectedMilitary = element;
          this.selectedMilitaryMen = `${this.setSelectedMilitary.rank.name} ${this.setSelectedMilitary.military_man.name.substr(0, 1)}.${this.setSelectedMilitary.military_man.surname}`;
          this.appointment.emit(this.setSelectedMilitary);
        }
      });
    });
  }

  showSelectionMenu(): void {
    if (this.loadExecutive) {
      this.openShdkComponent();
    } else {
      this.openSelectMilitaryComponent();
    }
  }

  openShdkComponent(): void {
    this.dialogService.open(ExecutiveComponent, {
      dismissableMask: true,
      header: 'Выбрать военнослужащего',
      width: '1088px',
      data: {
        selectedPerson: this.setSelectedMilitary,
        mode: 'single',
      },
    }).onClose.subscribe((selectedMilitary: Executive) => {
      if (selectedMilitary) {
        this.setSelectedMilitary = selectedMilitary;
        this.selectedMilitaryMen = `${selectedMilitary.military_man.rank.name} ${selectedMilitary.military_man.name.substr(0, 1)}.${selectedMilitary.military_man.surname}`;
        this.appointment.emit(selectedMilitary);
        this.onChange({
          shdk_uuid: selectedMilitary.uuid,
          appointment: selectedMilitary.appointment.name,
          military_man_uuid: selectedMilitary.military_man.uuid
        });
      }
    });
  }

  openSelectMilitaryComponent(): void {
    this.dialogService.open(SelectMilitaryMenComponent, {
      dismissableMask: true,
      header: 'Выбрать военнослужащего',
      width: '1088px',
      data: {
        selectedPerson: this.setSelectedMilitary,
        mode: 'single',
      },
    }).onClose.subscribe((selectedMilitary: MilitaryMen) => {
      if (selectedMilitary) {
        this.setSelectedMilitary = selectedMilitary;
        this.selectedMilitaryMen = `${this.setSelectedMilitary.rank.name} ${this.setSelectedMilitary.name.substr(0, 1)}.${this.setSelectedMilitary.surname}`;
        this.appointment.emit(selectedMilitary);
      }
    });
  }

  public writeValue(outsideValue: any): void {
    if (outsideValue) this.selectedMilitaryMen = outsideValue.military_man;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  private onChange = (value: any) => {
  };

  private onTouched = () => {
  };

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
