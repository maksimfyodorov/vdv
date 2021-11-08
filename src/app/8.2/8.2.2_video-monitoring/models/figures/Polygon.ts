import { CanvasState } from '../../store/CanvasState';
import { Figure } from './Figure';

export class Polygon extends Figure {
  id: number;

  constructor(id, lines, canvasState: CanvasState, equipments) {
    super(canvasState, id, lines, equipments);
    this.id = id;
    this.lines = lines;
  }
}
