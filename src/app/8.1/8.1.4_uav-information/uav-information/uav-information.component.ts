import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SelectionTreeService } from '../components/uav-node-folder/services/selection-tree.service';
import { utils } from 'ues';
import { environment } from '@env/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { FLIGHT_PLANS_BREADCRUMBS, UAV_STATE_BREADCRUMBS, UAV_TABS } from '@app/8.1/8.1.4_uav-information/consts';
import { Breadcrumbs } from '@app/8.1/8.1.4_uav-information/types/common-types';
import { LoaderService } from '@app/shared/components/loader/loader.service';
import { UavSelectionHierarchy } from '@app/8.1/8.1.4_uav-information/components/uav-node-folder/types/uav-selection-hierarchy';

@Component({
             selector: 'app-uav-information',
             templateUrl: './uav-information.component.html',
             styleUrls: ['./uav-information.component.scss'],
             providers: [LoaderService],
           })
export class UavInformationComponent implements AfterViewInit, OnInit, OnDestroy {
  public breadcrumbsLabels: Breadcrumbs[];

  public militaryUnitTree: UavSelectionHierarchy[] = [];
  public tabIndex: number;
  private subscription: Subscription;
  public selectedMilitaryUnit: UavSelectionHierarchy;

  constructor(
    public selectionTreeService: SelectionTreeService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    public loader: LoaderService,
  ) {
  }

  public ngAfterViewInit(): void {
    this.createMilitaryUnitId();
    this.selectionTreeService.createHierarchy();
    this.getTree();
    this.changeDetectorRef.detectChanges();
    this.defaultNavigate();
  }

  public ngOnInit(): void {
    this.setProxyUesMapUrl();
    this.checkTabByRouting();
    this.createBreadcrumbs();
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private setProxyUesMapUrl(): void {
    utils.setProxyUrl(environment.pkrooUrl);
  }

  private getTree(): void {
    this.subscription = this.selectionTreeService.selectionTreeSubject.subscribe(res => {
      this.militaryUnitTree = res;
    });
  }

  public tabViewHandle(event: { originalEvent: MouseEvent, index: number }): void {
    const id = this.route.firstChild.snapshot.params['military_unit_id'];
    const tabData = UAV_TABS[event.index];
    this.breadcrumbsLabels = tabData.breadcrumbs;

    this.router.navigate([tabData.link, id], tabData.extras).catch();
  }

  private checkTabByRouting(): void {
    this.tabIndex = +this.router.url.includes('state_bla');
  }

  private createMilitaryUnitId(): void {
    this.selectionTreeService.militaryUnitId = this.route.children[0]?.snapshot?.params?.military_unit_id;
  }

  private defaultNavigate(): void {
    if (this.router.url === '/bpla') {
      this.selectionTreeService.selectionTreeSelectItemSubject.pipe(
        take(1),
      ).subscribe(res => this.router.navigate(['/bpla/flight_plans/military_unit/', res.uuid], { queryParams: { year: new Date().getFullYear() } }).catch());
    }
  }

  private createBreadcrumbs(): void {
    this.breadcrumbsLabels = this.router.url.includes('flight_plans') ? FLIGHT_PLANS_BREADCRUMBS : UAV_STATE_BREADCRUMBS;
  }
}
