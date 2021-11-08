import { Component, Input, OnInit } from '@angular/core';

import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DocumentLinksListDialogComponent } from './document-links-list-dialog/document-links-list-dialog.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RoleModelService } from '../../services/role-model.service';
import { AccessLevel } from '../../services/auth.types';

export interface DocumentLinks{
  link: string;
  name: string;
}

@Component({
  selector: 'app-document-links-dialog',
  templateUrl: './document-links-list.component.html',
  styleUrls: ['./document-links-list.component.scss'],
  providers: [ConfirmationService, MessageService, DialogService, DynamicDialogRef, DynamicDialogConfig],
})
export class DocumentLinksListComponent implements OnInit {

  @Input() links: [DocumentLinks];
  public currentAccessLevel: AccessLevel;

  constructor(
    private dialogService: DialogService,
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private roleModelService: RoleModelService,
  ) {
  }

  ngOnInit(): void {
    this.roleModelService.userAccessLevel$.subscribe(res => {
      this.currentAccessLevel = res;
    });
  }

  openListDialog(): void {
    this.dialogService.open(DocumentLinksListDialogComponent, {
      header: 'Список документов',
      width: '480px',
      data: {documentsLinks: this.links},
    });
  }

}
