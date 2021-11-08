import { CategoriesService } from './../../service/categories.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss']
})
export class NewCategoryComponent  {

  @Output() public addedCategory: EventEmitter<boolean> = new EventEmitter<boolean>();
  public newCategoryName: string;

  constructor(private categoriesService: CategoriesService) { }

  public saveCategory(): void {
    const newCategory = {
      name: this.newCategoryName
    };
    this.categoriesService.postNewCategory(newCategory).subscribe(
      (data) => {
        this.addedCategory.emit();
        console.log('Form submitted successfully');
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
