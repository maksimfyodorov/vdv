import { Component, Input } from '@angular/core';
import { Color } from './progress-bar-colors';
@Component({
  selector: 'progress-bar',
  template: '<div class="progress-bar" [style.background]="styleGradient">{{_value}}%</div>',
  styles: [
    '.progress-bar { width: 100%; height: 50px; display: flex; justify-content: center; align-items: center; font-weight: bold}',
  ],
})
export class ProgressBarComponent {
  _value: number;
  @Input() set value(value: number) {
    this._value = Math.floor(value);
  }

  private color: string = Color.RED;

  styleGradient: string;

  constructor() {}

  ngOnChanges(): void {
    if (this._value <= 25) {
      this.color = Color.RED;
    } else if (this._value > 25 && this._value < 50) {
      this.color = Color.YELLOW;
    } else if (this._value >= 50) {
      this.color = Color.GREEN;
    }
    this.styleGradient = `linear-gradient(90deg, ${this.color} ${this._value + 1}%, #fff ${this._value + 1}%)`;
  }
}
