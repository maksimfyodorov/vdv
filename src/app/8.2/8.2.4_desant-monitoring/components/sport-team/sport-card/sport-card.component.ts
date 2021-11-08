import {Component, Input, OnInit} from '@angular/core';
import {MilitarySportInfo, SportEvents} from '../types/sport-team.types';
import {SPORT_INFO} from '../mock';

import {SportCardService} from '../services/sport-card.service';

@Component({
  selector: 'app-sport-card',
  templateUrl: './sport-card.component.html',
  styleUrls: ['./sport-card.component.scss'],
  providers: [SportCardService],
})
export class SportCardComponent implements OnInit {
  @Input() selectedUUID = '';
  @Input() selectedDate: number;
  public personSportInfo: MilitarySportInfo = SPORT_INFO;
  public sportsEvent: SportEvents[];

  constructor(private sportCardService: SportCardService) {
  }

  ngOnInit(): void {
    this.sportCardService.getMilitarySportInfo().subscribe(res => {
      this.personSportInfo = res;
      this.addEventOnEmpty(res);
    });
  }

  public addEvent(): void {
    this.personSportInfo.sport_events.push([{}]);
  }

  private addEventOnEmpty(res: MilitarySportInfo): void {
    if (res.sport_events) {
      this.personSportInfo.sport_events.push([{}]);
    }
  }
}
