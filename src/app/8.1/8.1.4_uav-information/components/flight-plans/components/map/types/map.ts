import { Coordinate } from '../../../types/tasks';

export interface CoordinateOfTaskPoint {
  coordinate: Coordinate;
  key: string;
  text?: string;
}

export interface PenStyle {
  color: string;
  width: number;
  penStyle?: number;
}

export interface TextStyle {
  color: string;
  align: number;
}

export interface FontStyle {
  size: number;
  weight: number;
}
