import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SelectMilitaryMenComponent } from '../../../../../../../../../../../shared/components/military/dialogs/select-military-men/select-military-men.component';
import { Militaries } from '../../../../../../../../../types/desant-monitoring.types';

@Component({
  selector: 'app-attendants',
  templateUrl: './attendants.component.html',
  styleUrls: ['./attendants.component.scss']
})
export class AttendantsComponent {

  public selectedPersonMultiple = {
    dutyOfficerAtTheStart: null,
    doctorOnDuty: null,
  };

  public selectedPersonSingle = {
    officerAtTheLandingSite: null,
    landingOfficer: null,
    helicopterBoardingOfficer: null,
  };

  constructor(private dialogService: DialogService) { }

  public show(key: string, type = 'single'): void {
    const ref = this.dialogService.open(SelectMilitaryMenComponent, {
      width: '1066px',
      dismissableMask: true,
      data: { selectedPerson: type === 'single' ? this.selectedPersonSingle[key] : this.selectedPersonMultiple[key], mode: type },
    }).onClose.subscribe((militaries: Militaries[]) => {
      if (militaries) {
        type === 'single' ? this.selectedPersonSingle[key] = militaries : this.selectedPersonMultiple[key] = militaries;
      }
    });
  }

  public showSelectedPersonInfo(key: string): string {
    return `- ${this.selectedPersonSingle[key]?.appointment.name},  ${this.selectedPersonSingle[key]?.rank.name.toLowerCase()},  ${this.selectedPersonSingle[key].surname} ${this.selectedPersonSingle[key].name} ${this.selectedPersonSingle[key].middle_name}`;
  }

}
