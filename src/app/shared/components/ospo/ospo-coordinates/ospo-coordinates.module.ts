import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OspoCoordinatesComponent } from './components/ospo-coordinates/ospo-coordinates.component';
import { ButtonModule } from 'primeng/button';
import { UesModule } from 'ues_ui';
import { CoordinatesModule } from '../coordinates/coordinates.module';
import { OlMapInitModule } from '../../map/ol-map-init/ol-map-init.module';
import { OlApiService } from '../../../services/ol-api.service';
import { SelectionTableModule } from '../../tables/selection-table/selection-table.module';
import { ShowSignMarksComponent } from './components/show-sign-marks/show-sign-marks.component';
import { MarkDataService } from './services/mark-data.service';
import { FormCoordinatesComponent } from './components/form-coordinates/form-coordinates.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';


@NgModule({
  declarations: [
    OspoCoordinatesComponent,
    ShowSignMarksComponent,
    FormCoordinatesComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    UesModule,
    CoordinatesModule,
    OlMapInitModule,
    SelectionTableModule,
    ReactiveFormsModule,
  ],
  exports: [
    OspoCoordinatesComponent,
  ],
  providers: [
    OlApiService,
    MarkDataService,
    ApiService,
  ]
})
export class OspoCoordinatesModule { }
