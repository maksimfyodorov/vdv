import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { MilitaryUnitHierarchyItem } from '../../../../../../shared/components/ospo/military-units/military-units-sidebar/interfaces/interfaces';
import { GeneralInformation } from '../../../../interfaces/generalInformation';
import { AddSummary } from '../../../../interfaces/interface';
import { CounterListService } from '../../../services/counter-list.service';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-new-bill-modal',
  templateUrl: './new-bill-modal.component.html',
  styleUrls: ['./new-bill-modal.component.scss']
})
export class NewBillModalComponent implements OnInit, OnDestroy {

  public inputNumber: number;
  public date: Date;
  public militaryItemId: string;
  private militaryUnit: MilitaryUnitHierarchyItem;
  private querySubscription: Subscription;
  private subscription: Subscription[] = [];

  constructor(
    public ref: DynamicDialogRef,
    public state: StateService,
    private router: Router,
    private route: ActivatedRoute,
    private http: CounterListService,
  ) {
    this.querySubscription = route.queryParams.subscribe(
      (queryParam: any) => {
        this.militaryItemId = queryParam['militaryItem'];
      }
    );
  }

  public ngOnInit(): void {
    this.subscription.push(this.state.returnMilitaryUnit().subscribe(res => this.militaryUnit = res));
  }

  public ngOnDestroy(): void {
    this.subscription.forEach(el => el.unsubscribe())
  }

  public closeModalAndSave(): void {
    this.state.setNewBillData({
      inputNumber: this.inputNumber,
      inputDate: this.date,
    })
    this.createSummary(this.inputNumber, this.date);
    this.ref.close(this.inputNumber);
  }

  public closeModal(): void {
    this.ref.close();
  }

  public createReport(uuid: string): void {
    const body: GeneralInformation = {
      number: null,
      map: null,
      date: null,
      publication: null,
      control_point_uuid: null,
      summary_uuid: uuid,
    }
    this.http.createReport(body).subscribe(res => this.state.setReportUuid(res.uuid));
  }

  private createSummary(numberOfSummary: number, date: Date): void {
    const summary: AddSummary = {
      number: numberOfSummary,
      date: (date).toISOString(),
      military_unit_id: this.militaryUnit.id
    };
    this.http.createSummary(summary).subscribe(res => {
      this.state.changeEditDataFlag(false);
      this.createReport(res.uuid)
      this.state.setSummaryUuid(res.uuid)
      this.navigateToCreate(String(res.uuid))
    });
  }

  private navigateToCreate(numberOfSummary: string): void {
    this.router.navigate(['/countering-terrorism/create'], {
      queryParams: {
        uuid: numberOfSummary,
        militaryItem: this.militaryItemId,
      }
    });
  }
}
