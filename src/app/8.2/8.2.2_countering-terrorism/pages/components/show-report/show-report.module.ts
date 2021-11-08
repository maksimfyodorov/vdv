import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowAnnualPlanComponent } from './show-annual-plan/show-annual-plan.component';
import { ShowReportComponent } from './show-report.component';
import { ShowGeneralInformationComponent } from './show-general-information/show-general-information.component';
import { ShowCompositionComponent } from './show-composition/show-composition.component';
import { ShowSituationComponent } from './show-situation/show-situation.component';
import { ShowPreparationAntiterrorComponent } from './show-preparation-antiterror/show-preparation-antiterror.component';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { ShowTeachingComponent } from './show-teaching/show-teaching.component';
import { ShowProtectionSecurityComponent } from './show-protection-security/show-protection-security.component';
import { ShowVerificationComponent } from './show-verification/show-verification.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { ShowReportRoutingModule } from './show-report-routing.module';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    ShowReportComponent,
    ShowGeneralInformationComponent,
    ShowCompositionComponent,
    ShowSituationComponent,
    ShowPreparationAntiterrorComponent,
    ShowAnnualPlanComponent,
    ShowTeachingComponent,
    ShowProtectionSecurityComponent,
    ShowVerificationComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    ReactiveFormsModule,
    TabViewModule,
    TabMenuModule,
    ShowReportRoutingModule,
    ButtonModule,
  ],
  exports: [
    ShowReportComponent
  ]
})
export class ShowReportModule { }
