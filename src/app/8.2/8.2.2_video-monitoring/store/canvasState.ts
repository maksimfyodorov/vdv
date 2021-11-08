import { Equipment, EquipmentFigure } from '../models/equipment.model';
import { MonitoringObjectFigure } from '../models/monitoringObject.model';
import { Schema } from '../models/schema.model';
import { VideoMonitoringStoreService } from '../pages/video-monitoring-page/services/video-monitoring-store.service';
import {
  calcRad,
  clearHoverEquipment,
  clearHoverObject,
  editAngleEquipment,
  getEquipment,
  getObject,
} from '../editor.utils';
import { VideoMonitoringService } from '../pages/video-monitoring-page/services/video-monitoring.service';

export class CanvasState {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  object: MonitoringObjectFigure;

  selectedSchema: Schema;
  editedSchema: Schema;

  selectedEquipment: Equipment;
  editedEquipment: EquipmentFigure;
  attachedEquipment: EquipmentFigure;

  isMouseDown: boolean = false;

  bindedRefreshCanvas = this.refreshCanvas.bind(this);

  constructor(
    canvas: HTMLCanvasElement,
    private videoMonitoringService: VideoMonitoringService,
    private pageStore: VideoMonitoringStoreService
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.setListeners();
    this.canvasUpdateOffsets();
    window.requestAnimationFrame(this.bindedRefreshCanvas);
  }

  setListeners(): void {
    this.canvas.addEventListener('mousedown', this.mouseDownHandler.bind(this));
    this.canvas.addEventListener('mouseup', this.mouseUpHandler.bind(this));
    this.canvas.addEventListener('mousemove', this.mouseMoveHandler.bind(this));
    this.canvas.addEventListener('contextmenu', this.mouseClickHandler.bind(this));
    document.addEventListener('resize', this.canvasUpdateOffsets);
  }

  deleteSchema(schema: Schema) {
    this.object.removeSchema(schema);
  }

  attachEquipment(equipment: Equipment) {
    this.object.updateEquipment(equipment);
  }

  unatttachEquipment(unattachedEquipment: Equipment) {
    this.object.getMonitoringObject().schema.forEach((schema) => {
      schema.equipments = schema.equipments.filter((equipment) => equipment.uuid !== unattachedEquipment.uuid);
    });
  }

  setEditedSchema(editedSchema: Schema) {
    this.object.getMonitoringObject().schema.forEach((schema) => {
      if (schema.uuid === editedSchema.uuid) {
        editedSchema.isEdit = !editedSchema.isEdit;
        if (!this.editedSchema.isEdit) {
          this.videoMonitoringService.updateSchema(this.object.getMonitoringObject()).subscribe(() => {
            this.editedSchema = editedSchema.isEdit ? editedSchema : null;
          });
        }
      } else {
        schema.isEdit = false;
      }
    });
  }

  mouseDownHandler(e: MouseEvent) {
    this.isMouseDown = true;
    this.editedSchema = getObject(this.ctx, this.object, e);
  }

  mouseUpHandler(e: MouseEvent) {
    this.isMouseDown = false;
  }

  mouseMoveHandler(e: MouseEvent) {
    this.canvas.setAttribute('style', 'cursor: default');

    clearHoverObject(this.object);
    clearHoverEquipment(this.object);

    this.selectedSchema = getObject(this.ctx, this.object, e);
    this.selectedEquipment = getEquipment(this.object?.getMonitoringObject(), e);

    if (this.selectedSchema) {
      this.selectedSchema.isHover = true;
    }
    if (this.selectedEquipment) {
      this.selectedEquipment.isHover = true;
    }

    if (this.editedEquipment?.getEquipment()?.isEdit && this.isMouseDown) {
      this.editedEquipment.updateAngle(
        editAngleEquipment(calcRad(this.editedEquipment.getEquipment(), e.offsetX, e.offsetY))
      );
    }

    if (this.editedSchema?.isEdit) {
      const vertex = this.editedSchema?.lines.find(
        (line) =>
          e.offsetX <= line.start_x + 25 &&
          e.offsetX >= line.start_x - 25 &&
          e.offsetY <= line.start_y + 25 &&
          e.offsetY >= line.start_y - 25
      );

      if (vertex) {
        this.canvas.setAttribute('style', 'cursor: pointer');
        if (this.isMouseDown) {
          const points = this.editedSchema?.lines.map((line) => {
            if (vertex.start_x === line.start_x && vertex.start_y === line.start_y) {
              return { x: e.offsetX, y: e.offsetY };
            }

            return { x: line.start_x, y: line.start_y };
          });

          this.editedSchema.lines = points.map((point, index) => {
            return {
              start_x: point.x,
              start_y: point.y,
              end_x: index === points.length - 1 ? points[0].x : points[index + 1].x,
              end_y: index === points.length - 1 ? points[0].y : points[index + 1].y,
            };
          });

          const attachedEquipment = this.editedSchema.equipments.find(
            (equipment) => equipment.position.x === vertex.start_x && equipment.position.y === vertex.start_y
          );

          if (attachedEquipment) {
            attachedEquipment.position = {
              x: e.offsetX,
              y: e.offsetY,
            };
          }
        }
      }
    }
  }

  mouseClickHandler(e: MouseEvent) {
    this.pageStore.contextMenuEquipmentState.visible = false;
    this.pageStore.contextMenuObjectState.visible = false;

    e.preventDefault();

    const findedEquipment = getEquipment(this.object?.getMonitoringObject(), e);

    this.editedEquipment = new EquipmentFigure(findedEquipment);
    if (this.editedEquipment?.getEquipment()) {
      this.pageStore.contextMenuEquipmentState = {
        position: { x: e.clientX, y: e.clientY },
        visible: true,
      };
    } else {
      this.editedSchema = getObject(this.ctx, this.object, e);
      if (this.editedSchema) {
        this.pageStore.contextMenuObjectState = {
          position: { x: e.clientX, y: e.clientY },
          visible: true,
        };
      }
    }
  }

  refreshCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
    this.object?.draw(this.ctx);
    this.attachedEquipment?.draw(this.ctx, null, true);
    window.requestAnimationFrame(this.bindedRefreshCanvas);
  }

  private canvasUpdateOffsets(): void {
    const dpr = window.devicePixelRatio;
    this.canvas.width = this.canvas.offsetWidth * dpr;
    this.canvas.height = this.canvas.offsetHeight * dpr;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.scale(dpr, dpr);
  }
}
