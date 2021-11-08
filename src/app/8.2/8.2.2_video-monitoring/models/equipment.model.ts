import { setOpacityToHex } from '../editor.utils';
import { MonitoringObject } from './monitoringObject.model';
import { StatusEquipment } from './statusEquipment';
import { CufData } from '../../../shared/components/ospo/cuf/interfaces/interfaces';

export interface Equipment {
  uuid: string;
  position: { x: number; y: number };
  installation_date?: string;
  angle?: number;
  status?: StatusEquipment;
  status_uuid?: string;
  number_on_schema?: string;
  description?: string;
  object?: MonitoringObject;
  object_uuid?: string;
  isEdit?: boolean;
  isHover?: boolean;
  is_attached?: boolean;
  is_attached_to_military_unit?: boolean;
  cuf_uuid?: string;
  cuf?: CufData;
  fixation?: Fixation;
  fixation_uuid?: string;
}

export interface Fixation {
  uuid: string;
  number: string;
  year: number;
  specifications: Specification[];
  cuf_uuid?: string;
}

export interface Specification {
  name: string;
  value: number | string;
}

export class EquipmentFigure {
  constructor(private equipment: Equipment) {}

  getEquipment(): Equipment {
    return this.equipment;
  }

  getEquipmentFixationSpecification(nameSpecification: string): number | string {
    return this.equipment.fixation.specifications.find((specification) => specification.name === nameSpecification)
      .value;
  }

  draw(ctx: CanvasRenderingContext2D, position?: { x: number; y: number }, edit?: boolean) {
    let a = {
      positionX: position?.x || this.equipment.position.x,
      positionY: position?.y || this.equipment.position.y,
    };
    let b = {
      positionX: position?.x || this.equipment.position.x + 80,
      positionY: position?.y || this.equipment.position.y,
    };
    let c = {
      positionX: position?.x || this.equipment.position.x + 80,
      positionY: position?.y || this.equipment.position.y,
    };

    let angleRad = 0;
    let viewingRad = 0;

    if (+this.getEquipmentFixationSpecification('Угол обзора') <= 360) {
      viewingRad = +this.getEquipmentFixationSpecification('Угол обзора') * (Math.PI / 180);
      c = {
        positionX:
          (c.positionX - a.positionX) * Math.cos(viewingRad) -
          (c.positionY - a.positionY) * Math.sin(viewingRad) +
          a.positionX,
        positionY:
          (c.positionX - a.positionX) * Math.sin(viewingRad) +
          (c.positionY - a.positionY) * Math.cos(viewingRad) +
          a.positionY,
      };
    }

    if (this.equipment.angle) {
      angleRad = Number(this.equipment.angle) * (Math.PI / 180);

      b = {
        positionX:
          (b.positionX - a.positionX) * Math.cos(angleRad) -
          (b.positionY - a.positionY) * Math.sin(angleRad) +
          a.positionX,
        positionY:
          (b.positionX - a.positionX) * Math.sin(angleRad) +
          (b.positionY - a.positionY) * Math.cos(angleRad) +
          a.positionY,
      };

      c = {
        positionX:
          (c.positionX - a.positionX) * Math.cos(angleRad) -
          (c.positionY - a.positionY) * Math.sin(angleRad) +
          a.positionX,
        positionY:
          (c.positionX - a.positionX) * Math.sin(angleRad) +
          (c.positionY - a.positionY) * Math.cos(angleRad) +
          a.positionY,
      };
    }

    ctx.beginPath();
    ctx.fillStyle = setOpacityToHex(this.equipment.status?.color, 0.5);
    ctx.arc(a.positionX, a.positionY, 65, angleRad, angleRad + viewingRad);
    ctx.lineTo(a.positionX, a.positionY);
    ctx.arcTo(a.positionX, a.positionY, 22, 0, Math.PI / 2);
    ctx.fill();

    ctx.beginPath();
    ctx.lineWidth = +this.getEquipmentFixationSpecification('Угол обзора') === 360 ? 0.001 : 2;
    ctx.strokeStyle = this.equipment.status?.color;
    ctx.moveTo(a.positionX, a.positionY);
    ctx.lineTo(b.positionX, b.positionY);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = +this.getEquipmentFixationSpecification('Угол обзора') === 360 ? 0.001 : 2;
    ctx.moveTo(c.positionX, c.positionY);
    ctx.lineTo(a.positionX, a.positionY);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.fillStyle = this.equipment.isHover ? '' : 'white';
    ctx.arc(a.positionX, a.positionY, 10, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    if (!edit) {
      ctx.font = '15px serif';
      ctx.fillStyle = 'black';
      ctx.fillText(this.equipment.number_on_schema, a.positionX - 4, a.positionY + 5);
      ctx.closePath();
    }
  }

  drawGizmo(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.fillStyle = '#238ce271';
    ctx.arc(this.equipment.position.x, this.equipment.position.y, 30, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#238be2';
    ctx.arc(this.equipment.position.x, this.equipment.position.y, 30, 0, 2 * Math.PI);
    ctx.stroke();
  }

  updateAngle(angle: number): void {
    this.equipment.angle = angle;
  }

  setPosition(point: { x: number; y: number }): void {
    this.equipment.position = { x: point.x, y: point.y };
  }
}
