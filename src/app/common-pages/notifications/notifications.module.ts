import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './page/notifications.component';
import { BreadcrumbsModule } from '../../shared/components/breadcrumbs/breadcrumbs.module';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { MilitaryUnitsSidebarModule } from '../../shared/components/ospo/military-units/military-units-sidebar/military-units-sidebar.module';
import { TabViewModule } from 'primeng/tabview';
import { NotificationJournalComponent } from './tabs/notification-journal/notification-journal.component';
import { NotificationSettingsComponent } from './tabs/notification-settings/notification-settings.component';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { VirtualScrollerModule } from 'primeng/virtualscroller';


import { LoaderDirectiveModule } from '../../shared/directives/loader/loader-directive.module';
import { CheckboxModule } from 'primeng/checkbox';
import { TabMenuModule } from 'primeng/tabmenu';

@NgModule({
  declarations: [NotificationsComponent, NotificationJournalComponent, NotificationSettingsComponent],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    BreadcrumbsModule,
    MilitaryUnitsSidebarModule,
    TabViewModule,
    InputTextModule,
    TableModule,
    CheckboxModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    VirtualScrollerModule,
    TabMenuModule,
    LoaderDirectiveModule,
    ReactiveFormsModule,
  ],
})
export class NotificationsModule { }
