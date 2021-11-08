import { P5Object } from '../abstract/p5-object';
import { DisplayNode } from './displayNode';
import { DASHED_LINE_SEGMENTS, Direction, STATUS_COLORS } from '../nodes.scheme.types';
import { Vector } from 'p5';
import { collideLineCircle } from 'p5collide';
import { Camera } from './camera';

export class DisplayDirection extends P5Object {
  private status = 'new';
  private start: DisplayNode;
  private end: DisplayNode;
  private globalMousePosition: Vector = this.p5.createVector(0, 0);

  constructor(
    public baseObject: Direction,
    private nodes: DisplayNode[],
    private camera: Camera
    ) {
    super();
    this.findConnectedNodes();
  }

  public checkForCursorOverlap(): boolean {
    return collideLineCircle(
      this.start.position.x + this.start.size.x / 2,
      this.start.position.y + this.start.size.y / 2,
      this.end.position.x + this.end.size.x / 2,
      this.end.position.y + this.end.size.y / 2,
      this.globalMousePosition.x, this.globalMousePosition.y,
      24
    );
  }

  update(): void {
    this.updateMousePosition();
    this.setStrokeByStatus();
    this.show();
  }

  private show(): void {
    this.showSelectionEffect();
    this.showLineByStatus();
  }

  private setStrokeByStatus(): void {
    this.p5.strokeWeight(1);
    this.p5.stroke(STATUS_COLORS[this.status]);
    this.p5.stroke(0);
  }

  private showLineByStatus(): void {
    switch (this.baseObject.direction_type.name) {
      case 'Действующий': {
        this.drawLine();
        break;
      }
      case 'Планируемый': {
        this.drawDottedLine();
        break;
      }
    }
  }

  private findConnectedNodes(): void {
    this.start = this.nodes.find(current => current.baseObject.uuid === this.baseObject.node_out_uuid);
    this.end = this.nodes.find(current => current.baseObject.uuid === this.baseObject.node_in_uuid);
  }

  private drawLine(): void {
    this.p5.line(
      this.start.position.x + this.start.size.x / 2,
      this.start.position.y + this.start.size.y / 2,
      this.end.position.x + this.end.size.x / 2,
      this.end.position.y + this.end.size.y / 2);
  }

  private drawDottedLine(): void {
    this.drawingContext.setLineDash(DASHED_LINE_SEGMENTS);
    this.drawLine();
    this.drawingContext.setLineDash([]);
  }

  private showSelectionEffect(): void {
    if (this.checkForCursorOverlap()) {
      this.p5.stroke('#228BE6');
    }
  }

  private updateMousePosition(): void {
    this.globalMousePosition.set(
      this.p5.createVector(this.p5.mouseX, this.p5.mouseY)
        .mult(this.camera.scale ** -1)
        .sub(this.camera.translation)
    );
  }
}
