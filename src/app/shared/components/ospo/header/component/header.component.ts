import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { RoleModelService } from '../../../../services/role-model.service';
import { AuthService } from '../../../../services/auth.service';
import { AccessLevel, UserData } from '../../../../services/auth.types';
import { CurrentTimeService } from '../../../../services/current-time.service';
import { NavigationEnd, Router } from '@angular/router';
import { documentsLinksStorage } from '../documents-links-model';
import { DocumentLinks } from '../../../document-links-list/document-links-list.component';
import { DocumentLinksListDialogComponent } from '../../../document-links-list/document-links-list-dialog/document-links-list-dialog.component';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TaskUrlService } from '../../../../../common-pages/task/sevices/task-url.service';
import { UserPermissionDialogComponent } from '../../../user-permission-dialog/user-permission-dialog.component';
import { DatabaseModeService } from '../../../../services/database-mode.service';
import { filter, map } from 'rxjs/operators';
import { SubscriptionLike } from 'rxjs';
import { allCategories } from '../../../../../common-pages/task/infrastucture/allCategories';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [ConfirmationService, MessageService, DialogService, DynamicDialogRef, DynamicDialogConfig],
})
export class HeaderComponent implements OnInit, DoCheck, OnDestroy {

  set isTestDatabaseMode(value: boolean) {
    this.databaseModeService.mode = value ? 'test' : 'production';
  }

  get isTestDatabaseMode(): boolean {
    return this.databaseModeService.mode === 'test';
  }

  public isSidebarDisplayed = false;
  public currentUser: UserData;
  public currentAccessLevel: AccessLevel;
  public currentAcceptLevelText: string;
  public currentPageTitle: string;
  public currentDocumentLinks: DocumentLinks[];
  public currentRole: string;
  public currentPageUrl: string;
  currentMenuPageUrl: string;
  documentLinks = [{
    link: 'https://fs.rd.aorti.ru/s/9YpZG6f7dy4BckT/download?path=%2F&files=8_2_29_%D0%A0%D0%B5%D0%B3%D0%BB%D0%B0%D0%BC%D0%B5%D0%BD%D1%82%20%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%8B%20%D0%94%D0%9B%20%D0%BF%D0%BE%20%D0%B0%D0%BA%D1%82%D1%83%D0%B0%D0%BB%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D0%B8%20%D0%B8%D0%BD%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%BD%D1%8B%D1%85%20%D0%BC%D0%B0%D1%81%D1%81%D0%B8%D0%B2%D0%BE%D0%B2.fodt',
    name: 'Регламент работы ДЛ по актуализации информационных массивов.fodt',
  }];
  private subCurrentUrl: SubscriptionLike;
  private lastPageUrl: string;

  constructor(private roleService: RoleModelService,
              private authService: AuthService,
              private router: Router,
              private dialogService: DialogService,
              private databaseModeService: DatabaseModeService,
              public dialogRef: DynamicDialogRef,
              public config: DynamicDialogConfig,
              public currentTime: CurrentTimeService,
              public taskUrl: TaskUrlService,
  ) {
  }

  public ngOnInit(): void {
    this.currentPageUrl = this.router.url;
    this.lastPageUrl = this.currentPageUrl;
    this.subscribeToAuth();
    this.getCurrentAcceptLevel();
    this.currentRole = this.roleService.userPermissions$.value?.[0];
    this.subscribeToCurrentUrl();
  }

  public ngDoCheck(): void {
    this.currentPageUrl = this.router.url;
    this.checkCurrentPageDocument();
  }

  public ngOnDestroy(): void {
    this.subCurrentUrl.unsubscribe();
  }

  public openListDialog(): void {
    this.dialogService.open(DocumentLinksListDialogComponent, {
      header: 'Список документов',
      width: '480px',
      data: { documentsLinks: this.documentLinks },
    });
  }

  public openPermissionDialog(): void {
    this.dialogService.open(UserPermissionDialogComponent, {
      header: 'Права пользователя',
      width: '1000px',
    });
  }

  public getCurrentAcceptLevel(): void {
    switch (this.roleService.userAccessLevel$.value) {
      case 'command': {
        this.currentAccessLevel = 'command';
        this.currentAcceptLevelText = 'ЦУ командования';
        break;
      }
      case 'conjunction': {
        this.currentAccessLevel = 'conjunction';
        this.currentAcceptLevelText = 'ПУ соединения';
        break;
      }
      case 'regiment': {
        this.currentAccessLevel = 'regiment';
        this.currentAcceptLevelText = 'ПУ полка';
        break;
      }
    }
  }

  public displaySidebar(): void {
    this.isSidebarDisplayed = true;
  }

  public closeSidebar(event, sidebar): void {
    sidebar.close(event);
  }

  private subscribeToAuth(): void {
    this.authService.currentUser$.subscribe((res: UserData) => {
      this.currentUser = res;
    });
  }

  private checkCurrentPageDocument(): void {
    if (this.currentPageUrl !== this.lastPageUrl) {
      this.lastPageUrl = this.currentPageUrl;
      for (let i = 0; i < documentsLinksStorage.length; i++) {
        if (this.currentPageUrl === documentsLinksStorage[i].pageUrl) {
          this.currentDocumentLinks = documentsLinksStorage[i].documentsLinks;
          break;
        } else {
          this.currentDocumentLinks = null;
        }
      }
    }
  }

  private setCurrentPageTitle(url: string): void {
    let titleCandidate: string;
    allCategories.forEach(item => {
      const currentTab = item.tasks.find(task => task.routerLink === url.slice(1));
      if (currentTab) {
        titleCandidate = currentTab.title;
      }
    });
    this.currentPageTitle = titleCandidate || 'Главная';
  }

  private subscribeToCurrentUrl(): void {
    this.subCurrentUrl = this.router.events.pipe(filter(res => res instanceof NavigationEnd), map<NavigationEnd, any>(res => res.url))
      .subscribe(res => this.setCurrentPageTitle(res));
  }
}
