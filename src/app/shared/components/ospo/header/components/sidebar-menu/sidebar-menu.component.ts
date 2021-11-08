import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoriesMode, Link } from './interfaces';
import { OSPOS, PAGES } from './constants';
import { DialogService } from 'primeng/dynamicdialog';
import { AttachDocumentDialogComponent } from '../../../documents/attach-document-dialog/attach-document-dialog.component';
import { allCategories } from '../../../../../../common-pages/task/infrastucture/allCategories';
import { log } from 'util';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
})
export class SidebarMenuComponent implements OnInit {

  @Input() categoriesMode: CategoriesMode = 'all';
  @Input() currentPageTitle: string;
  @Output() closeSidebar: EventEmitter<null> = new EventEmitter<null>();
  public pages: Link[];
  public modalsExecutor = {
    openDocuments: () => this.openDocuments(),
  };
  public ospos: Link[];

  constructor(private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.pages = this.setPages();
    this.ospos = OSPOS;
  }

  public expandSidebar(event): void {
    this.closeSidebar.emit(event);
  }

  public openModal(modal: string): void {
    this.modalsExecutor[modal]();
  }

  private openDocuments(): void {
    this.dialogService.open(AttachDocumentDialogComponent, {
      header: 'Документы',
      data: {
        showControls: false,
      },
    });
  }

  private setPages(): Link[] {
    const res = PAGES;
    switch (this.categoriesMode) {
      case 'all':
        allCategories.forEach(item => res.push(...item.tasks));
        break;
      case 'daily':
        res.push(...allCategories.find(item => item.header === 'Задачи повседневной деятельности').tasks);
        break;
      case 'combat':
        res.push(...allCategories.find(item => item.header === 'Задачи боевого управления').tasks);
        break;
    }
    return res as Link[];
  }
}
