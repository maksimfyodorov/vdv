import { PostTask } from './../../../../../../types/taskInterface';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { TaskType } from '../../../../../../types/taskInterface';
import { LoaderService } from '../../../../../../../../shared/components/loader/loader.service';
@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})

export class NewTaskComponent implements OnInit {
  @Output() public addNewTask: EventEmitter<string> = new EventEmitter<string>();

  public taskForm: FormGroup = this.getTaskForm();
  public tasksTypes: TaskType[];
  public selectedType: TaskType;
  public postBody: PostTask;

  constructor(private tasksService: TasksService, public loader: LoaderService) { }

  ngOnInit(): void {
    this.getTaskType();
    this.taskForm = this.getTaskForm();
  }

  public onSubmit(): void {
    const type_name = this.taskForm.value.type.name;
    if (type_name !== 'Прыжки') {
      this.postBody = {
        type_uuid: this.taskForm.controls.type.value.uuid,
        name: this.taskForm.controls.name.value,
      };
    } else {
      this.postBody = {
        type_uuid: this.taskForm.controls.type.value.uuid,
        name: this.taskForm.controls.name.value,
        code: this.taskForm.controls.code.value
      };
    }
    this.loader.startLoading(this.tasksService.submitForm(this.postBody))
      .subscribe(
        (data) => {
          this.addNewTask.emit();
          console.log('Form submitted successfully');
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  public onChange(): void {
    this.selectedType = this.taskForm.controls.type.value;
  }

  private getTaskType(): void {
    this.loader.startLoading(this.tasksService.getTasksType()).subscribe(res => {
      this.tasksTypes = res;
    });
  }

  private getTaskForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required)
    });
  }
}
