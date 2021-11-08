import { Type, Inject, Injectable, InjectionToken, ComponentRef } from '@angular/core';
import { Situation, SitLayer, SignLoader, drawSign } from 'ues';
import { PanelComponent, UesService } from 'ues_ui';
import { UesInstance, ForceVisible, SituationLayer, SignLoaderInterface, SituationInterface } from '../types/roo-types';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import 'ol/ol.css';

const MAP_DEFAULT_CONFIG: MapConfig = {
  resolution: 10000,
  center: [9702046.08305156, 8499440.164819743],
};

export interface MapConfig {
  resolution: number;
  center: number[];
}

export const MAP_CONFIG_TOKEN = new InjectionToken('map-config', {
  factory: () => ({ ...MAP_DEFAULT_CONFIG })
});

@Injectable()
export class RooService {
  public uesInstance: UesInstance;
  public signLoader: SignLoaderInterface;

  constructor(
    @Inject(MAP_CONFIG_TOKEN) private mapConfig: MapConfig,
    private uesService: UesService,
  ) {
    this.initMap();
  }

  public onMapCreated(): Observable<UesInstance> {
    return this.uesService.onMapCreated;
  }

  public get map(): unknown {
    if (!this.uesInstance) {
      return;
    }

    return this.uesInstance.getMap();
  }

  public createSituation(): SituationInterface {
    return new Situation(this.uesInstance.getMap());
  }

  public createLayer(): SituationLayer {
    return new SitLayer();
  }

  public addSing(signId: string, coordinatesWhereDisplay: number[], sitLayer: SitLayer): void {
    if (!this.signLoader) {
      this.signLoader = new SignLoader(this.uesInstance);
    }

    this.signLoader.loadSignData(signId, (signData) => {
      const sitObject = drawSign(signData, [coordinatesWhereDisplay]);
      sitLayer.addObject(sitObject);
    });
  }

  public saveLayerToXml(layer: SituationLayer, xmlDoc: XMLDocument): void {
    return layer.saveToXml(xmlDoc);
  }

  public loadLayerFromXml(layer: SituationLayer, xmlElement: unknown, forceVisible: ForceVisible): void {
    layer.loadFromXml(xmlElement, forceVisible);
  }

  public addPanel<T>(component: Type<T>): ComponentRef<PanelComponent> {
    return this.uesService.addPanel(component);
  }

  public addComponent<T>(component: Type<T>): ComponentRef<T> {
    return this.uesService.addComponent(component);
  }

  public saveSituationToXml(situation: SituationInterface): unknown {
    return situation.saveToXml();
  }

  public loadSituationFromXml(situation: SituationInterface, xmlDoc: XMLDocument): void {
    if (!xmlDoc) {
      return;
    }

    situation.loadFromXml(xmlDoc);

    const currentLayer: SituationLayer = situation.getCurrentLayer();
    this.uesInstance.setEditLayer(currentLayer);
  }

  public changeMapResolution(resolution: number) {
    this.uesInstance.setMapResolution(resolution);
  }

  public updateMapSize(): void {
    this.uesInstance.getMap().updateSize();
  }

  public get mapCenter(): number[] {
    return this.uesInstance.getMapCenter();
  }

  public zoomOut(): void {
    this.uesInstance.zoomOut();
  }

  public zoomIn(): void {
    this.uesInstance.zoomIn();
  }

  public get isEditable(): boolean {
    if (this.uesInstance) {
      return this.uesInstance.getObjectEditInteraction().isEditable();
    }
  }

  private initMap(): void {
    this.uesService.onMapCreated.pipe(
      tap(instance => this.uesInstance = instance),
      tap(_ => this.changeMapResolution(this.mapConfig.resolution)),
      tap(_ => this.uesInstance.setMapCenter(this.mapConfig.center)),
    ).subscribe();
  }
}
