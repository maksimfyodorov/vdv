import { Component, OnInit } from '@angular/core';
import {MilitarySportInfo} from '../../../sport-team/types/sport-team.types';
import {SPORT_INFO} from '../../../sport-team/mock';

@Component({
  selector: 'app-tech-desanting-card',
  templateUrl: './tech-desanting-card.component.html',
  styleUrls: ['./tech-desanting-card.component.scss']
})
export class TechDesantingCardComponent implements OnInit {
  public desantingCardInfo: MilitarySportInfo = SPORT_INFO;

  constructor() { }

  ngOnInit(): void {
  }

}
