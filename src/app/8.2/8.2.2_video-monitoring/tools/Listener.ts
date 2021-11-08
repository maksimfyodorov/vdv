import { CanvasState } from '../store/canvasState';

export class Listener {
  canvasState: CanvasState;

  constructor(canvasState: CanvasState) {
    this.canvasState = canvasState;
  }

  setListeners(
    mouseDownHandler: (e: MouseEvent) => void,
    mouseUpHandler: (e: MouseEvent) => void,
    mouseMoveHandler: (e: MouseEvent) => void,
    keyDownHandler?: (e: KeyboardEvent) => void
  ): void {
    this.canvasState.canvas.onmousedown = mouseDownHandler;
    this.canvasState.canvas.onmouseup = mouseUpHandler;
    this.canvasState.canvas.onmousemove = mouseMoveHandler;
    this.canvasState.canvas.onkeydown = keyDownHandler;
  }

  destroyListeners(): void {
    this.canvasState.canvas.onmousemove = null;
    this.canvasState.canvas.onmousedown = null;
    this.canvasState.canvas.onmouseup = null;
    this.canvasState.canvas.onkeydown = null;
  }
}
