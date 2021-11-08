import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { NgResizeObserver } from 'ng-resize-observer';

@Directive({
  selector: '[appMapResize]',
  providers: [NgResizeObserver]
})
export class MapResizeDirective implements AfterViewInit, OnDestroy {
  @Input() public mapContext: any;
  private resizeObserver: ResizeObserver;

  constructor(
    private elRef: ElementRef,
  ) {
  }

  public ngAfterViewInit(): void {
    this.startObserve();
  }

  public ngOnDestroy(): void {
    this.resizeObserver.unobserve(this.elRef.nativeElement);
    this.resizeObserver.disconnect();
  }

  private startObserve(): void {
    this.resizeObserver = new ResizeObserver(_ => {
      this.mapContext?.updateSize();
    })
    this.resizeObserver.observe(this.elRef.nativeElement);
  }
}
