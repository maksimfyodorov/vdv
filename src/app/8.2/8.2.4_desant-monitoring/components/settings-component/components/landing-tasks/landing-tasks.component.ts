import { LoaderService } from './../../../../../../shared/components/loader/loader.service';
import { TasksService } from './services/tasks.service';
import { Component, OnInit } from '@angular/core';
import { Task, TaskType } from '../../../../types/taskInterface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-landing-tasks',
  templateUrl: './landing-tasks.component.html',
  styleUrls: ['./landing-tasks.component.scss'],
  providers: [TasksService, LoaderService]
})
export class LandingTasksComponent implements OnInit {

  public tasks: Task[];
  public tasksTypes: TaskType[];
  public newTask = false;
  public cloneTasks: { [uuid: string]: Task; } = {};

  constructor(private tasksService: TasksService,   public loader: LoaderService) { }

  ngOnInit(): void {
    this.getTasks();
    this.getTaskType();
  }

  public addTask(): void {
    this.newTask = true;
  }

  public deleteNewTask(): void {
    this.newTask = false;
  }

  public onRowEditInit(task: Task): void {
    this.cloneTasks[task.uuid] = { ...task };
  }

  public onRowEditCancel(task: Task, index: number): void {
    this.tasks[index] = this.cloneTasks[task.uuid];
    delete this.cloneTasks[task.uuid];
  }

  public onRowEditSave(task: Task): void {
    const temp = {
      uuid: task['uuid'],
      type_uuid: task.type.uuid,
      name: task['name'],
      code: task['code']
    };
    if (task.type.name !== 'Прыжки') {
      const index = this.tasks.findIndex(item => item.uuid === task.uuid);
      delete this.tasks[index].code;
      delete temp.code;
    }
    this.tasksService.putTask(temp).subscribe(
      (data) => {
        console.log('Task edited successfully');
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  public getNewTask(): void {
    this.newTask = false;
    this.getTasks();
  }

  public deleteTask(task: Task): void {
    this.loader.startLoading(this.tasksService.deleteTask(task)).subscribe(
      (data) => {
        this.getTasks();
        console.log('Task deleted successfully');
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  private getTasks(): void {
    this.loader.startLoading(this.tasksService.getTasks()).subscribe(res => {
      this.tasks = res;
    }
    );
  }

  private getTaskType(): void {
    this.tasksService.getTasksType().subscribe(res => {
      this.tasksTypes = res;
    }
    );
  }
}
