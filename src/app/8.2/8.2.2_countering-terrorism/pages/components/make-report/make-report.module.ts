import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MakeReportComponent } from './make-report.component';
import { VerificationComponent } from './verification/verification.component';
import { TeachingsComponent } from './teachings/teachings.component';
import { SituationComponent } from './situation/situation.component';
import { ProtectionSecurityComponent } from './protection-security/protection-security.component';
import { PreparationAntiterrorComponent } from './preparation-antiterror/preparation-antiterror.component';
import { GeneralInformationComponent } from './general-information/general-information.component';
import { AnnualPlanComponent } from './annual-plan/annual-plan.component';
import { CompositionModule } from './composition/composition.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditableAutocompleteModule } from '../../../../../shared/components/editable-autocomplete/editable-autocomplete.module';
import { TabViewModule } from 'primeng/tabview';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MakeReportRoutingModule } from './make-report-routing.module';
import { TabMenuModule } from 'primeng/tabmenu';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MakeReportComponent,
    VerificationComponent,
    TeachingsComponent,
    SituationComponent,
    ProtectionSecurityComponent,
    PreparationAntiterrorComponent,
    GeneralInformationComponent,
    AnnualPlanComponent,
  ],
  imports: [
    CommonModule,
    CompositionModule,
    FormsModule,
    ReactiveFormsModule,
    EditableAutocompleteModule,
    TabViewModule,
    CalendarModule,
    InputTextModule,
    TabMenuModule,
    InputTextareaModule,
    InputSwitchModule,
    MakeReportRoutingModule,
    RouterModule,
  ],
  exports: [
    MakeReportComponent,
  ]
})
export class MakeReportModule { }
