import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  @ViewChild('canvas')
  canvas: ElementRef;

  @Output()
  onChangedCanvas = new EventEmitter<any>();

  constructor() {}

  ngAfterViewInit(): void {
    this.onChangedCanvas.emit(this.canvas.nativeElement);
  }
}
