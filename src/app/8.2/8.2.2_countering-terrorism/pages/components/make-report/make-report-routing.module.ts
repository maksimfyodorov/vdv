import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnnualPlanComponent } from './annual-plan/annual-plan.component';
import { CompositionComponent } from './composition/composition.component';
import { GeneralInformationComponent } from './general-information/general-information.component';
import { MakeReportComponent } from './make-report.component';
import { PreparationAntiterrorComponent } from './preparation-antiterror/preparation-antiterror.component';
import { ProtectionSecurityComponent } from './protection-security/protection-security.component';
import { SituationComponent } from './situation/situation.component';
import { TeachingsComponent } from './teachings/teachings.component';
import { VerificationComponent } from './verification/verification.component';



const routes: Routes =
    [
        {
            path: '', component: MakeReportComponent,
            children: [
                { path: '', pathMatch: 'full', redirectTo: 'general-information' },
                { path: 'general-information', component: GeneralInformationComponent },
                { path: 'composition', component: CompositionComponent },
                { path: 'situation', component: SituationComponent },
                { path: 'preparation-antiterror', component: PreparationAntiterrorComponent },
                { path: 'annual-plan', component: AnnualPlanComponent },
                { path: 'protection-security', component: ProtectionSecurityComponent },
                { path: 'verification', component: VerificationComponent },
                { path: 'teachings', component: TeachingsComponent },
            ]
        },
    ];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MakeReportRoutingModule { }
