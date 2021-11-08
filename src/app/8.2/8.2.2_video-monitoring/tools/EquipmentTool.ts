import { Tool } from './Tool';
import { CanvasState } from '../store/canvasState';
import { Listener } from './Listener';
import { EquipmentFigure } from '../models/equipment.model';

export class EquipmentTool extends Tool {
  constructor(canvasState: CanvasState, listener: Listener, private equipment: EquipmentFigure, action: () => void) {
    super(canvasState, listener, action);
    this.canvasState.attachedEquipment = equipment;
    this.listener.destroyListeners();
    this.listener.setListeners(
      this.mouseDownHandler.bind(this),
      this.mouseUpHandler.bind(this),
      this.mouseMoveHandler.bind(this),
      this.keyDownHandler.bind(this)
    );
  }

  mouseDownHandler() {
    this.mouseDown = true;
  }

  mouseUpHandler(e) {
    this.mouseDown = false;

    let vertex;

    this.canvasState.object.getMonitoringObject().schema.forEach((schema) => {
      const findedVertex = schema.lines.find(
        (line) =>
          e.offsetX <= line.start_x + 10 &&
          e.offsetX >= line.start_x - 10 &&
          e.offsetY <= line.start_y + 10 &&
          e.offsetY >= line.start_y - 10
      );
      if (findedVertex) {
        vertex = findedVertex;
      }
    });

    this.equipment.getEquipment().position = { x: vertex.start_x, y: vertex.start_y };
    this.listener.destroyListeners();
    this.canvasState.attachedEquipment = null;
    this.action(this.equipment.getEquipment());
    // this.canvasState.attachEquipment(this.equipment.getEquipment());
  }

  mouseMoveHandler(e) {
    if (this.equipment?.getEquipment()?.uuid) {
      this.equipment.setPosition({ x: e.offsetX, y: e.offsetY });
    }
  }

  keyDownHandler(e) {
    console.log(e);
  }
}
