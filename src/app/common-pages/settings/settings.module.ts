import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './pages/settings.component';
import { BreadcrumbsModule } from '../../shared/components/breadcrumbs/breadcrumbs.module';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { PeriodService } from './services/period.service';
import { LoaderDirectiveModule } from '../../shared/directives/loader/loader-directive.module';
import { DeletePeriodErrorComponent } from './components/delete-period-error/delete-period-error.component';
import { PeriodsComponent } from './components/periods/periods.component';
import { InputTextModule } from 'primeng/inputtext';
import { MilitaryUnitsSidebarModule } from '../../shared/components/ospo/military-units/military-units-sidebar/military-units-sidebar.module';


@NgModule({
  declarations: [SettingsComponent, DeletePeriodErrorComponent, PeriodsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    BreadcrumbsModule,
    InputSwitchModule,
    FormsModule,
    ButtonModule,
    InputNumberModule,
    DropdownModule,
    CalendarModule,
    LoaderDirectiveModule,
    InputTextModule,
    MilitaryUnitsSidebarModule,
    ReactiveFormsModule,
  ],
  providers: [ PeriodService ]
})
export class SettingsModule { }
