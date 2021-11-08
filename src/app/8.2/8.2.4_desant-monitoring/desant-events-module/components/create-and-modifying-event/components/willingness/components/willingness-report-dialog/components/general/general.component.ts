import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { SelectMilitaryMenComponent } from '../../../../../../../../../../../shared/components/military/dialogs/select-military-men/select-military-men.component';
import { Militaries } from '../../../../../../../../../types/desant-monitoring.types';
import { InstructorDialogComponent } from './instructor-dialog/instructor-dialog.component';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent {

  public selectedPerson = {
    landingLead: null,
    jumpingLead: null,
    jumpLeadAssistant: null,
  };

  public selectedOperator = [];
  public tableData = [];
  constructor(private dialogService: DialogService) { }

  public show(key: string, type = 'single'): void {
    const ref = this.dialogService.open(SelectMilitaryMenComponent, {
      width: '1066px',
      dismissableMask: true,
      data: { selectedPerson:  type === 'single' ? this.selectedPerson[key] : this.selectedOperator, mode: type },
    }).onClose.subscribe((militaries: Militaries[]) => {
      if (militaries) {
        type === 'single' ? this.selectedPerson[key] = militaries : this.selectedOperator = militaries ;
      }
    });
  }

  public showInstructorDialog(): void {
    const ref = this.dialogService.open(InstructorDialogComponent, {
      showHeader: false,
      width: '868px',
      dismissableMask: true,
    }).onClose.subscribe((res) => {
      if (res) {
        this.tableData.push(res);
      }
    });
  }

  public showSelectedPersonInfo(key: string): string {
    return `- ${this.selectedPerson[key]?.appointment.name},  ${this.selectedPerson[key]?.rank.name.toLowerCase()},  ${this.selectedPerson[key].surname} ${this.selectedPerson[key].name} ${this.selectedPerson[key].middle_name}`;
  }
}
