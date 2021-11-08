import { Component, OnInit, Self } from '@angular/core';
import { LoaderService } from '../../../../loader/loader.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LazyLoadEvent } from 'primeng/api';
import { ExecutiveService } from '../services/executive.service';
import { Executive } from '../../../interfaces';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-executive',
  templateUrl: './executive.component.html',
  styleUrls: ['./executive.component.scss'],
  providers: [LoaderService],
})
export class ExecutiveComponent implements OnInit {

  public militaries: Executive[];
  public selectedMilitaries: Executive[];
  public totalRecords: number;
  public selectionMode: string;
  public rankCategoryName: string;

  constructor(
    @Self() public loader: LoaderService,
    private ref: DynamicDialogRef,
    private dynamicDialogConfig: DynamicDialogConfig,
    private executiveService: ExecutiveService,
  ) {
  }

  public ngOnInit(): void {
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
      .startLoading(this.executiveService.getShdk(this.createHttpParams(event)))
      .subscribe((res) => {
        this.militaries = res.result;
        this.totalRecords = res.count;
      });
  }

  private setSelectedMilitaries(): void {
    this.selectionMode = this.dynamicDialogConfig.data.mode;
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
    ];
    params.forEach((param) => {
      if (param.value) {
        httpParams = httpParams.append(param.name, param.value);
      }
    });
    return httpParams;
  }
}
