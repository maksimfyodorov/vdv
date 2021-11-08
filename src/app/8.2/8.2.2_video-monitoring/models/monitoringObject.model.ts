import { MilitaryUnit } from '../../../shared/components/ospo/documents/attach-document-dialog/attach-document-dialog.types';
import { setOpacityToHex } from '../editor.utils';
import { Equipment, EquipmentFigure } from './equipment.model';
import { Schema } from './schema.model';

export interface MonitoringObject {
  uuid: string | number;
  name: string;
  number?: string;
  military_unit?: MilitaryUnit;
  military_unit_id?: number;
  schema?: Schema[];
  equipments?: Equipment[];
}

export class MonitoringObjectFigure {
  public isEdit?: boolean;

  constructor(private monitoringObject: MonitoringObject) {}

  getMonitoringObject(): MonitoringObject {
    return this.monitoringObject;
  }

  addNewSchema(schema: Schema): void {
    this.monitoringObject.schema.push(schema);
  }

  removeSchema(deletedSchema: Schema): void {
    this.monitoringObject.schema = this.monitoringObject.schema.filter((schema) => schema.uuid !== deletedSchema.uuid);
  }

  addNewEquipment(equipment: Equipment): void {
    this.monitoringObject.equipments.push(equipment);
  }

  removeEquipment(removedEquipment: Equipment): void {
    this.monitoringObject.equipments = this.monitoringObject.equipments.filter(
      (equipment) => equipment.uuid !== removedEquipment.uuid
    );
  }

  updateEquipment(newEquipment: Equipment): void {
    this.monitoringObject.equipments = this.monitoringObject.equipments.map((equipment) => {
      if (equipment.uuid === newEquipment.uuid) {
        return newEquipment;
      }
      return equipment;
    });
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.monitoringObject?.schema.length) {
      this.monitoringObject.schema.forEach((schema) => {
        this.drawSchema(schema, ctx);
        this.drawEquipments(schema, ctx);
        if (schema.isEdit) {
          this.drawSchemaGizmo(schema, ctx);
        }
      });
    }
  }

  drawSchema(schema: Schema, ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.fillStyle = schema.isHover ? '#228be64b' : '#9e9e9e57';
    ctx.strokeStyle = schema.isEdit ? '#228be6' : '#464646';
    ctx.moveTo(schema.lines[0].start_x, schema.lines[0].start_y);
    schema.lines.forEach((line) => {
      ctx.lineTo(line.end_x, line.end_y);
    });
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }

  drawSchemaGizmo(schema: Schema, ctx: CanvasRenderingContext2D): void {
    schema.lines.forEach((line) => {
      ctx.beginPath();
      ctx.fillStyle = 'white';
      ctx.rect(line.start_x - 5, line.start_y - 5, 10, 10);
      ctx.fill();

      ctx.beginPath();
      ctx.strokeStyle = '#238ae6';
      ctx.rect(line.start_x - 5, line.start_y - 5, 10, 10);
      ctx.stroke();
    });
  }

  drawEquipments(schema: Schema, ctx: CanvasRenderingContext2D): void {
    schema.equipments.forEach((equipment) => {
      this.drawEquipment(new EquipmentFigure(equipment), ctx);
    });
  }

  drawEquipment(equipment: EquipmentFigure, ctx: CanvasRenderingContext2D): void {
    let a = {
      positionX: equipment.getEquipment().position.x,
      positionY: equipment.getEquipment().position.y,
    };
    let b = {
      positionX: equipment.getEquipment().position.x + 80,
      positionY: equipment.getEquipment().position.y,
    };
    let c = {
      positionX: equipment.getEquipment().position.x + 80,
      positionY: equipment.getEquipment().position.y,
    };

    let angleRad = 0;
    let viewingRad = 0;

    if (+equipment.getEquipmentFixationSpecification('Угол обзора') <= 360) {
      viewingRad = +equipment.getEquipmentFixationSpecification('Угол обзора') * (Math.PI / 180);
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

    if (equipment.getEquipment().angle) {
      angleRad = +equipment.getEquipment().angle * (Math.PI / 180);

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
    ctx.fillStyle = setOpacityToHex(equipment.getEquipment().status?.color, 0.5);
    ctx.arc(a.positionX, a.positionY, 65, angleRad, angleRad + viewingRad);
    ctx.lineTo(a.positionX, a.positionY);
    ctx.arcTo(a.positionX, a.positionY, 22, 0, Math.PI / 2);
    ctx.fill();

    ctx.beginPath();
    ctx.lineWidth = +equipment.getEquipmentFixationSpecification('Угол обзора') === 360 ? 0.001 : 2;
    ctx.strokeStyle = equipment.getEquipment().status?.color;
    ctx.moveTo(a.positionX, a.positionY);
    ctx.lineTo(b.positionX, b.positionY);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = +equipment.getEquipmentFixationSpecification('Угол обзора') === 360 ? 0.001 : 2;
    ctx.moveTo(c.positionX, c.positionY);
    ctx.lineTo(a.positionX, a.positionY);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.fillStyle = equipment.getEquipment().isHover ? '#228be6' : 'white';
    ctx.arc(a.positionX, a.positionY, 10, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.font = '15px serif';
    ctx.fillStyle = 'black';
    ctx.fillText(equipment.getEquipment()?.number_on_schema?.toString(), a.positionX - 4, a.positionY + 5);
    ctx.closePath();

    if (equipment.getEquipment().isEdit) {
      ctx.beginPath();
      ctx.fillStyle = '#238ce271';
      ctx.arc(equipment.getEquipment().position.x, equipment.getEquipment().position.y, 30, 0, 2 * Math.PI);
      ctx.fill();

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#238be2';
      ctx.arc(equipment.getEquipment().position.x, equipment.getEquipment().position.y, 30, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }
}
