import {Component, Input, OnInit} from '@angular/core';
import {MilitarySportInfo} from '../../sport-team/types/sport-team.types';
import {SPORT_INFO} from '../../sport-team/mock';
import {StaffDesantingCardService} from '../services/staff-desanting-card.service';

@Component({
  selector: 'app-staff-desanting-card',
  templateUrl: './staff-desanting-card.component.html',
  styleUrls: ['./staff-desanting-card.component.scss'],
  providers: [StaffDesantingCardService],
})
export class StaffDesantingCardComponent implements OnInit {
  @Input() selectedUUID = '';
  public desantingCardInfo: MilitarySportInfo = SPORT_INFO;

  constructor(private staffDesantingCardService: StaffDesantingCardService) {
  }

  ngOnInit(): void {
    this.getCardInfo();
  }
  private getCardInfo(): void{
    this.staffDesantingCardService.getDesantInfo().subscribe(res => this.desantingCardInfo = res);
  }

}
