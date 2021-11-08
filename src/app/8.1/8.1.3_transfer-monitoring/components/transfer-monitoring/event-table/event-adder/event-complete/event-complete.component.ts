import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { InitTimeConfig } from '../../../../../../../shared/components/ospo/ospo-time/time.interface';

@Component({
  selector: 'app-event-complete',
  templateUrl: './event-complete.component.html',
  styleUrls: ['./event-complete.component.scss']
})
export class EventCompleteComponent implements OnInit {

  public coment: string;
  public selectedValue: string;
  public time: Subject<string> = new Subject();
  public initConfig: InitTimeConfig = {
    month: true,
    day: true,
    hour: true,
    minute: true,
    seconds: true,
  }

  constructor(
    public config: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
    private changeDetection: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
  }

  public setTime(event: string): void {
    this.time.next(event);
  }

  private returnTime(): Observable<string> {
    return this.time.asObservable();
  }

  public doneEvent(): void {
    const selectedValue = this.selectedValue;
    this.selectedValue = 'done';
    this.returnTime().pipe(filter(res => !!res)).subscribe(res => {
      this.dialogRef.close({ time: res, selectedValue: selectedValue, coment: this.coment })
    })
    this.changeDetection.detectChanges();
  }

}
