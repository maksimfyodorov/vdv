import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { SitLayer, Situation } from 'ues';
import { SituationInterface, SituationLayer, UesInstance } from '../../../../../../../shared/types/roo-types';
import { ListenerInfo } from 'ues_ui/app/frame-list/types/ListenerInfo';
import { NodesSchemeService } from '../../nodes-scheme/services/nodes-scheme.service';
import { KEUZ_CODES } from '../../../../../../../shared/utils/constants';
import { Node } from '../../nodes-scheme/nodes.scheme.types';
import { SitObject } from '../../../../../../../shared/types/roo-types';
import { MapViewService } from '../../../../../../../shared/components/map/ol-map-init/services/map-view.service';
import {
  UnitViewFlags,
  UnitViewIcons,
  NORMAL_STATE_STYLE,
} from '../../../../../../../shared/components/map/ol-map-init/types/map-view.types';
import { SitObjectDirector } from '../../../../../../../shared/components/map/ol-map-init/services/sit-object-builder';

@Component({
  selector: 'app-unit-map-view',
  template: '',
  providers: [MapViewService],
})
export class UnitMapViewComponent implements OnInit, OnDestroy {

  @Output() public openDialogViewEmit: EventEmitter<string> = new EventEmitter<string>();

  private uesInstance: UesInstance;
  private sitLayer: SituationLayer;
  private uesMapChangesListener: ListenerInfo | any;

  private flags: UnitViewFlags;
  private icons: UnitViewIcons;

  constructor(
    private readonly mapView: MapViewService,
    private readonly nodesData: NodesSchemeService,
  ) {
  }

  public ngOnInit(): void {
    this.onMapCreate();
    this.getAssets();
  }

  public ngOnDestroy(): void {
    this.uesInstance.removeListener(this.uesMapChangesListener);
  }

  private onMapCreate(): void {
    this.mapView.subscribeToMapCreate().subscribe(() => {
      this.getMapInstance();
      this.createLayer();
      this.addListeners();
      this.subscribeToNodes();
    });
  }

  private getAssets(): void {
    this.mapView.getAssets([
      { command: KEUZ_CODES.FLAG_COMMAND },
      { regiment: KEUZ_CODES.FLAG_REGIMENT },
      { division: KEUZ_CODES.FLAG_DIVISION },
      { battalion: KEUZ_CODES.FLAG_BATTALION },
    ]).subscribe((res: UnitViewFlags) => this.flags = res);

    this.mapView.getAssets([
      { textSign: KEUZ_CODES.TEXT },
      { circleSign: KEUZ_CODES.CIRCLE_WITH_FILL },
    ]).subscribe((res: UnitViewIcons) => this.icons = res);
  }

  private createLayer(): void {
    const situation: SituationInterface = new Situation(this.uesInstance.getMap());
    this.sitLayer = new SitLayer();
    situation.addLayer(this.sitLayer);
  }

  private getMapInstance(): void {
    this.uesInstance = this.mapView.getUesInstance();
  }

  private addListeners(): void {
    this.uesMapChangesListener = this.uesInstance.addListener('ues_object_selection_changed', this.objectSelectedHandler);
  }

  private subscribeToNodes(): void {
    this.nodesData.nodes$.subscribe(res => {
      this.showUnits(res);
    });
  }

  private showUnits(nodes: Node[]): void {
    this.sitLayer.removeObjects();

    nodes?.forEach(node => {
      const sitObjectCircle: SitObject = new SitObjectDirector()
        .createUnit()
        .addAsset(this.icons.circleSign)
        .addCoordinates([node.coordinate.x, node.coordinate.y])
        .addStyles(NORMAL_STATE_STYLE)
        .addDataAttribute({ key: 'id', value: node.uuid })
        .setIsMovable(false)
        .getResult();

      const sitObjectFlag: SitObject = new SitObjectDirector()
        .createUnit()
        .addAsset(this.flags[this.nodesData.selectors.access_level.find((al) => node.access_level.uuid === al.uuid).name] || this.flags.regiment)
        .addCoordinates([node.coordinate.x, node.coordinate.y])
        .setIsMovable(false)
        .getResult();

      const sitObjectText: SitObject = new SitObjectDirector()
        .createUnit()
        .addAsset(this.icons.textSign)
        .addCoordinates([node.coordinate.x, node.coordinate.y - 2000])
        .addText(`В/ч: ${node.military_unit.label}`, 0)
        .addText(`Позывной: ${node.call_sign}`, 1)
        .setIsMovable(false)
        .getResult();

      this.addObjects([sitObjectCircle, sitObjectFlag, sitObjectText]);
    });
  }

  private objectSelectedHandler = (evt: { sitObject: SitObject }[]) => {
    if (evt.length) {
      const objectId: string = evt[0].sitObject?.getData('id');

      this.openDialogViewEmit.emit(objectId);
    }
  }

  private addObjects(sitObjects: SitObject[]): void {
    sitObjects.forEach(obj => {
      this.sitLayer.addObject(obj);
    });
  }
}
