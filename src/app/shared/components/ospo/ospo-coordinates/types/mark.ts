export interface MarkResponse {
  count: number;
  result: MarkBackend[];
}

export interface MarkBackend {
  mark: string;
  height: number;
  object_geom: Coordinates;
  type: Type;
  uuid: string;
}

export interface Mark {
  name: string;
  object_geom: Coordinates;
  height: number;
  actions?: TableActions[];
  uuid: string;
}

export interface TableActions {
  icon: string;
  background: string;
  emit: string;
  size: string;
  color: string;
}

export interface Coordinates {
  type: 'Point';
  coordinates?: number[];
}

export interface Type {
  name: string;
  uuid: string;
}

export interface BackEndCoordinates {
  mark: string;
  x: number;
  y: number;
  uuid?: string;
}
