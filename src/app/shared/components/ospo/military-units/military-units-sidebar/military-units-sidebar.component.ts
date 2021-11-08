import {
  Component,
  EventEmitter, HostBinding, Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MilitaryUnitHierarchyItem } from './interfaces/interfaces';
import { MilitaryUnitsSidebarService } from './services/military-units-sidebar.service';
import { HierarchyService } from './services/hierarchy.service';
import { Subscription, SubscriptionLike } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { LoaderService } from '../../../loader/loader.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-military-units-sidebar',
  templateUrl: './military-units-sidebar.component.html',
  styleUrls: ['./military-units-sidebar.component.scss'],
  providers: [MilitaryUnitsSidebarService],
})
export class MilitaryUnitsSidebarComponent implements OnInit, OnDestroy {
  @Input() showDivisionsSwitch: boolean;
  @Output() selectMilitaryUnitChanged: EventEmitter<MilitaryUnitHierarchyItem> = new EventEmitter<MilitaryUnitHierarchyItem>();
  public militaryUnitsHierarchy: MilitaryUnitHierarchyItem[];
  private subHierarchy: SubscriptionLike;

  public id: any;
  private querySubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private militaryUnitService: MilitaryUnitsSidebarService,
    public hierarchy: HierarchyService,
    public loaderService: LoaderService
  ) { }

  public ngOnInit(): void {
    this.getHierarchy();
    this.subscribeToHierarchy();
  }

  public ngOnDestroy(): void {
    this.subHierarchy.unsubscribe();
  }

  public onToggleDisplayDivision(status: boolean): void {
    const isShowDivisionsParam = new HttpParams().set('showDivisions', `${status}`);
    this.getHierarchy(isShowDivisionsParam);
  }

  @HostBinding('style.width') hostWidth;

  public onSidebarExpand(status: boolean): void {
    status ? this.hostWidth = 'fit-content' : this.hostWidth = '65px';
  }

  private subscribeToHierarchy(): void {
    this.subHierarchy = this.hierarchy.selectedItem$.subscribe(res => this.selectMilitaryUnitChanged.emit(res));
  }


  private getHierarchy(params?: HttpParams): void {
    this.loaderService.startLoading(this.militaryUnitService.getMilitaryUnitsHierarchy(params)).subscribe(res => {
      this.militaryUnitsHierarchy = res
      this.selectByUrl();
    });
  }

  private selectByUrl() {
    this.querySubscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        this.id = queryParam['militaryItem'];
      }
    );
    if (this.id) {
      this.militaryUnitsHierarchy.forEach(item => {
        if (item.id === Number(this.id)) {
          this.hierarchy.selectedItem$.next(item);
        }
        else if (item.children.length) {
          this.selectChild(this.id, item.children);
        }
      })
    }
  }

  private selectChild(id: string, data: MilitaryUnitHierarchyItem[]) {
    data.forEach(item => {
      if (item.id == Number(id)) {
        this.hierarchy.selectedItem$.next(item);
      }
      else if (item.children.length) {
        this.selectChild(id, item.children);
      }
    })
  }

}
