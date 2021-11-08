import { Component, OnInit } from '@angular/core';
import { UesService } from 'ues_ui';
import { OlApiService } from '../../../../../services/ol-api.service';

@Component({
  selector: 'app-ol-map-init',
  template: '',
})
export class OlMapInitComponent implements OnInit {

  constructor(
    private uesService: UesService,
    private olService: OlApiService,
  ) { }

  ngOnInit(): void {
    this.uesService.onMapCreated.subscribe(map => {
      this.olService.map = map._map;
      this.olService.uesInstance = map;
    });
  }
}
