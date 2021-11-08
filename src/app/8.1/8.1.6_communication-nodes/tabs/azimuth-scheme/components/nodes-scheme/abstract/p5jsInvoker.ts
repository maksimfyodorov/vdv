import * as p5 from 'p5';

export abstract class P5JSInvoker {
  abstract preload(p: p5): void;
  abstract setup(p: p5): void;
  abstract draw(p: p5): void;


  protected startP5JS(containerElement: HTMLElement): p5 {
    // noinspection JSPotentiallyInvalidConstructorUsage
    return new p5(this.generate_sketch(), containerElement);
  }

  private generate_sketch(): any {
    const that = this;

    return ((p: p5) => {
      p.preload = (): void => {
        that.preload(p);
      };

      p.setup = (): void => {
        that.setup(p);
      };

      p.draw = (): void => {
        that.draw(p);
      };
    });
  }
}
