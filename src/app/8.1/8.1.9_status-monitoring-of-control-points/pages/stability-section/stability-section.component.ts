import { Component, OnInit } from '@angular/core';
import { mockStability, Stability } from './types/stability';

@Component({
  selector: 'app-stability-section',
  templateUrl: './stability-section.component.html',
  styleUrls: ['./stability-section.component.scss'],
})
export class StabilitySectionComponent implements OnInit {

  public stabilityData: Stability[] = mockStability;


  constructor() {
  }

  ngOnInit(): void {
  }

  getColorFromStatusName(name): string {
    switch (name) {
      case 'green':
        return '#D5F69B';
      case 'red':
        return '#FFC9C9';
      case 'yellow':
        return '#FFEFB0';
      case 'blue':
        return '#D0EBFF';
    }
  }

}
