import {
  AfterViewInit,
  ChangeDetectorRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  Input,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Directive({
             selector: '[appLoader]',
           })
export class LoaderDirective implements AfterViewInit {
  private factory: ComponentFactory<LoaderComponent>;
  private loader: ComponentRef<LoaderComponent>;
  private isLoading = false;
  @Input() appLoader: Observable<boolean>;
  @Input() spinnerSize = 100

  constructor(
    private viewContainer: ViewContainerRef,
    private elementRef: ElementRef,
    private resolver: ComponentFactoryResolver,
    private renderer: Renderer2,
    private changeDetection: ChangeDetectorRef,
  ) {
  }

  public ngAfterViewInit(): void {
    this.determineLoaderState();
  }

  private determineLoaderState(): void {
    this.setRelativePositionToParent();
    this.subscribeToRequestsStatus();
  }

  private setRelativePositionToParent(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'position', 'relative');
  }

  private subscribeToRequestsStatus(): void {
    this.appLoader.pipe(filter(res => res !== this.isLoading)).subscribe(value => {
      this.isLoading = value;
      if (this.loader) {
        this.loader.destroy();
      }
      if (this.isLoading) {
        this.showLoader();
      }
      this.changeDetection.detectChanges();
    });
  }

  private showLoader(): void {
    this.factory = this.resolver.resolveComponentFactory(LoaderComponent);
    this.loader = this.viewContainer.createComponent(this.factory);
    this.loader.instance.spinnerSize = this.spinnerSize;
    this.renderer.appendChild(this.elementRef.nativeElement, this.loader.location.nativeElement);
  }
}
