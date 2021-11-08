import { ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
})
export class ContextMenuComponent {
  @ViewChild('contextMenuRef') contextMenuRef: ElementRef;
  @Input() items = [];
  @Input() selectedItem: any = {};

  @Input() position: { x: number; y: number } = { x: 0, y: 0 };
  @Input() contextMenuVisible: boolean = false;

  @Output() onChangeVisibleContextMenu = new EventEmitter();

  @Output() onDeleteObject = new EventEmitter();

  contextMenuStyle: string = '';

  constructor() {}

  ngOnChanges(): void {
    this.attachListener();
    this.contextMenuStyle = `position: absolute; left: ${this.position.x}px; top: ${this.position.y}px`;
  }

  ngOnDestroy(): void {
    window.onclick = null;
  }

  hideContextMenu(): void {
    this.onChangeVisibleContextMenu.emit(false);
  }

  private attachListener(): void {
    window.onclick = (e: MouseEvent) => {
      if (e.target !== this.contextMenuRef?.nativeElement) {
        this.hideContextMenu();
      }
    };
  }
}
