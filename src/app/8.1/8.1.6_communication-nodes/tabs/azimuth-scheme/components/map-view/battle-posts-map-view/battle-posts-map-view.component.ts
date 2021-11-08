import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { SitObject, SituationInterface, SituationLayer, UesInstance } from '../../../../../../../shared/types/roo-types';
import { SitLayer, Situation } from 'ues';
import { ListenerInfo } from 'ues_ui/app/frame-list/types/ListenerInfo';
import {
  UnitViewIcons,
} from '../../../../../../../shared/components/map/ol-map-init/types/map-view.types';
import { MapViewService } from '../../../../../../../shared/components/map/ol-map-init/services/map-view.service';
import { KEUZ_CODES } from '../../../../../../../shared/utils/constants';
import { CommunicationNodesService } from '../../../../communication-center/services/communication-nodes.service';
import { BattlePost } from '../../../../communication-center/types/nodes';
import { SitObjectDirector } from '../../../../../../../shared/components/map/ol-map-init/services/sit-object-builder';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-battle-posts-map-view',
  template: '',
  providers: [MapViewService]
})
export class BattlePostsMapViewComponent implements OnInit, OnDestroy {

  @Output() public openDialogViewEmit: EventEmitter<string> = new EventEmitter<string>();

  private uesInstance: UesInstance;
  private sitLayer: SituationLayer;
  private uesMapChangesListener: ListenerInfo | any;

  private icons: UnitViewIcons;

  constructor(
    private readonly mapView: MapViewService,
    private readonly nodeService: CommunicationNodesService,
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
    this.mapView.subscribeToMapCreate().subscribe(res => {
      this.getMapInstance();
      this.createLayer();
      this.addListeners();
      this.subscribeToNodes();
    });
  }

  private getAssets(): void {
    this.mapView.getAssets([
      {textSign: KEUZ_CODES.TEXT},
      {circleSign: KEUZ_CODES.CIRCLE_WITH_FILL},
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
    this.nodeService.plainBattlePosts$.pipe(delay(2000)).subscribe(res => {
      this.showUnits(res);
    });
  }

  private showUnits(nodes: BattlePost[]): void {
    this.sitLayer.removeObjects();

    nodes.forEach(node => {
      const sitObjectCircle: SitObject = new SitObjectDirector()
        .createUnit()
        .addAsset(this.icons.circleSign)
        .addCoordinates([node.coordinate.x, node.coordinate.y])
        .addStyles({
          color: {red: 255, green: 255, blue: 255, alpha: 0.7},
          scale: 5,
        })
        .addDataAttribute({key: 'id', value: node.uuid})
        .setIsMovable(false)
        .getResult();

      const sitObjectCar: SitObject = new SitObjectDirector()
        .createUnit()
        .addAsset(this.icons.circleSign)
        .addCoordinates([node.coordinate.x, node.coordinate.y])
        .addStyles({
          color: {red: 12, green: 133, blue: 153, alpha: 1},
          scale: 1,
        })
        .addDataAttribute({key: 'id', value: node.uuid})
        .setIsMovable(false)
        .getResult();

      const sitObjectText: SitObject = new SitObjectDirector()
        .createUnit()
        .addAsset(this.icons.textSign)
        .addCoordinates([node.coordinate.x, node.coordinate.y - 2000])
        .addText(`${node.number}`, 0)
        .addText(`${node.type.name}`, 1)
        .setIsMovable(false)
        .getResult();

      this.addObjects([sitObjectCircle, sitObjectText, sitObjectCar]);
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
