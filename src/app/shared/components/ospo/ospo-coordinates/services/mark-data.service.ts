import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mark, MarkBackend } from '../types/mark';
import { ApiService } from './api.service';
import { MarkType } from '../types/mark-type';

@Injectable()
export class MarkDataService {

  private marks$: BehaviorSubject<Mark[]> = new BehaviorSubject<Mark[]>([]);
  public markTypes$: BehaviorSubject<MarkType[]> = new BehaviorSubject<MarkType[]>([]);
  private selectedMark$: BehaviorSubject<Mark> = new BehaviorSubject<Mark>(null);

  public get marks(): Observable<Mark[]> {
    return this.marks$.asObservable();
  }

  constructor(
    private api: ApiService,
  ) { }

  public init(): any {
    this.api.getMarks().pipe(
      map(res => res.result),
    ).subscribe(res => {
      const marks: Mark[] = this.mapperMark(res);
      this.marks$.next(marks);
    });

    this.api.getTypes().pipe(
      map(res => res.data)
    ).subscribe(res => this.markTypes$.next(res));
  }

  public update(): any {
    this.init();
  }

  private mapperMark(marks: MarkBackend[]): Mark[] {
    return marks.map(mark => {
      return {
        name: mark.mark,
        object_geom: {
          coordinates: mark.object_geom?.coordinates,
          type: 'Point',
        },
        height: mark.height,
        actions: [
          // Todo: реализовать редактирование позже
          // {
          //   icon: 'pi pi-pencil',
          //   background: 'transparent',
          //   emit: 'edit',
          //   size: '12px',
          //   color: '#959EA9',
          // },
          {
            icon: 'pi pi-trash',
            background: 'transparent',
            emit: 'delete',
            size: '12px',
            color: '#252B34',
          }],
        uuid: mark.uuid,
      };
    });
  }

  public getSelectedMark(): Observable<Mark> {
    return this.selectedMark$.asObservable();
  }

  public setSelectedMark(mark: Mark): void {
    this.selectedMark$.next(mark);
  }
}
