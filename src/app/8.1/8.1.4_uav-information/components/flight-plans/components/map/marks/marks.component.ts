import { Component, OnInit } from '@angular/core';
import { OlApiService } from '../../../../../../../shared/services/ol-api.service';
import { SitLayer, Situation } from 'ues';
import { UesService } from 'ues_ui';
import { MapService } from '../services/map.service';
import { SitObject } from '../../../../../../../shared/types/roo-types';

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
})
export class MarksComponent implements OnInit {
  private situation: any;
  private layer: any;

  constructor(
    private olService: OlApiService,
    private uesService: UesService,
    private mapService: MapService,
  ) {
  }

  ngOnInit(): void {
    this.getUesInstance();
    this.setMarks();
  }

  private setMarks(): void {
    this.mapService.selectedTask.subscribe(res => {

      this.layer.removeObjects();

      this.mapService.createCoordinates(res);
      this.showItems(this.mapService.showLines());
      this.mapService.checkEqualCoordinates();
      this.showItems(this.mapService.getObjectSitObject());
    });
  }

  private showItems(sitObjects: SitObject[]): void {
    sitObjects.forEach(object => {
      this.layer.addObject(object);
    });
  }

  private getUesInstance(): void {
    this.uesService.onMapCreated.subscribe(res => {
      this.mapService.uesInstance = res;
      this.mapService.createMarks();
      this.createLayer();
    });
  }

  private createLayer(): void {
    this.situation = new Situation(this.olService.map);
    this.layer = new SitLayer();
    this.situation.addLayer(this.layer);
  }
}
