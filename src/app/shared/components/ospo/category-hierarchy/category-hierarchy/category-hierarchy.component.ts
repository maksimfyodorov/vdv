import { filter } from 'rxjs/operators';
import { CategoryDivisionHierarchy } from './../../../../types/category-division-interface';
import { LoaderService } from './../../../loader/loader.service';
import { CategoryHierarchyService } from './../../../../services/category-hierarchy.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-category-hierarchy',
  templateUrl: './category-hierarchy.component.html',
  styleUrls: ['./category-hierarchy.component.scss'],
  providers: [CategoryHierarchyService]
})
export class CategoryHierarchyComponent implements OnInit {

  @Output() sendRequest = new EventEmitter();
  @Input() militaryUnitId: number;
  @Input() selectedUuid: string;
  public hierarchy: CategoryDivisionHierarchy[];
  public selectedFile: CategoryDivisionHierarchy[];
  constructor(
    private categoryHierarchyService: CategoryHierarchyService,
    private loader: LoaderService) { }

  ngOnInit(): void {
    this.getCategoryHierarchy(this.militaryUnitId);
  }

  public getCategoryHierarchy(id: number): void {
    this.loader.startLoading(this.categoryHierarchyService.getCategoryHierarchy(id))
    .subscribe(res => this.hierarchy = res);
}

  public updateCategory(): void {
    const selectedId = this.selectedFile.map(item => {
      return {
        division_id: item.id
      };
    });
    this.loader.startLoading(this.categoryHierarchyService.putDivision({ data: selectedId }, this.selectedUuid))
    .pipe(filter(res => !!res))
    .subscribe(_res => this.sendRequest.emit());
  }
}
