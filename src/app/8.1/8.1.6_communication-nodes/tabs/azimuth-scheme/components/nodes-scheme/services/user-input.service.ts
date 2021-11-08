import { ElementRef, Injectable } from '@angular/core';
import { SubjectEvent, SubjectEventKey, USER_INPUT_MODES, UserInputMode } from '../nodes.scheme.types';
import { fromEvent, Observable, Subject } from 'rxjs';
import { InstanceService } from './instance.service';

@Injectable({
  providedIn: 'root'
})
export class UserInputService {
  public userInputMode: UserInputMode = USER_INPUT_MODES[0];
  private container: ElementRef;

  private events: SubjectEvent = {
    doubleClick: new Subject<MouseEvent>(),
    mouseIsPressed: new Subject<boolean>(),
    mouseWheel: new Subject<number>(),
  };

  public assignEventListeners(container: ElementRef): void {
    this.setContainer(container);
    this.assignKeyboardEvents();
    this.assignMouseEvents();
  }

  public getEvent(subjectName: SubjectEventKey): Observable<unknown> {
    return this.events[subjectName];
  }

  private setContainer(container): void {
    this.container = container;
  }

  private assignKeyboardEvents(): void {
    this.assignToolSwitch();
  }

  private assignMouseEvents(): void {
    this.assignDoubleClick();
    this.assignMousePress();
    this.assignMouseWheel();
  }

  private assignToolSwitch(): void {
    InstanceService.subscriptions.push(fromEvent(window, 'keypress').subscribe((e: KeyboardEvent) => {
      switch (e.code) {
        case 'Digit1': {
          this.userInputMode = USER_INPUT_MODES[0];
          break;
        }
        case 'Digit2': {
          this.userInputMode = USER_INPUT_MODES[1];
          break;
        }
        case 'Digit3': {
          this.userInputMode = USER_INPUT_MODES[2];
          break;
        }
      }
    }));
  }

  private assignDoubleClick(): void {
    InstanceService.subscriptions.push(fromEvent(this.container.nativeElement, 'dblclick').subscribe((e: MouseEvent) => {
      this.events.doubleClick.next(e);
    }));
  }

  private assignMousePress(): void {
    InstanceService.subscriptions.push(fromEvent(this.container.nativeElement, 'mousedown').subscribe((e: MouseEvent) => {
      this.events.mouseIsPressed.next(true);
    }));

    InstanceService.subscriptions.push(fromEvent(this.container.nativeElement, 'mouseup').subscribe((e: MouseEvent) => {
      this.events.mouseIsPressed.next(false);
    }));
  }

  private assignMouseWheel(): void {
    InstanceService.subscriptions.push(fromEvent(this.container.nativeElement, 'wheel').subscribe((e: WheelEvent) => {
      this.events.mouseWheel.next(e.deltaY);
    }));
  }
}
