import { Line } from '../models/line.model';
import { CanvasState } from '../store/canvasState';
import { ListenerState } from '../store/listenerState';
import { Tool } from './Tool';

export class RectangleTool extends Tool {
  width: number = 0;
  height: number = 0;
  startX: number = 0;
  startY: number = 0;

  lines: Line[] = this.getLines();

  constructor(canvasState: CanvasState, listener: ListenerState, action: (schema) => void) {
    super(canvasState, listener, action);
    this.listener.destroyListeners();
    this.listener.setListeners(
      this.mouseDownHandler.bind(this),
      this.mouseUpHandler.bind(this),
      this.mouseMoveHandler.bind(this)
    );
  }

  mouseDownHandler(e) {
    if (e.button !== 0) {
      return;
    }
    this.mouseDown = true;

    this.startX = e.offsetX;
    this.startY = e.offsetY;

    this.canvasState.object.addNewSchema({
      lines: this.lines,
      equipments: [],
      isHover: false,
      isEdit: false,
    });
  }

  mouseUpHandler(e) {
    if (e.button !== 0) {
      return;
    }

    this.mouseDown = false;

    const lastSchema =
      this.canvasState.object.getMonitoringObject().schema[
        this.canvasState.object.getMonitoringObject().schema.length - 1
      ];

    this.action(lastSchema);

    this.startX = 0;
    this.startY = 0;
    this.width = 0;
    this.height = 0;
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      this.width = e.offsetX - this.startX;
      this.height = e.offsetY - this.startY;
      this.canvasState.object.getMonitoringObject().schema[
        this.canvasState.object.getMonitoringObject().schema.length - 1
      ].lines = this.getLines();
    }
  }

  private getLines(): Line[] {
    return [
      {
        start_x: this.startX,
        start_y: this.startY,
        end_x: this.startX + this.width,
        end_y: this.startY,
      },
      {
        start_x: this.startX + this.width,
        start_y: this.startY,
        end_x: this.startX + this.width,
        end_y: this.startY + this.height,
      },
      {
        start_x: this.startX + this.width,
        start_y: this.startY + this.height,
        end_x: this.startX,
        end_y: this.startY + this.height,
      },
      {
        start_x: this.startX,
        start_y: this.startY + this.height,
        end_x: this.startX,
        end_y: this.startY,
      },
    ];
  }
}
