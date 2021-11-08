import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HostTrigger, Status, TriggerI } from '../../../../interfaces/interfaces';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-trigger',
  templateUrl: './trigger.component.html',
  styleUrls: ['./trigger.component.scss'],
})
export class TriggerComponent implements OnInit {

  @Input() public host: FormControl;
  @Input() public hostTriggers: HostTrigger[];
  @Input() public onTriggeredStatuses: Status[];
  @Input() public triggerFormGroup;
  @Output() onDeleteTrigger = new EventEmitter<TriggerI>();

  constructor() {
  }

  public ngOnInit(): void {
  }

  public delete(): void {
    this.onDeleteTrigger.emit();
  }
}
