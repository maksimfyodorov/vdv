import { LoaderService } from './../../../../../../shared/components/loader/loader.service';
import { filter } from 'rxjs/operators';
import { Period } from '../../../../../../8.1/8.1.4_uav-information/components/flight-plans/types/period';
import { JumpingStandardService } from '../../service/jumping-standard.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CategoryDivision } from '../../../../types/categories-interface';


@Component({
  selector: 'app-add-new-category',
  templateUrl: './add-new-category.component.html',
  styleUrls: ['./add-new-category.component.scss']
})
export class AddNewCategoryComponent implements OnInit {
  @Output() public cancelNewCategory: EventEmitter<string> = new EventEmitter<string>();
  @Output() public updateTable: EventEmitter<string> = new EventEmitter<string>();
  @Input() public period: Period;
  @Input() public militaryUnitId: number;
  public categories: CategoryDivision[];
  public selectedCategory: CategoryDivision;
  constructor(
    private jumpingStandardService: JumpingStandardService,
    public loader: LoaderService,
    ) { }


   public ngOnInit(): void {
    this.getCategory();
  }

  public postCategoryDivision(): void {
    const PostBody = {
      category_division_uuid: this.selectedCategory.uuid,
      period_uuid: this.period.uuid,
      military_unit_id: this.militaryUnitId
    };

    this.loader.startLoading(this.jumpingStandardService.postJumpingStandarts(PostBody))
    .pipe(filter( res => !!res ))
    .subscribe( _res => this.updateTable.emit());
  }

  public getCategory(): void {
    this.loader.startLoading(this.jumpingStandardService.getCategories()).subscribe(res => this.categories = res);
  }

  public newCategoryStatus(): void {
   this.cancelNewCategory.emit();
  }
}
