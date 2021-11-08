import { CanvasState } from '../../store/CanvasState';
import { Schema } from '../schema.model';
import { Equipment } from './Equipment';

export class Figure {
  ctx: CanvasRenderingContext2D;
  canvasState: CanvasState;
  id: number;
  isHover: boolean = false;
  isEdit: boolean = false;
  lines: { startX?: number; startY?: number; endX?: number; endY?: number }[];
  equipments: Equipment[] = [];
  schema: Schema[];

  constructor(canvasState: CanvasState, id, lines, equipments) {
    this.ctx = canvasState.ctx;
    this.canvasState = canvasState;
    this.id = id;
    this.equipments = equipments;
    this.lines = lines;
  }

  addNewEquipment(equipment: Equipment) {
    this.equipments.push(equipment);
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.isHover ? '#228be64b' : '#9e9e9e57';
    this.ctx.strokeStyle = this.isEdit ? '#228be6' : '#464646';
    this.ctx.moveTo(this.lines[0].startX, this.lines[0].startY);
    this.lines.forEach((line) => {
      this.ctx.lineTo(line.endX, line.endY);
    });
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
  }

  drawVertex(): void {
    this.lines.forEach((line) => {
      this.ctx.beginPath();
      this.ctx.fillStyle = 'white';
      this.ctx.rect(line.endX - 5, line.endY - 5, 10, 10);
      this.ctx.fill();
      this.ctx.closePath();

      this.ctx.beginPath();
      this.ctx.strokeStyle = '#238ae6';
      this.ctx.rect(line.endX - 5, line.endY - 5, 10, 10);
      this.ctx.stroke();
      this.ctx.closePath();
    });
  }
}
