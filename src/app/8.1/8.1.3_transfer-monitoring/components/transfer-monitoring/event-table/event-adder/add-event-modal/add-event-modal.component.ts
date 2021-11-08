import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-event-modal',
  templateUrl: './add-event-modal.component.html',
  styleUrls: ['./add-event-modal.component.scss']
})
export class AddEventModalComponent implements OnInit {

  public addEvent: FormGroup = new FormGroup({
    name: new FormControl(''),
    time: new FormControl(''),
    normal_time: new FormControl(''),
  });

  constructor(
    private dialogRef: DynamicDialogRef,
  ) { }

  public ngOnInit(): void {
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public saveData(): void {
    this.dialogRef.close(this.addEvent.value);
  }

}
