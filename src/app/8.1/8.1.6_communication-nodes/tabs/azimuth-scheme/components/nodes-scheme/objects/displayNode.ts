import { P5Object } from '../abstract/p5-object';
import { Vector } from 'p5';
import { DASHED_LINE_SEGMENTS, Node, STATUS_COLORS } from '../nodes.scheme.types';
import { InstanceService } from '../services/instance.service';
import { Camera } from './camera';

export class DisplayNode extends P5Object {
  public selected = false;
  public status = 'new';
  public position: Vector;
  public size: Vector = this.p5.createVector(120, 80);
  public printMode = false;
  public isParent = false;
  private mousePos: Vector = this.p5.createVector(0, 0);
  private globalMousePosition: Vector = this.p5.createVector(0, 0);

  constructor(
    public baseObject: Node,
    private camera: Camera,
  ) {
    super();
    this.determinePosition();
    this.determineNodeWidth();
  }

  update(): void {
    this.updatePosition();
    this.updateMousePosition();
    this.show();
  }

  public checkForCursorOverlap(): boolean {
    return this.globalMousePosition.x >= this.position.x
      && this.globalMousePosition.x <= (this.position.x + this.size.x)
      && this.globalMousePosition.y >= this.position.y
      && this.globalMousePosition.y <= (this.position.y + this.size.y);
  }

  public checkForCursorOverlapOnCircle(): boolean {
    return this.globalMousePosition.x >= this.position.x + this.size.x - 8
      && this.globalMousePosition.x <= this.position.x + this.size.x + 8
      && this.globalMousePosition.y >= this.position.y + this.size.y / 2 - 8
      && this.globalMousePosition.y <= this.position.y + this.size.y + 8;
  }

  private show(): void {
    this.showSelectionEffect();
    if (this.baseObject.node_type.name === 'Планируемый') {
      this.showDashes();
    }
    if (this.printMode && this.selected) {
      this.showCircle();
    } else if (this.printMode && this.isParent) {
      this.showBackgroundRectangle();
      this.showRectangle();
    } else {
      this.showRectangle();
    }
    this.hideDashes();
    this.showAdditionalControls();
    this.showText();
  }

  private updatePosition(): void {
    if (this.checkForMoveRequest()) {
      this.position.add(this.p5.mouseX / this.camera.scale, this.p5.mouseY / this.camera.scale).sub(this.mousePos);
      this.setNewNodePosition();
      this.nodesSchemeService.setSaveIsNeeded(true);
    }
  }

  private updateMousePosition(): void {
    this.mousePos.set(this.p5.mouseX, this.p5.mouseY).mult(this.camera.scale ** -1);
    this.globalMousePosition.set(this.mousePos.copy().sub(this.camera.translation));
  }

  private checkForMoveRequest(): boolean {
    return this.p5.mouseIsPressed && this.selected && this.userInput.userInputMode === 'cursor';
  }

  private determinePosition(): void {
    this.position = this.p5.createVector(this.baseObject?.positionX || 200, this.baseObject?.positionY || 200);
    this.setNewNodePosition();
  }

  private determineNodeWidth(): void {
    this.size.x = Math.max(Math.max(
      InstanceService.defaultFont.textBounds(this.baseObject.call_sign + ', ' + this.baseObject.division, 0, 0, 12).w,
      InstanceService.defaultFont.textBounds(this.baseObject.military_unit.label, 0, 0, 12 ).w
        ) + 32,
      120
    );
  }

  private showRectangle(): void {
    this.p5.fill('#FFFFFF');
    this.p5.rect(this.position.x, this.position.y, this.size.x, this.size.y, 4);
  }

  private showBackgroundRectangle(): void {
    this.p5.fill('#FFFFFF');
    this.p5.rect(this.position.x - 8, this.position.y - 8, this.size.x + 16, this.size.y + 16);
  }

  private showCircle(): void {
    this.p5.fill('#FFFFFF');
    this.p5.circle(this.position.x + this.size.x / 2, this.position.y + this.size.y / 2, this.size.x);
  }

  private showDashes(): void {
    this.drawingContext.setLineDash(DASHED_LINE_SEGMENTS);
  }

  private hideDashes(): void {
    this.drawingContext.setLineDash([]);
  }

  private showSelectionEffect(): void {
    if (this.selected) {
      this.p5.strokeWeight(2);
      this.p5.stroke('#228BE6');
    } else if (this.checkForCursorOverlap()) {
      this.p5.strokeWeight(1);
      this.p5.stroke('#228BE6');
    } else {
      this.p5.strokeWeight(1);
      this.p5.stroke(STATUS_COLORS[this.status]);
    }
  }

  private showText(): void {
    this.p5.fill('#252B34');
    this.p5.textFont(InstanceService.defaultFont);
    this.p5.noStroke();
    this.p5.textAlign(this.p5.LEFT);
    this.p5.textSize(12);
    if (this.baseObject.division) {
      this.p5.text(
        this.baseObject.military_unit.label + ', ' + this.baseObject.division.label,
        this.position.x + 16, this.position.y + this.size.y / 2 - 8);

    } else {
      this.p5.text(this.baseObject.military_unit.label, this.position.x + 16, this.position.y + this.size.y / 2 - 8);
    }
    this.p5.text(this.baseObject.call_sign, this.position.x + 16, this.position.y + this.size.y / 2 + 16);
  }

  private showAdditionalControls(): void {
    if (this.userInput.userInputMode === 'connection' && this.selected) {
      this.p5.strokeWeight(2);
      this.p5.circle(this.position.x + this.size.x, this.position.y + this.size.y / 2, 16);
    }
  }

  private setNewNodePosition(): void {
    this.baseObject.positionX = this.position.x;
    this.baseObject.positionY = this.position.y;
  }
}
