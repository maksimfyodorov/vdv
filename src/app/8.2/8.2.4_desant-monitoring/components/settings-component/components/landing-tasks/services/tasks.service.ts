import { PutTask, PostTask } from './../../../../../types/taskInterface';
import { HttpClient } from '@angular/common/http';
import { Injectable,  } from '@angular/core';
import { Observable,  } from 'rxjs';
import { Task, TaskType } from '../../../../../types/taskInterface';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private httpClient: HttpClient) { }

  public getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>('api/landing_task/directory').pipe(pluck('data'));
  }

  public getTasksType(): Observable<TaskType[]> {
    return this.httpClient.get<TaskType[]>('api/landing_task/directory_type').pipe(pluck('data'));
  }

  public putTask(task: PutTask): Observable<unknown> {
    return this.httpClient.put(`api/landing_task/directory/${task.uuid}`, {type_uuid: task['type_uuid'],
    name: task['name'],
    code: task['code']});
  }

 public deleteTask(task: Task): Observable<unknown> {
   return this.httpClient.delete(`api/landing_task/directory/${task.uuid}`);
 }

 public submitForm(data: PostTask): Observable<unknown> {
    return this.httpClient.post<PostTask>('api/landing_task/directory', data);
  }
}

