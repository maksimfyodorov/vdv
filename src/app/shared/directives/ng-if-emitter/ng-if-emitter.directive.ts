import { Directive, ElementRef, EventEmitter, Inject, InjectionToken, OnInit, Output, Self } from '@angular/core';

export const NG_IF_COMPONENT_DATA_TOKEN = new InjectionToken('token to get component when ngIf = true')

@Directive({
  selector: '[appNgIfEmitter]'
})
export class NgIfEmitterDirective implements OnInit {
  @Output() public templateLoaded: EventEmitter<{ element: ElementRef, component: any }> = new EventEmitter<{element: ElementRef, component: any}>();

  constructor(
    private element: ElementRef,
    @Self() @Inject(NG_IF_COMPONENT_DATA_TOKEN) private component: any
  ) { }

  public ngOnInit(): void {
    this.templateLoaded.next({element: this.element, component: this.component})
  }
}
