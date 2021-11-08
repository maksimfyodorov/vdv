import { Component, OnInit } from '@angular/core';
import {DesantSubdivision, ParachuteSystem} from '../../../../../../types/desant-events.type';
import {Aircraft} from '../../../../../../../types/aircraftInterface';

@Component({
  selector: 'app-select-desant-subdivision-subtask',
  templateUrl: './select-desant-subdivision-subtask.component.html',
  styleUrls: ['./select-desant-subdivision-subtask.component.scss']
})
export class SelectDesantSubdivisionSubtaskComponent implements OnInit {
  public subdivisions: DesantSubdivision[];
  public selectedSubdivisions: DesantSubdivision;
  public subdivisionMilitaryCount: number;
  public parachuteSystems: ParachuteSystem[];
  public selectedParachuteSystem: ParachuteSystem;
  public desantDate: Date;
  public paratroopers: DesantSubdivision;
  public airplaneType: Aircraft;

  constructor() { }

  ngOnInit(): void {
  }

}
