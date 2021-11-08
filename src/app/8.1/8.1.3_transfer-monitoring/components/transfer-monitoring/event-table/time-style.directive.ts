import { AfterContentInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { EventTableDataService } from '../../../services/event-table-data.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appTimeStyle]'
})
export class TimeStyleDirective implements AfterContentInit, OnDestroy {

  @Input('appTimeStyle') type = 'default type';
  public time: number;
  public subscriptions: Subscription[] = [];
  public timePeriods: number[] = [2592000, 86400, 3600, 60, 1]

  constructor(
    public dataService: EventTableDataService,
    private elementRef: ElementRef,
  ) { }

  public ngAfterContentInit(): void {
    if (this.elementRef.nativeElement.innerHTML.length > 2) {
      this.setColor();
    }
    else {
      this.subscriptions.push(this.dataService.returnDate().subscribe(res => {
        this.setTime(this.elementRef.nativeElement.innerHTML);
      }))
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(el => el.unsubscribe());
  }

  public setTime(str: string): number {
    let time = 0;
    const data = str.split(':')
    this.timePeriods.forEach((element, i) => {
      time = time + Number(data[i]) * element
    })
    return time
  }

  public setColor(): void {
    if (this.setTime(this.type) > this.setTime(this.elementRef.nativeElement.innerHTML)) {
      this.elementRef.nativeElement.style.backgroundColor = '#FFC078';
    }
    else {
      this.elementRef.nativeElement.style.backgroundColor = '#D5F69B';
    }
  }
}
