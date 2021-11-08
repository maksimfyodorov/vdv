import {Component, OnInit, Output} from '@angular/core';
import {SPORT_TABLE, SPORTS_CATEGORY} from './mock';
import {SportTeamService} from './services/sport-team.service';
import {SportsCategory} from './types/sport-team.types';
import {Militaries} from '../../types/desant-monitoring.types';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {SelectMilitaryMenComponent} from '../../../../shared/components/military/dialogs/select-military-men/select-military-men.component';
import {DesantTabsService} from '../../services/desant-tabs.service';


@Component({
  selector: 'app-sport-team',
  templateUrl: './sport-team.component.html',
  styleUrls: ['./sport-team.component.scss'],
  providers: [SportTeamService, DynamicDialogRef],
})
export class SportTeamComponent implements OnInit {

  public selectedDate: number;
  public sportTeamPersons: Militaries[] = SPORT_TABLE;
  public sportCategory: SportsCategory[] = SPORTS_CATEGORY;
  public selectedUUID: string;
  public selectedPerson: Militaries[];

  constructor(private sportTeamService: SportTeamService,
              private dialogService: DialogService,
              private desantTabsService: DesantTabsService) {
  }

  ngOnInit(): void {
    this.sportTeamService.getSportTeamPersons().subscribe(res => this.sportTeamPersons = res);
    this.desantTabsService.activeTabIndex = 2;
  }

  public openAddParticipant(): void {
    this.dialogService.open(SelectMilitaryMenComponent, {
      dismissableMask: true,
      header: 'Выбрать военнослужащего',
      width: '1088px',
      data: {selectedPerson: this.sportTeamPersons, mode: 'multiple'},
    }).onClose.subscribe((militaries: Militaries[]) => {
      if (militaries) {
        this.sportTeamPersons = militaries;
      }
    });
  }

  public onRowSelect(event): void {
    this.selectedUUID = event.data.uuid;
  }

  public onRowUnselect(event): void {
    this.selectedUUID = null;
    this.selectedDate = null;
  }

  public deletePerson(uuid: any): void {
    const index = this.sportTeamPersons.findIndex(item => item.uuid === uuid);
    this.sportTeamPersons.splice(index, 1);
    this.onRowUnselect(event);
  }
}
