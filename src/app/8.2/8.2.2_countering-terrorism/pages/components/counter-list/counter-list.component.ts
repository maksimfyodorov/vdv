import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { StateService } from '../../services/state.service';
import { MilitaryUnitHierarchyItem } from '../../../../../shared/components/ospo/military-units/military-units-sidebar/interfaces/interfaces';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CounterListService } from '../../services/counter-list.service';
import { LABEL } from './label-breadcrumbs';
@Component({
  selector: 'app-counter-list',
  templateUrl: './counter-list.component.html',
  styleUrls: ['./counter-list.component.scss']
})
export class CounterListComponent implements OnInit, OnDestroy {

  public items: MenuItem[];
  public home: MenuItem;
  public crumbs: MenuItem[] = [];
  public militaryItemId: string;
  private subscriptions: Subscription;

  constructor(
    public state: StateService,
    public http: CounterListService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private breadcrumb: BreadcrumbService,
  ) { }

  public ngOnInit(): void {
    this.home = {
      ...LABEL,
      queryParams: { militaryItem: this.militaryItemId }
    };
    this.subscriptions = this.breadcrumb.crumbs$
      .subscribe(crumbs => {
        this.crumbs = crumbs;
        this.cdr.detectChanges();
      });
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onSelectMilitaryUnit(militaryUnit: MilitaryUnitHierarchyItem): void {
    if (this.router.url.includes('/countering-terrorism/table')) {
      this.state.setMilitaryUnit(militaryUnit);
      this.militaryItemId = String(militaryUnit.id);
      this.home = {
        ...LABEL,
        queryParams: { militaryItem: String(militaryUnit.id) },
      };
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          militaryItem: militaryUnit.id
        }
      });
    }
  }

}
