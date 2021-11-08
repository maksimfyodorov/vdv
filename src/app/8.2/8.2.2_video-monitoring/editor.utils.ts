import { Equipment } from './models/equipment.model';
import { MonitoringObject, MonitoringObjectFigure } from './models/monitoringObject.model';
import { CanvasState } from './store/canvasState';

export function getObject(ctx: CanvasRenderingContext2D, object: MonitoringObjectFigure, event: MouseEvent) {
  let findedSchema;

  object?.getMonitoringObject()?.schema.forEach((schema) => {
    object.drawSchema(schema, ctx);
    if (ctx.isPointInPath(event.offsetX, event.offsetY)) {
      findedSchema = schema;
    }
  });

  return findedSchema;
}

export const getVertex = (figures, e) => {
  let editedVertex;

  figures.forEach((object) => {
    const findedVertex = object.lines.find(
      (line) =>
        e.offsetX <= line.startX + 25 &&
        e.offsetX >= line.startX - 25 &&
        e.offsetY <= line.startY + 25 &&
        e.offsetY >= line.startY - 25
    );

    if (findedVertex) {
      editedVertex = findedVertex;
    }
  });

  return editedVertex;
};

export const getEquipment = (object: MonitoringObject, e: MouseEvent) => {
  let equipment;

  object?.schema.forEach((schema) => {
    const findedEquipment = schema.equipments.find(
      (equipment) =>
        e.offsetX <= equipment?.position?.x + 10 &&
        e.offsetX >= equipment?.position?.x - 10 &&
        e.offsetY <= equipment?.position?.y + 10 &&
        e.offsetY >= equipment?.position?.y - 10
    );
    if (findedEquipment) {
      equipment = findedEquipment;
    }
  });

  return equipment;
  // return object?.equipments.find(
  //   (equipment) =>
  //     e.offsetX <= equipment?.position?.x + 10 &&
  //     e.offsetX >= equipment?.position?.x - 10 &&
  //     e.offsetY <= equipment?.position?.y + 10 &&
  //     e.offsetY >= equipment?.position?.y - 10
  // );
};

export const getSchema = (objects, vertex) => {
  let schema;

  objects.forEach((object) => {
    const findedVertex = object.lines.find((line) => line.startX === vertex.startX && line.startY === vertex.startY);

    if (findedVertex) {
      schema = object;
    }
  });

  return schema;
};

export function clearHoverObject(object: MonitoringObjectFigure) {
  object?.getMonitoringObject()?.schema.forEach((schema) => {
    schema.isHover = false;
  });

  object?.getMonitoringObject()?.equipments.forEach((equipment) => {
    equipment.isHover = false;
  });
}
export function clearHoverEquipment(object: MonitoringObjectFigure) {
  object?.getMonitoringObject()?.schema.forEach((schema) => {
    schema.equipments.forEach((equipment) => {
      equipment.isHover = false;
    });
  });
}

export const calcRad = (equipment: Equipment, x: number, y: number) => {
  return Math.atan2(x - equipment.position.x, y - equipment.position.y);
};

export const editAngleEquipment = (rad: number) => {
  return Math.round(-rad * (180 / Math.PI));
};

export const copy = <T>(obj: T): T => {
  if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || obj === null) {
    return obj;
  }

  const result = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value !== 'object' || value === null) {
      result[key] = value;
    } else if (Array.isArray(value)) {
      result[key] = value.map((item) => copy(item));
    } else {
      result[key] = copy(value as T);
    }
  });

  return result as T;
};

export const setOpacityToHex = (hex: string, alpha: number): string =>
  `${hex}${Math.floor(alpha * 255)
    .toString(16)
    .padStart(2, '0')}`;

export const canvasUpdateOffsets = (canvasState: CanvasState): void => {
  const dpr = window.devicePixelRatio;
  canvasState.canvas.width = canvasState.canvas.offsetWidth * dpr;
  canvasState.canvas.height = canvasState.canvas.offsetHeight * dpr;
  canvasState.ctx = canvasState.canvas.getContext('2d');
  canvasState.ctx.scale(dpr, dpr);
};
