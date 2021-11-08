import { P5Object } from '../abstract/p5-object';
import { InstanceService } from '../services/instance.service';

export class Camera extends P5Object {
  public translation = this.p5.createVector(0, 0);
  public scale = 1;
  private mousePos = this.p5.createVector(0, 0);
  private mouseIsPressed = false;

  constructor() {
    super();
    this.subscribeToUserInput();
  }

  public update(): void {
    this.updateScale();
    this.updateTranslation();
    this.translateCamera();
    this.updateMousePosition();
  }

  public setDefaultScale(): void {
    this.scale = 1;
  }

  public zoomIn(): void {
    this.scale += 0.1;
    this.constrainScaleValue();
  }

  public zoomOut(): void {
    this.scale -= 0.1;
    this.constrainScaleValue();
  }

  private subscribeToUserInput(): void {
    InstanceService.subscriptions.push(this.userInput.getEvent('mouseIsPressed').subscribe((isPressed: boolean) => {
      this.mouseIsPressed = isPressed;
    }));
    InstanceService.subscriptions.push(this.userInput.getEvent('mouseWheel').subscribe((delta: number) => {
      delta < 0 ? this.zoomIn() : this.zoomOut();
    }));
  }

  private updateTranslation(): void {
    if (this.checkForTranslationRequest()) {
     this.translation
        .add(this.p5.mouseX / this.scale, this.p5.mouseY / this.scale)
          .sub(this.mousePos);
    }
  }

  private translateCamera(): void {
    this.p5.translate(this.translation);
  }

  private updateMousePosition(): void {
    this.mousePos.set(this.p5.mouseX, this.p5.mouseY).mult(this.scale ** -1);
  }

  private checkForTranslationRequest(): boolean {
    return this.mouseIsPressed && this.userInput.userInputMode === 'hand';
  }

  private updateScale(): void {
    this.p5.scale(this.scale);
  }

  private constrainScaleValue(): void {
    this.scale = +Math.max(Math.min(this.scale, 10), 0.1).toFixed(2);
  }
}
