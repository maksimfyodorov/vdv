import { setOpacityToHex } from '../../editor.utils';
import { CanvasState } from '../../store/CanvasState';
import { StatusEquipment } from '../statusEquipment';

export class Equipment {
  id: number;
  position: { x: number; y: number } = null;
  angle: number;
  status: StatusEquipment;
  numberOnSchema: string;
  canvasState: CanvasState;
  isEdit: boolean = false;

  constructor(canvasState: CanvasState, id, angle, status, numberOnSchema?, position?) {
    this.id = id;
    this.canvasState = canvasState;
    this.angle = angle;
    this.status = status;
    this.position = position;
    this.numberOnSchema = numberOnSchema;
  }

  draw() {
    let a = {
      positionX: this.position.x,
      positionY: this.position.y,
    };
    let b = {
      positionX: this.position.x + 80,
      positionY: this.position.y,
    };
    let c = {
      positionX: this.position.x,
      positionY: this.position.y + 80,
    };
    let rad = 0;

    if (this.angle) {
      rad = Number(this.angle) * (Math.PI / 180);

      b = {
        positionX:
          (b.positionX - a.positionX) * Math.cos(rad) - (b.positionY - a.positionY) * Math.sin(rad) + a.positionX,
        positionY:
          (b.positionX - a.positionX) * Math.sin(rad) + (b.positionY - a.positionY) * Math.cos(rad) + a.positionY,
      };

      c = {
        positionX:
          (c.positionX - a.positionX) * Math.cos(rad) - (c.positionY - a.positionY) * Math.sin(rad) + a.positionX,
        positionY:
          (c.positionX - a.positionX) * Math.sin(rad) + (c.positionY - a.positionY) * Math.cos(rad) + a.positionY,
      };
    }

    this.canvasState.ctx.beginPath();
    this.canvasState.ctx.fillStyle = setOpacityToHex(this.status?.color, 0.5);
    this.canvasState.ctx.arc(a.positionX, a.positionY, 65, rad, Math.PI / 2 + rad);
    this.canvasState.ctx.lineTo(a.positionX, a.positionY);
    this.canvasState.ctx.arcTo(a.positionX, a.positionY, 22, 0, Math.PI / 2);
    this.canvasState.ctx.fill();

    this.canvasState.ctx.beginPath();
    this.canvasState.ctx.lineWidth = 2;
    this.canvasState.ctx.strokeStyle = this.status?.color;
    this.canvasState.ctx.moveTo(a.positionX, a.positionY);
    this.canvasState.ctx.lineTo(b.positionX, b.positionY);
    this.canvasState.ctx.stroke();

    this.canvasState.ctx.beginPath();
    this.canvasState.ctx.moveTo(c.positionX, c.positionY);
    this.canvasState.ctx.lineTo(a.positionX, a.positionY);
    this.canvasState.ctx.stroke();

    this.canvasState.ctx.beginPath();
    this.canvasState.ctx.lineWidth = 2;
    this.canvasState.ctx.fillStyle = 'white';
    this.canvasState.ctx.arc(a.positionX, a.positionY, 10, 0, 2 * Math.PI);
    this.canvasState.ctx.stroke();
    this.canvasState.ctx.fill();

    this.canvasState.ctx.font = '15px serif';
    this.canvasState.ctx.fillStyle = 'black';
    this.canvasState.ctx.fillText(this.numberOnSchema, a.positionX - 4, a.positionY + 5);
    this.canvasState.ctx.closePath();
  }

  drawGizmoCamera(): void {
    this.canvasState.ctx.beginPath();
    this.canvasState.ctx.fillStyle = '#238ce271';
    this.canvasState.ctx.arc(this.position.x, this.position.y, 30, 0, 2 * Math.PI);
    this.canvasState.ctx.fill();

    this.canvasState.ctx.beginPath();
    this.canvasState.ctx.lineWidth = 2;
    this.canvasState.ctx.strokeStyle = '#238be2';
    this.canvasState.ctx.arc(this.position.x, this.position.y, 30, 0, 2 * Math.PI);
    this.canvasState.ctx.stroke();
  }

  updateAngle(angle: number): void {
    this.angle = angle;
  }
}
