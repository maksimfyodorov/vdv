import { Component } from '@angular/core';
import { AddDecisionDialogComponent } from '../add-decision-dialog/add-decision-dialog.component';

@Component({
  selector: 'app-edit-decision-dialog',
  templateUrl: '../add-decision-dialog/add-decision-dialog.component.html',
  styleUrls: ['../add-decision-dialog/add-decision-dialog.component.scss'],
})
export class EditDecisionDialogComponent extends AddDecisionDialogComponent {

  public ngOnInit(): void {
    this.decisionToEdit = this.config.data.decision;
    this.order = this.config.data.order;
    this.orderDescription = this.decisionToEdit.description;
    super.ngOnInit();
    this.fillForm();

    this.disableFormOnViewMode()
  }

  private fillForm(): void {
    this.form.patchValue(this.decisionToEdit);
    this.decisionToEdit.date && this.form.get('date').setValue(new Date(this.decisionToEdit.date));
  }

  public addDecision(): void {
    this.setFormValue();

    this.loader.startLoading(this.addDecisionDialogService.editDecision(this.order.uuid, this.decisionToEdit.uuid, this.form.value))
      .subscribe(res => {
        const editedDecision = { ...this.decisionToEdit, ...res };
        this.dialogRef.close(editedDecision);
      });
  }

  public reportOnSuccess(): void {
    this.setFormValue();
    const mode = { status: 'SUCCESS' };

    this.loader.startLoading(this.addDecisionDialogService.reportOnSuccess(this.order.uuid, this.decisionToEdit.uuid, this.form.value, mode)).subscribe(res => {
      res.status.code = 'green';
      this.dialogRef.close(res);
    });
  }

  public reportOnFailure(): void {
    this.setFormValue();
    const mode = { status: 'FAILURE' };

    this.loader.startLoading(this.addDecisionDialogService.reportOnFailure(this.order.uuid, this.decisionToEdit.uuid, this.form.value, mode)).subscribe(res => {
      res.status.code = 'red';
      this.dialogRef.close(res);
    });
  }

  private disableFormOnViewMode(): void {
    this.isViewMode = this.config.data.isViewMode;
    this.isViewMode && this.form.disable();
  }

}
