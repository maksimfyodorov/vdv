import { Map } from 'ol';

export declare type MapEventsName = 'click' | 'mouseover' | 'leave' | 'mousemove' | 'ues_object_selection_changed';

export interface ListenerInfo {
  removeListener: () => void;
}

export interface UesInstance {
  addListener(event: MapEventsName, cb: unknown): ListenerInfo;
  removeListener(listenerInfo: ListenerInfo);
  getBaseLayerKey();
  getEditData();
  getEditLayer();
  getGlobalCopy();
  getMap(): Map;
  getMapCenter();
  getMapResolution();
  getMapScale();
  getMapSettings(): unknown[];
  getObjectEditInteraction();
  getWmsLayer();
  sendEvent();
  setBaseLayerKey();
  setEditData();
  setEditLayer(layer: SituationLayer);
  setGlobalCopy(val: boolean);
  setMap();
  setMapCenter(coordinate: number[]);
  setMapResolution(resolution: number);
  setMapScale(scale: unknown);
  setMapSettings(arr: unknown);
  setObjectEditInteraction(): ObjectEditInteraction;
  setWmsLayer();
  zoomIn();
  zoomOut();
}

export interface SituationLayer {
  addObject(sitObject: SitObject);
  addToMap(features: Features);
  clearData();
  getMap();
  getName();
  getObjects();
  getSituation();
  getUuid();
  initData(situation: SituationInterface);
  isVisible();
  loadFromXml(xmlElement: unknown, forceVisible: ForceVisible);
  removeFromMap(features: Features);
  removeLastObject();
  removeObject(sitObject: SitObject);
  removeObjects();
  saveToXml(xmlDoc: XMLDocument);
  setName(name);
  setSituation(situation: SituationInterface);
  setVisible(visible: boolean);
}

export interface SignLoaderInterface {
  getSignPreviewUrl(classCode: unknown);
  loadBeuzTree(callBackFunction: unknown);
  loadCreateInteration(classCode: unknown);
  loadSignData(classCode: unknown, callBackFunction: unknown);
  setPreviewFunction(newPreviewFunction: unknown);
}

export interface SituationInterface {
  addLayer(sitLayer: SituationLayer);
  clearData();
  getCurrentLayer();
  getLayers();
  getMap();
  loadFromXml(xmlDoc: XMLDocument);
  saveToXml();
}

export interface ObjectEditInteraction {
  isEditable(): boolean;
}

export interface SitObject {
  getData<T>(key: string): T;
  getPolicy(): ControlPolicy;
  isMovable(val: boolean): number;
  isSelectable(val: boolean): number;
  isFocusable(val: boolean): void;
  setFlag(flagType: number, val: boolean): void;
  setData<T>(key: string, value: T): void;
  getItems(): any[];
  addChild(sitObject: SitObject): void;
  setScaleX(scale: number): void;
  setScaleY(scale: number): void;
}

export interface ControlPolicy {
  getParamEditor<T>(): T;
}

export interface ChemicalZoneParamEditor {
  areaRadius: ParamEditor<number>;
  firstZoneAngle: ParamEditor<number>;
  firstZoneDistance: ParamEditor<number>;
  secondZoneAngle: ParamEditor<number>;
  secondZoneDistance: ParamEditor<number>;
}

export interface RadiationZoneParamEditor extends NuclearZonesParamEditor {
  firstZoneLength: ParamEditor<number>;
  firstZoneWidth: ParamEditor<number>;
  signText: ParamEditor<string>;
}

export interface NuclearZonesParamEditor {
  fifthZoneLength: ParamEditor<number>;
  fifthZoneWidth: ParamEditor<number>;
  fourthZoneLength: ParamEditor<number>;
  fourthZoneWidth: ParamEditor<number>;
  secondZoneLength: ParamEditor<number>;
  secondZoneWidth: ParamEditor<number>;
  thirdZoneLength: ParamEditor<number>;
  thirdZoneWidth: ParamEditor<number>;
}

export interface ChemicalWeaponZonesParamEditor {
  firstZoneAngle: ParamEditor<number>;
  firstZoneDistance: ParamEditor<number>;
  secondZoneAngle: ParamEditor<number>;
  secondZoneDistance: ParamEditor<number>;
  signText: ParamEditor<string>;
}


export interface ParamEditor<T> {
  name: string;
  get(): T;
  set(value: T): void;
}

// Todo: Необходимо реализовать интерфейсы
export declare type Features = unknown;
export declare type ForceVisible = unknown;
