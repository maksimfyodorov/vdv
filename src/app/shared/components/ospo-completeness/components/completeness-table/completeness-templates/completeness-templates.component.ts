import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-completeness-templates',
  templateUrl: './completeness-templates.component.html',
  styleUrls: ['./completeness-templates.component.scss'],
})
export class CompletenessTemplatesComponent implements OnInit {
  @ViewChild('nodeTemplate') public nodeTemplate: TemplateRef<HTMLElement>;
  @ViewChild('stateTemplate') public stateTemplate: TemplateRef<HTMLElement>;
  @ViewChild('listTemplate') public listTemplate: TemplateRef<HTMLElement>;
  @ViewChild('faceTemplate') public faceTemplate: TemplateRef<HTMLElement>;
  @ViewChild('diseaseTemplate') public diseaseTemplate: TemplateRef<HTMLElement>;
  @ViewChild('commandTemplate') public commandTemplate: TemplateRef<HTMLElement>;
  @ViewChild('emptyTemplate') public emptyTemplate: TemplateRef<HTMLElement>;
  @ViewChild('procentTemplate') public procentTemplate: TemplateRef<HTMLElement>;
  @ViewChild('controlsTemplate') public controlsTemplate: TemplateRef<HTMLElement>;

  @Output() actionEmitter = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  doAction(action): void {
    this.actionEmitter.emit(action);
  }
}
