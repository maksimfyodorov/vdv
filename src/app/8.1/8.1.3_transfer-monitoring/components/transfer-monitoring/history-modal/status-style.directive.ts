import { AfterContentInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appStatusStyle]'
})
export class StatusStyleDirective implements AfterContentInit {

  constructor(private elementRef: ElementRef) { }

  public ngAfterContentInit(): void {
    let content = this.elementRef.nativeElement.innerHTML;
    let color;
    content = content.trim();    
    switch (content) {
      case 'Создан':
        color = '#339AF0';
        break;
      case 'Редактирование':
        color = '#339AF0';
        break;
      default:
        color = '#959EA9';
    }
    this.elementRef.nativeElement.style.backgroundColor = color;
  }

}
