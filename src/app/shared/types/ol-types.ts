import { Feature, Map, View } from 'ol';
import Overlay, { Options as OverlayOpt } from 'ol/Overlay';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { Options as BaseLayerOpt } from 'ol/layer/BaseVector';
import { MapOptions } from 'ol/PluggableMap';
import VectorSource, { Options as VectorSourceOpt } from 'ol/source/Vector';
import { ViewOptions } from 'ol/View';
import Style, { Options as StyleOpt } from 'ol/style/Style';
import Stroke, { Options as StrokeOpt } from 'ol/style/Stroke';
import Fill, { Options as FillOpt } from 'ol/style/Fill';
import Circle, { Options as CircleOpt } from 'ol/style/Circle';
import Icon, { Options as IconOpt } from 'ol/style/Icon';
import LineString from 'ol/geom/LineString';
import { Coordinate } from 'ol/coordinate';
import GeometryLayout from 'ol/geom/GeometryLayout';
import LinearRing from 'ol/geom/LinearRing';
import MultiLineString from 'ol/geom/MultiLineString';
import MultiPoint from 'ol/geom/MultiPoint';
import MultiPolygon from 'ol/geom/MultiPolygon';
import Point from 'ol/geom/Point';
import Polygon from 'ol/geom/Polygon';
import Draw, { Options as DrawOpt } from 'ol/interaction/Draw';
import Select, { Options as SelectOpt } from 'ol/interaction/Select';

export interface Layer {
  Tile: new () => TileLayer;
  Vector: new (options?: BaseLayerOpt) => VectorLayer;
}

export interface Source {
  Vector: new (options?: VectorSourceOpt) => VectorSource;
}

export interface Styles {
  Style: new (options?: StyleOpt) => Style;
  Stroke: new (options?: StrokeOpt) => Stroke;
  Fill: new (options?: FillOpt) => Fill;
  Circle: new (options?: CircleOpt) => Circle;
  Icon: new (options?: IconOpt) => Icon;
}

export interface Geom {
  LineString: new (coordinates: Coordinate[] | number[], opt_layout?: GeometryLayout) => LineString;
  LinearRing: new (coordinates: Coordinate[] | number[], opt_layout?: GeometryLayout) => LinearRing;
  MultiLineString: new (coordinates: (Coordinate[] | LineString)[] | number[], opt_layout?: GeometryLayout) => MultiLineString;
  MultiPoint: new (coordinates: Coordinate[] | number[], opt_layout?: GeometryLayout) => MultiPoint;
  MultiPolygon: new (coordinates: (Coordinate[][] | Polygon)[] | number[], opt_layout?: GeometryLayout,) => MultiPolygon;
  Point: new (coordinates: Coordinate, opt_layout?: GeometryLayout) => Point;
  Polygon: new (coordinates: Coordinate[][] | number[], opt_layout?: GeometryLayout) => Polygon;
}

export interface Interaction {
  Draw: new (options: DrawOpt) => Draw;
  Select: new (options?: SelectOpt) => Select;
}

export interface Ol {
  Map: new (options: MapOptions) => Map;
  View: new (options?: ViewOptions) => View;
  layer: Layer;
  source: Source;
  Feature: new () => Feature;
  style: Styles;
  geom: Geom;
  interaction: Interaction;
  Overlay: new (options?: OverlayOpt) => Overlay;
}
