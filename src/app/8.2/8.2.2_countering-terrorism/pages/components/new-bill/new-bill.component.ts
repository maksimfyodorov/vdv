import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { StateService } from '../../services/state.service';
import { NewBillModalComponent } from './new-bill-modal/new-bill-modal.component';

@Component({
  selector: 'app-new-bill',
  templateUrl: './new-bill.component.html',
  styleUrls: ['./new-bill.component.scss']
})
export class NewBillComponent implements OnInit, OnDestroy {

  public dialog: DynamicDialogRef;
  public militaryItemId: string;
  private querySubscription: Subscription;

  constructor(
    public dialogService: DialogService,
    public state: StateService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.querySubscription = route.queryParams.subscribe(
      (queryParam: any) => {
        this.militaryItemId = queryParam['militaryItem'];
      }
    );
  }

  public ngOnInit(): void {
    this.dialog = this.dialogService.open(NewBillModalComponent, {
      header: 'Новая ведомость',
      width: '420px',
    })
    this.dialog.onClose
      .pipe(take(1))
      .subscribe(event => {
        if (!event) {
          this.router.navigate(['/countering-terrorism/table'], {
            queryParams: {
              militaryItem: this.militaryItemId,
            }
          });
        }
      })
  }

  public ngOnDestroy(): void {
    this.dialog.close();
  }

}
