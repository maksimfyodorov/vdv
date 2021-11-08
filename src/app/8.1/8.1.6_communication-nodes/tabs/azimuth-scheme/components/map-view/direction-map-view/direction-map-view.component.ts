import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { delay, switchMap, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { UesService } from 'ues_ui';
import { Map } from 'ol';
import GeoJSON from 'ol/format/GeoJSON';
import Stroke from 'ol/style/Stroke';
import { UesInstance } from '../../../../../../../shared/types/roo-types';
import { OlApiService } from '../../../../../../../shared/services/ol-api.service';
import { NodesSchemeService } from '../../nodes-scheme/services/nodes-scheme.service';
import { Direction, Node } from '../../nodes-scheme/nodes.scheme.types';
import Select, { Options as SelectOpt } from 'ol/interaction/Select';

@Component({
  selector: 'app-direction-map-view',
  template: '',
})
export class DirectionMapViewComponent implements OnInit, OnDestroy {

  private uesInstance: UesInstance;
  private subscription: Subscription;
  private vectorSource = this.olService.createVectorSource();
  private selectInteraction: Select;
  @Output() public openDialogViewEmit: EventEmitter<Direction> = new EventEmitter<Direction>();

  constructor(
    private readonly uesService: UesService,
    private readonly olService: OlApiService,
    private nodesData: NodesSchemeService,
  ) { }

  public ngOnInit(): void {
    this.init();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private init(): void {
    this.subscription = this.uesService.onMapCreated
      .pipe(
        tap(() => this.uesInstance = this.uesService.getUesInstance()),
        delay(2000),
        tap((ues: UesInstance) => {
          this.createLayer(ues.getMap());
          this.createSelectInteraction(ues.getMap());
        }),
        switchMap(_ => this.nodesData.directions), delay(2000),
      ).subscribe(geometries => this.showDirections(geometries));
  }

  private createLayer(map: Map): void {
    const vectorLayer = this.olService.createVectorLayer();

    map.addLayer(vectorLayer);
    vectorLayer.setSource(this.vectorSource);
  }

  private createSelectInteraction(map: Map): void {
    this.selectInteraction = this.olService.createSelect();
    map.addInteraction(this.selectInteraction);
    this.selectInteraction.on('select', this.selectHandler);
  }

  private selectHandler = (e) => {
    if (e.selected.length) {
      if (e.selected[0].getProperties().data) {
        this.openDialogViewEmit.emit(e.selected[0].getProperties().data);
      }
    }
  }

  private showDirections(directions: Direction[]): void {
    this.vectorSource.clear();
    const nodes = this.nodesData.nodes$.value;

    if (directions?.length) {
      directions.forEach(direction => {
        const startNode = nodes.find(node => node.uuid === direction.node_out_uuid);
        const endNode = nodes.find(node => node.uuid === direction.node_in_uuid);

        if (startNode && endNode) {
          const startNodeCoordinates = [startNode.coordinate.x, startNode.coordinate.y];
          const endNodeCoordinates = [endNode.coordinate.x, endNode.coordinate.y];

          const directionStyle = {
            stroke: direction.direction_type.name === 'Планируемый' ? [2, 8] : [0],
          };

          this.showDirectionLine({
            coordinates: [
              startNodeCoordinates,
              endNodeCoordinates,
            ],
            type: 'LineString',
          }, directionStyle, direction, startNode, endNode);
        }
      });
    }
  }

  private showDirectionLine(geometries: any, style, direction: Direction, startNode: Node, endNode: Node): void {
    const featureGeom = new GeoJSON().readFeature(geometries);

    featureGeom.setStyle(
      this.olService.createStyle({
        stroke: new Stroke({
          color: '#000000',
          width: 5,
          lineDash: style.stroke
        }),
      }),
    );
    featureGeom.setProperties({data: {direction, startNode, endNode}});

    if (featureGeom) {
      this.vectorSource.addFeature(featureGeom);
    }
  }
}
