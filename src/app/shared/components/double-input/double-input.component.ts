import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-double-input',
  templateUrl: './double-input.component.html',
  styleUrls: ['./double-input.component.scss'],
})
export class DoubleInputComponent {
  @Input() valueLeft;
  @Input() valueRight;

  constructor() {
  }


}
