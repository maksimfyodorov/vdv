import { Component, OnInit } from '@angular/core';
import { MilitaryUnit } from './interfaces/interface';
import { MilitaryUnitsService } from './services/military-units.service';
import { LazyLoadEvent } from 'primeng/api';
import { MilitaryUnitsResponse, Mode } from './types/types';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoaderService } from '../../../loader/loader.service';

@Component({
  selector: 'app-military-units',
  templateUrl: './military-units-modal.component.html',
  styleUrls: ['./military-units-modal.component.scss'],
  providers: [MilitaryUnitsService],
})
export class MilitaryUnitsModalComponent implements OnInit {

  public mode: Mode = 'multiple';
  public militaryUnits: MilitaryUnit[];
  public totalRecords: number;
  public loading = false;
  public selectedMilitaryUnits: MilitaryUnitsResponse;

  constructor(private militaryUnitService: MilitaryUnitsService,
              private dialogRef: DynamicDialogRef,
              private dialogConfig: DynamicDialogConfig,
              public loaderService: LoaderService,) {
  }

  public ngOnInit(): void {
    this.setMode();
    this.setSelectedMilitaryUnits();
  }

  public loadMilitaryUnits(event: LazyLoadEvent): void {
    this.loaderService.startLoading(this.militaryUnitService.getMilitaryUnits(this.createParams(event)))
      .subscribe(res => {
        this.militaryUnits = res.result;
        this.totalRecords = res.count;
      });

  }

  public returnSelected(): void {
    this.dialogRef.close(this.selectedMilitaryUnits);
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  private setMode(): void {
    if (this.dialogConfig.data?.mode) {
      this.mode = this.dialogConfig.data?.mode;
    }
  }

  private setSelectedMilitaryUnits(): void {
    if (this.dialogConfig.data?.selectedMilitaryUnits) {
      this.selectedMilitaryUnits = this.dialogConfig.data.selectedMilitaryUnits;
    }
  }

  private createParams(event: LazyLoadEvent): {} {
    const params = {
      detail: true,
      list: true,
      search: event.filters.global?.value,
      offset: event.first.toString(),
      limit: event.rows.toString(),
      showDivisions: event.filters.showDivisions?.value,
      order_by: null
    };
    if (event.sortField) {
      params.order_by = `${event.sortField}:${event.sortOrder > 0 ? 'asc' : 'desc'}`;
    }
    Object.keys(params).map(key => !params[key] ? delete params[key] : null);
    return params;
  }
}
