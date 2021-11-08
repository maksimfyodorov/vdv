import { Component, OnInit } from '@angular/core';
import { DocumentEditComponent } from './document-edit.component';

@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentViewComponent extends DocumentEditComponent implements OnInit{
  public mode = 'view';
  public title = 'Просмотр документа';

  public ngOnInit(): void {
  }

  public downloadFiles(): void {
    window.open(`/api/documents/${this.document.uuid}/files`, '_self');
  }
}
