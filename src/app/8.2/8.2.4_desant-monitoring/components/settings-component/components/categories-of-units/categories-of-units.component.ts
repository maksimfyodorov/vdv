import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './service/categories.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryDivision } from '../../../../types/categories-interface';

@Component({
  selector: 'app-categories-of-units',
  templateUrl: './categories-of-units.component.html',
  styleUrls: ['./categories-of-units.component.scss'],
  providers: [CategoriesService]
})
export class CategoriesOfUnitsComponent implements OnInit {

  public categories: CategoryDivision[];
  public newCategory = false;
  public cloneCategory: { [uuid: string]: CategoryDivision; } = {};

  constructor(private categoriesService: CategoriesService) { }

  public ngOnInit(): void {
    this.getCategories();
  }

  public getNewCategory(): void {
    this.deleteNewCategory();
    this.getCategories();
  }

  public getCategories(): void {
    this.categoriesService.getCategories().subscribe(res => this.categories = res);
  }

  public addNewCategory(): void {
    this.newCategory = true;
  }

  public deleteNewCategory(): void {
    this.newCategory = false;
  }

  public onRowEditInit(category: CategoryDivision): void {
    this.cloneCategory[category.uuid] = { ...category };
  }

  public onRowEditCancel(category: CategoryDivision, index: number): void {
    this.categories[index] = this.cloneCategory[category.uuid];
    delete this.cloneCategory[category.uuid];
  }

  public onRowEditSave(category): void {
    const editedCategory = {
      uuid: category['uuid'],
      name: category['name'],
    };
    this.categoriesService.putCategory(editedCategory).subscribe(
      (data) => {
        console.log('Category edited successfully');
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  public deleteCategory(category: CategoryDivision): void {
    this.categoriesService.deleteCategory(category).subscribe(
      (data) => {
        this.getCategories();
        console.log('Task deleted successfully');
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
