import { Schema } from '../models/schema.model';
import { CanvasState } from '../store/canvasState';
import { ListenerState } from '../store/listenerState';

export class Tool {
  canvasState: CanvasState;
  listener: ListenerState;
  action: (schema: any) => void;

  mouseDown: boolean;

  constructor(canvasState: CanvasState, listener: ListenerState, action: (schema: any) => void) {
    this.canvasState = canvasState;
    this.listener = listener;
    this.action = action;
    this.checkFinishedSchema();
  }

  protected draw(...args) {
    throw new Error('');
  }

  protected mouseUpHandler(e) {
    throw new Error('');
  }

  protected mouseDownHandler(e) {
    throw new Error('');
  }

  protected mouseMoveHandler(e) {
    throw new Error('');
  }

  protected checkFinishedSchema(): void {
    const lastSchema: Schema =
      this.canvasState.object.getMonitoringObject().schema[
        this.canvasState.object.getMonitoringObject().schema.length - 1
      ];

    if (lastSchema) {
      const startLine = lastSchema.lines[0];
      const lastLine = lastSchema.lines[lastSchema.lines.length - 1];

      if (startLine.start_x !== lastLine.end_x && startLine.start_y !== lastLine.end_y) {
        this.canvasState.object.getMonitoringObject().schema.pop();
      }
    }
  }
}
