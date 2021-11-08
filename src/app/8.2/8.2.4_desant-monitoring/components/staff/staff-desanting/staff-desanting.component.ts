import {Component, OnInit} from '@angular/core';
import {StaffDesantingService} from '../services/staff-desanting.service';
import {LoaderService} from '../../../../../shared/components/loader/loader.service';
import {Militaries} from '../../../types/desant-monitoring.types';
import {MilitaryUnit} from '../../../../../shared/components/ospo/military-units/military-units-dropdown/interfaces';
import {SelectMilitaryMenComponent} from '../../../../../shared/components/military/dialogs/select-military-men/select-military-men.component';
import {DialogService} from 'primeng/dynamicdialog';
import {HttpParams} from '@angular/common/http';
import {VvstParachuteSystemComponent} from '../../../desant-events-module/components/create-and-modifying-event/components/desant-event-staff/dialogs/vvst-parachute-system/vvst-parachute-system.component';
import {
  AddParatrooperParams,
  Divisions,
  Paratrooper
} from '../../../desant-events-module/types/desant-events.type';

@Component({
  selector: 'app-staff-desanting',
  templateUrl: './staff-desanting.component.html',
  styleUrls: ['./staff-desanting.component.scss'],
  providers: [StaffDesantingService, LoaderService],
})
export class StaffDesantingComponent implements OnInit {
  public militaryUnits: Divisions[];
  public selectedUnit: MilitaryUnit;
  public selectedPerson: Militaries[];
  public selectedUUID: string;
  public row = 5;
  public paratroopers: Paratrooper[];
  private selectedMilitaryUnitID: number;
  public cloneParatroopers: { [uuid: string]: Paratrooper; } = {};

  constructor(public loader: LoaderService,
              private staffDesantingService: StaffDesantingService,
              private dialogService: DialogService,
  ) {
  }

  ngOnInit(): void {
    this.loader.startLoading(this.staffDesantingService.getDivisionByMilitaryUnit(84000000)).subscribe(value => this.militaryUnits = value);
  }

  public onRowSelect(event): void {
    this.selectedUUID = event.data.uuid;
  }

  public onRowUnselect(event): void {
    this.selectedUUID = null;
  }

  public addDesantUnit(): void {
    this.dialogService.open(SelectMilitaryMenComponent, {
      dismissableMask: true,
      header: 'Выбрать военнослужащего',
      width: '1088px',
      data: {selectedPerson: this.selectedPerson, mode: 'multiple', divisionId: this.selectedUnit.id},
    }).onClose.subscribe((militaries: any) => {
      if (militaries) {
      this.loader.startLoading(this.staffDesantingService.postParatrooperForStaff(this.addParatroopersParams(militaries))).subscribe(value => {
          this.showDesantList(this.selectedMilitaryUnitID);
        });
      }
    });
  }

  public showDesantList(military_unit_id: number): void {
    if (military_unit_id) {
      this.selectedMilitaryUnitID = military_unit_id;
      this.loader.startLoading(this.staffDesantingService.getParatroopers(this.setQueryParamsForGetParatroopers(this.selectedMilitaryUnitID.toString()))).subscribe(value => {
        this.paratroopers = value.data;
        const selectedParatroopers = [];
        this.paratroopers.forEach(data => selectedParatroopers.push(data.military_man));
        this.selectedPerson = selectedParatroopers;
      });
    } else {
      this.paratroopers = [];
    }
  }

  private setQueryParamsForGetParatroopers(id: string): HttpParams {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('division_id', id);
    return httpParams;
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

  private addParatroopersParams(selectedMilitaries: Militaries[]): AddParatrooperParams {
    const selectedDesantUnits = {items: []};
    for (const index in selectedMilitaries) {
      const params =     {
          military_man_uuid: selectedMilitaries[index]?.uuid
      };
      selectedDesantUnits.items.push(params);
    }
    return selectedDesantUnits;
  }

  public onRowEditInit(paratrooper: Paratrooper): void {
    this.cloneParatroopers[paratrooper.uuid] = {...paratrooper};
  }

  public deleteParatrooper(paratrooper: Paratrooper): void {
    // TODO: Реализовать метод удаления, когда он будет готов на бэке
  }

  public onRowEditSave(paratrooper: Paratrooper): void {
    const params: any = {
      jump_count: Number(paratrooper?.jump_count),
      vvst_fixation_main_uuid: '8083b943-c136-4c6b-ad3b-f749615babfc',
      vvst_fixation_reserve_uuid: 'bdf16882-5396-4558-8532-3a0f8162f505',
    };
    this.loader.startLoading(this.staffDesantingService.putParatroopers(params, paratrooper?.uuid.toString())).subscribe();
  }

  public onRowEditCancel(paratrooper: Paratrooper, index): void {
    paratrooper[index] = this.cloneParatroopers[paratrooper.uuid];
    delete this.cloneParatroopers[paratrooper.uuid];
  }
}
