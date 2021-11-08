import { Component } from '@angular/core';


@Component({
  selector: 'app-communication-nodes',
  templateUrl: './communication-nodes.component.html',
  styleUrls: ['./communication-nodes.component.scss'],
})
export class CommunicationNodesComponent {
  public readonly breadcrumbsLabels = [
    { label: 'Главная', url: '/' },
    { label: 'Узлы связи' },
  ];

  constructor() {
  }

}
