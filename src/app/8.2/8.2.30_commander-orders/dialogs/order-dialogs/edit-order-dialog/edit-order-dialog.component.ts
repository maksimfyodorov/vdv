import { Component } from '@angular/core';
import { AddOrderDialogComponent } from '../add-order-dialog/add-order-dialog.component';
import { FormArray } from '@angular/forms';
import { LoaderService } from '../../../../../shared/components/loader/loader.service';
import { AddOrderDialogService } from '../../../services/add-order-dialog.service';

@Component({
  selector: 'app-edit-order-dialog',
  templateUrl: '../add-order-dialog/add-order-dialog.component.html',
  styleUrls: ['../add-order-dialog/add-order-dialog.component.scss'],
  providers: [AddOrderDialogService, LoaderService],
})
export class EditOrderDialogComponent extends AddOrderDialogComponent {

  public ngOnInit(): void {
    this.orderToEdit = this.config.data.order;
    this.isViewMode = this.config.data.isViewMode;
    super.ngOnInit();
    this.fillForm();
    this.editedCustomer = this.orderToEdit.customer;

    this.disableFormOnViewMode();
  }

  private fillForm(): void {
    this.form.patchValue(this.orderToEdit);
    this.form.get('customer_uuid').setValue(this.orderToEdit.customer);
    this.orderToEdit.date_of_receipt && this.form.get('date_of_receipt').setValue(new Date(this.orderToEdit.date_of_receipt));
    this.orderToEdit.term_of_execution && this.form.get('term_of_execution').setValue(new Date(this.orderToEdit.term_of_execution));
    this.form.get('executor').setValue({
      shdk_uuid: {
        shdk_uuid: this.orderToEdit.executor.shdk.uuid,
        military_man: `${this.orderToEdit.executor.shdk.rank.name} ${this.orderToEdit.executor.shdk.military_man.name.substr(0, 1)}.${this.orderToEdit.executor.shdk.military_man.surname}`,
        appointment: this.orderToEdit.executor.shdk.appointment.name,
      },
      military_unit_id: this.orderToEdit.executor.military_unit.id,
    });
    this.fillCoExecutorsSection();
  }

  private fillCoExecutorsSection(): void {
    this.coExecutors = this.form.get('co_executors') as FormArray;
    for (let i = 0; i < this.orderToEdit.co_executors.length - 1; i++) {
      this.coExecutors.push(this.createCoExecutor());
    }

    this.orderToEdit.co_executors.forEach(item => {
      item.military_unit_id = item.military_unit && item.military_unit?.id;
      if (item.shdk) {
        item.shdk_uuid = {
          shdk_uuid: item.shdk?.uuid,
          military_man: `${item.shdk.rank.name} ${item.shdk.military_man.name.substr(0, 1)}.${item.shdk.military_man.surname}`,
          appointment: item.shdk?.appointment.name,
        };
      }
    });
    this.form.get('co_executors').patchValue(this.orderToEdit.co_executors);
  }

  public editOrder(): void {
    this.setFormValue();

    this.loader.startLoading(this.addOrderDialogService.editOrder(this.orderToEdit.uuid, this.form.value))
      .subscribe(res => {
        this.dialogRef.close(res);
      });
  }

  public makeReport(): void {
    this.setFormValue();

    this.loader.startLoading(this.addOrderDialogService.makeReport(this.orderToEdit.uuid, this.form.value))
      .subscribe(res => {
        this.dialogRef.close(res);
      });
  }

  private disableFormOnViewMode(): void {
    this.isViewMode && this.form.disable();
  }

}
