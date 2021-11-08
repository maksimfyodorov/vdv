import { Tool } from './Tool';

import { CanvasState } from '../store/canvasState';
import { Listener as ListenerState } from './Listener';
import { Line } from '../models/line.model';

export class PolygonTool extends Tool {
  lines: Line[] = [];
  line: Line = {};
  currentLine = -1;

  isDrag: boolean = false;

  constructor(canvasState: CanvasState, listener: ListenerState, action: (schema) => void) {
    super(canvasState, listener, action);
    this.listener.destroyListeners();
    this.listener.setListeners(
      this.mouseDownHandler.bind(this),
      this.mouseUpHandler.bind(this),
      this.mouseMoveHandler.bind(this),
      this.keydownHandler.bind(this)
    );
  }

  mouseDownHandler(e) {
    if (e.button !== 0) {
      return;
    }

    const lastSchema =
      this.canvasState.object.getMonitoringObject().schema[
        this.canvasState.object.getMonitoringObject().schema.length - 1
      ];

    this.mouseDown = true;

    this.isDrag = true;
    if (
      e.offsetX <= this.lines[0]?.start_x + 10 &&
      e.offsetX >= this.lines[0]?.start_x - 10 &&
      e.offsetY >= this.lines[0]?.start_y - 10 &&
      e.offsetY <= this.lines[0]?.start_y + 10
    ) {
      this.lines[this.currentLine].end_x = this.lines[0].start_x;
      this.lines[this.currentLine].end_y = this.lines[0].start_y;

      this.action(lastSchema);

      this.isDrag = false;
      this.currentLine = -1;
      this.lines = [];
      return;
    }
    this.currentLine += 1;
    this.line = { start_x: e.offsetX, start_y: e.offsetY };
    this.lines.push(this.line);

    if (this.lines.length <= 1) {
      this.canvasState.object.addNewSchema({ equipments: [], lines: this.lines, isHover: false, isEdit: false });
    } else {
      lastSchema.lines = this.lines;
    }
  }

  mouseUpHandler(e) {
    this.mouseDown = false;
  }

  mouseMoveHandler(e) {
    if (this.isDrag) {
      if (this.currentLine > -1) {
        this.lines[this.currentLine] = {
          ...this.lines[this.currentLine],
          end_x: e.offsetX,
          end_y: e.offsetY,
        };
      }
    }
  }

  keydownHandler(e: KeyboardEvent) {
    if (e.code === 'Escape') {
      if (this.lines.length) {
        if (this.currentLine === 0) {
          this.canvasState.object.getMonitoringObject().schema.pop();
        }
        this.currentLine -= 1;
        this.lines.pop();
        this.line = this.lines[this.currentLine];
      }
    }
  }
}
