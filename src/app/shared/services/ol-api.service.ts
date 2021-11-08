import { Injectable } from '@angular/core';
import { Feature, MapBrowserEvent } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style, { Options as StyleOpt } from 'ol/style/Style';
import Stroke, { Options as StrokeOpt } from 'ol/style/Stroke';
import Fill, { Options as FillOpt } from 'ol/style/Fill';
import Circle, { Options as CircleOpt } from 'ol/style/Circle';
import Icon, { Options as IconOpt } from 'ol/style/Icon';
import BaseLayer from 'ol/layer/Base';
import { MapOptions } from 'ol/PluggableMap';
import { ViewOptions } from 'ol/View';
import { Coordinate } from 'ol/coordinate';
import Point from 'ol/geom/Point';
import GeometryType from 'ol/geom/GeometryType';
import { BehaviorSubject, Observable } from 'rxjs';
import Geometry from 'ol/geom/Geometry';
import { DrawEvent } from 'ol/interaction/Draw';
import { Options as BaseLayerOpt } from 'ol/layer/BaseVector';
import { UesInstance } from '../types/roo-types';
import { filter, tap } from 'rxjs/operators';
import Select from 'ol/interaction/Select';
import Map from 'ol/Map';
import View from 'ol/View';
import Draw from 'ol/interaction/Draw';

interface GeometryOptions {
  colorb?: number[];
  colorf?: number[];
  width?: number;
}

@Injectable()
export class OlApiService {
  private _map: Map;
  private _uesInstance: BehaviorSubject<UesInstance> = new BehaviorSubject<UesInstance>(null);

  public set map(value: Map) {
    this._map = value;
  }

  public get map(): Map {
    return this._map;
  }

  public set uesInstance(uesInstance: UesInstance) {
    this._uesInstance.next(uesInstance);
  }

  public getUesInstance(): Observable<UesInstance> {
    return this._uesInstance.pipe(
      filter(map => Boolean(map))
    );
  }

  constructor() { }

  public createMap(options: MapOptions): Map {
    return new Map(options);
  }

  public crateView(options?: ViewOptions): View {
    return new View(options);
  }

  public createVectorSource(): VectorSource {
    return new VectorSource();
  }

  public createVectorLayer(options?: BaseLayerOpt): VectorLayer {
    return new VectorLayer(options);
  }

  public addLayer(map: Map, layer: BaseLayer): void {
    map.addLayer(layer);
  }

  public createFeature(): Feature {
    return new Feature();
  }

  public createStyle(options?: StyleOpt): Style {
    return new Style(options);
  }

  public createStroke(options?: StrokeOpt): Stroke {
    return new Stroke(options);
  }

  public createFill(options?: FillOpt): Fill {
    return new Fill(options);
  }

  public createCircle(options?: CircleOpt): Circle {
    return new Circle(options);
  }

  public crateIcon(options?: IconOpt): Icon {
    return new Icon(options);
  }

  public createPointGeom(coordinates: Coordinate): Point {
    return new Point(coordinates);
  }

  public createSelect(): Select {
    return new Select();
  }

  public draw(type: GeometryType, source: VectorSource, map: Map): Observable<Feature<Geometry>> {
    return new Observable(subscriber => {
      source.clear();

      const draw = new Draw({
        type,
        source,
      });

      map.addInteraction(draw);

      draw.on('drawend', (evt: DrawEvent) => {
        map.removeInteraction(draw);
        subscriber.next(evt.feature);
        subscriber.complete();
      });
    });
  }

  public mouseMove(): Observable<Coordinate> {
    return new Observable(subscriber => {
      const mouseMoveHandler = (evt: MapBrowserEvent) => subscriber.next(evt.coordinate);

      this._map.on('pointermove', mouseMoveHandler);
      this._map.once('click', (evt) => {
        this._map.un('pointermove', mouseMoveHandler);
        subscriber.next(evt.coordinate);
        subscriber.complete();
      });
    });
  }
}
