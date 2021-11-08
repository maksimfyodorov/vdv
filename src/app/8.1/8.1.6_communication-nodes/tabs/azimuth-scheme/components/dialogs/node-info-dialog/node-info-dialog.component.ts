import { Component, Inject, OnInit } from '@angular/core';
import { Node } from '../../nodes-scheme/nodes.scheme.types';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export const MAP_NODE_TYPE = {
  active: 'Активный',
  planned: 'Планируемый',
};

@Component({
  selector: 'app-node-info-dialog',
  templateUrl: './node-info-dialog.component.html',
  styleUrls: ['./node-info-dialog.component.scss'],
})
export class NodeInfoDialogComponent implements OnInit {

  public node: Node;
  public nodeType = MAP_NODE_TYPE;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
  ) { }

  ngOnInit(): void {
    this.node = this.data;
  }

}
