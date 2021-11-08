import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TheCompositionOfTheForcesAndMeansOfPdtRoutingModule } from './the-composition-of-the-forces-and-means-of-pdt-routing.module';
import { TheCompositionOfTheForcesAndMeansOfPdtComponent } from './the-composition-of-the-forces-and-means-of-pdt.component';
import { InformingDialogComponent } from './informing-dialog/informing-dialog.component';
import { MilitoryTownDialogComponent } from './militory-town-dialog/militory-town-dialog.component';
import { DokiDialogComponent } from './doki-dialog/doki-dialog.component';
import { CreateEditInformingDialogComponent } from './create-edit-informing-dialog/create-edit-informing-dialog.component';
import { ReportBackDialogComponent } from './report-back-dialog/report-back-dialog.component';
import { CheckCombatReadinessModule } from '../../8.1/8.1.5_check-combat-readiness/check-combat-readiness.module';

import { DialogModule } from 'primeng/dialog';
import { TabMenuModule } from 'primeng/tabmenu';
import { DocumentsFormalizedModule } from '../../shared/components/ospo/documents-formalized/documents-formalized.module';

@NgModule({
  declarations: [TheCompositionOfTheForcesAndMeansOfPdtComponent],
  imports: [CommonModule, TheCompositionOfTheForcesAndMeansOfPdtRoutingModule, DialogModule, TabMenuModule, CheckCombatReadinessModule, DocumentsFormalizedModule],
})
export class TheCompositionOfTheForcesAndMeansOfPdtModule {
}
