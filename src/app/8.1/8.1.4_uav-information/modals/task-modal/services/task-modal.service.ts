import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Bpla, Division, FullTask, Operator, Task } from '../../../components/flight-plans/types/tasks';
import { HttpApiService } from '../../../services/api.service';
import { map, mergeMap, pluck, switchMap, take } from 'rxjs/operators';
import { SelectionTreeService } from '../../../components/uav-node-folder/services/selection-tree.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationDialogComponent } from '../../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { LoaderService } from '@app/shared/components/loader/loader.service';

@Injectable()
export class TaskModalService {

  constructor(
    private apiService: HttpApiService,
    private selectionTreeService: SelectionTreeService,
    private dialogService: DialogService,
    private loader: LoaderService
  ) {
  }

  public editTask(uuid: string, value: FullTask): Observable<Task> {
    return this.loader.startLoading(this.apiService.editTask(uuid, value));
  }

  public completeTask(uuid: string, formValue: FullTask): Observable<Task> {
    return this.loader.startLoading(this.editTask(uuid, formValue).pipe(
      mergeMap(_ => this.apiService.completeTask(uuid))
    ));
  }

  public createTask(form: FullTask, uuid: string): Observable<Task> {
    return combineLatest([
      of(form),
      this.selectionTreeService.selectionTreeSelectItemSubject.pipe(take(1)),
    ]).pipe(
      map(res => {
        res[0].military_unit_id = res[1].uuid;
        res[0].plan_uuid = uuid;

        return res[0];
      }),
      mergeMap(res => this.loader.startLoading(this.apiService.createTask(res)))
    );
  }

  public reportNonCompliance(uuid: string, formValue: FullTask): Observable<Task> {
    return this.loader.startLoading(this.editTask(uuid, formValue).pipe(
      mergeMap(_ => this.apiService.reportNonCompliance(uuid))
    ));
  }

  public deleteTask(uuid: string): Observable<Task> {
    return this.loader.startLoading(this.apiService.deleteTask(uuid));
  }

  public getOperators(): Observable<Operator[]> {
    return this.loader.startLoading(this.apiService.getOperators().pipe(pluck('data')))
  }

  public getUav(): Observable<Bpla[]> {
    return this.selectionTreeService.selectionTreeSelectItemSubject.pipe(
      switchMap(res => this.loader.startLoading(this.apiService.getUav(res.uuid))),
      pluck('bpla'),
      map(res => res.map(item => {
          item.vvst_sample_name = `${item.vvst_sample_name} ${item.number}`

          return item
        }))
    )
  }

  public printTask(taskUuid: string): Observable<Blob> {
    return this.apiService.printTask(taskUuid)
  }

  public getDivision(): Observable<Division[]> {
    return this.selectionTreeService.selectionTreeSelectItemSubject.pipe(
      mergeMap(res => this.loader.startLoading(this.apiService.getDivision(res)))
    )
  }

  public openConfirmDialog(config: any): Observable<boolean> {
    return this.dialogService.open(ConfirmationDialogComponent, config).onClose
  }
}
