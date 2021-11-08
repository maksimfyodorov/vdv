import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header.component';
import { FormatPipe } from './pipes/day-of-week.pipe';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CheckCombatReadinessModule } from '../../../../8.1/8.1.5_check-combat-readiness/check-combat-readiness.module';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SidebarModule } from 'primeng/sidebar';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import {AvatarModule} from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@NgModule({
  declarations: [HeaderComponent, FormatPipe, SidebarMenuComponent ],
  imports: [
    CommonModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    RouterModule,
    CheckCombatReadinessModule,
    InputSwitchModule,
    SidebarModule,
    AvatarModule,
    BadgeModule,
    ScrollPanelModule,
    OverlayPanelModule,
  ],
  exports: [HeaderComponent],
})
export class HeaderModule {
}
