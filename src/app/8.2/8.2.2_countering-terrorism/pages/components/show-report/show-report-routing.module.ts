import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowAnnualPlanComponent } from './show-annual-plan/show-annual-plan.component';
import { ShowCompositionComponent } from './show-composition/show-composition.component';
import { ShowGeneralInformationComponent } from './show-general-information/show-general-information.component';
import { ShowPreparationAntiterrorComponent } from './show-preparation-antiterror/show-preparation-antiterror.component';
import { ShowProtectionSecurityComponent } from './show-protection-security/show-protection-security.component';
import { ShowReportComponent } from './show-report.component';
import { ShowSituationComponent } from './show-situation/show-situation.component';
import { ShowTeachingComponent } from './show-teaching/show-teaching.component';
import { ShowVerificationComponent } from './show-verification/show-verification.component';

const routes: Routes =
    [
        {
            path: '', component: ShowReportComponent,
            children: [
                { path: '', pathMatch: 'full', redirectTo: 'general-information' },
                { path: 'general-information', component: ShowGeneralInformationComponent },
                { path: 'composition', component: ShowCompositionComponent },
                { path: 'situation', component: ShowSituationComponent },
                { path: 'preparation-antiterror', component: ShowPreparationAntiterrorComponent },
                { path: 'annual-plan', component: ShowAnnualPlanComponent },
                { path: 'protection-security', component: ShowProtectionSecurityComponent },
                { path: 'verification', component: ShowVerificationComponent },
                { path: 'teachings', component: ShowTeachingComponent },
            ]
        },
    ];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShowReportRoutingModule { }
