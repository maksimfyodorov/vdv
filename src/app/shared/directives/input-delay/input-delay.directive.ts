import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { fromEvent, Subject, timer } from 'rxjs';
import { debounce, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appInputDelay]',
})

export class InputDelayDirective implements OnInit, OnDestroy {
  @Output() public delayInput = new EventEmitter<any>();
  @Input() public delayTime = 500;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly elementRef: ElementRef<HTMLInputElement>,
  ) {
  }

  public ngOnInit(): void {
    fromEvent(this.elementRef.nativeElement, 'input').pipe(
      debounce(() => timer(this.delayTime)),
      distinctUntilChanged(
        null,
        (event: any) => (event.target as HTMLInputElement).value,
      ),
      takeUntil(this.destroy$),
    ).subscribe(e => {
      this.delayInput.emit(e.target.value);
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
  }
}
