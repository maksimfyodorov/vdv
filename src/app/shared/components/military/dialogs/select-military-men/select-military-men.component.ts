import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SelectMilitaryMenService } from './services/select-military-men.service';
import { LazyLoadEvent } from 'primeng/api';
import { HttpParams } from '@angular/common/http';
import { LoaderService } from '../../../loader/loader.service';
import { MilitaryMan } from './services/select-military-dialog.types';

@Component({
  selector: 'app-add-team-member',
  templateUrl: './select-military-men.component.html',
  styleUrls: ['./select-military-men.component.scss'],
  providers: [SelectMilitaryMenService, LoaderService],
})
export class SelectMilitaryMenComponent implements OnInit {
  public militaries: MilitaryMan[] = [];
  public selectedMilitaries: MilitaryMan[];
  public singleModePerson: MilitaryMan;
  public totalRecords: number;
  public selectionMode: string;
  public rankCategoryName: string;
  private inputDivisionID: number;

  constructor(
    public loader: LoaderService,
    private selectMilitaryMenService: SelectMilitaryMenService,
    private ref: DynamicDialogRef,
    private dynamicDialogConfig: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.setSelectedMilitaries();
  }

  public addTeamMembers(): void {
    this.ref.close(this.selectedMilitaries);
  }

  public closeTeamMembers(): void {
    this.ref.close();
  }

  public loadMilitaries(event: LazyLoadEvent): void {
    this.loader
      .startLoading(this.selectMilitaryMenService.getMilitaries(this.createHttpParams(event)))
      .subscribe((res) => {
        this.militaries = res.result;
        this.totalRecords = res.count;
      });
  }

  private setSelectedMilitaries(): void {
    this.inputDivisionID = this.dynamicDialogConfig.data?.divisionId;
    this.selectionMode = this.dynamicDialogConfig.data.mode;
    this.rankCategoryName = this.dynamicDialogConfig.data?.rankCategory?.name;
    this.selectionMode = this.dynamicDialogConfig.data?.mode;
    this.rankCategoryName = this.dynamicDialogConfig.data?.rankCategory?.name;
    if (this.dynamicDialogConfig?.data.selectedPerson) {
      this.selectedMilitaries = this.dynamicDialogConfig.data.selectedPerson;
    }
  }

  private createHttpParams(event: LazyLoadEvent): HttpParams {
    let httpParams = new HttpParams();
    const params = [
      { name: 'search', value: event.filters.global?.value },
      { name: 'sortOrder', value: event.sortOrder.toString() },
      { name: 'sortField', value: event.sortField },
      { name: 'first', value: event.first.toString() },
      { name: 'rows', value: event.rows.toString() },
      { name: 'category', value: this.rankCategoryName },
      { name: 'division_id', value: this.dynamicDialogConfig.data?.divisionId?.toString()},
    ];
    params.forEach((param) => {
      if (param.value) {
        httpParams = httpParams.append(param.name, param.value);
      }
    });
    return httpParams;
  }
}
