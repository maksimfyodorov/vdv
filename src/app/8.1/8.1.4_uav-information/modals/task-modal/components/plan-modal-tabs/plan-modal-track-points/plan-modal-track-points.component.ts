import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormGroup } from '@angular/forms';
import { CoordinatesDialogService } from '../../../../../../../shared/components/ospo/ospo-coordinates/services/coordinates-dialog.service';
import { mergeMap, takeWhile } from 'rxjs/operators';
import { of } from 'rxjs';
import { TaskModalService } from '../../../services/task-modal.service';
import { TaskModalDynamicConfigData, TaskMode } from '../../../types/task-modal';
import { RoleModelService } from '../../../../../../../shared/services/role-model.service';

interface StatusInfo {
  [key: string]: { text: string; icon: string };
}

export const STATUS_INFO: StatusInfo = {
  passed: { text: 'Пройдена', icon: 'pi-check' },
  with_error: { text: 'С погрешностью', icon: 'pi-check' },
  not_passed: { text: 'Не пройдена', icon: 'pi-times' },
};

@Component({
  selector: 'app-plan-modal-track-points',
  templateUrl: './plan-modal-track-points.component.html',
  styleUrls: ['../plan-modal-intelligence/plan-modal-intelligence.component.scss', './plan-modal-track-points.component.scss'],
})
export class PlanModalTrackPointsComponent implements AfterViewInit {
  @Input() public form: FormGroup;
  @Input() public data: TaskModalDynamicConfigData;
  @Output() public actionEmit: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('defaultTemplate') private defaultTemplate: TemplateRef<HTMLElement>;
  @ViewChild('flightWasCompletedTemplate') private flightWasCompletedTemplate: TemplateRef<HTMLElement>;
  @ViewChild('flightWasStartTemplate') private flightWasStartTemplate: TemplateRef<HTMLElement>;
  public pointStatus: StatusInfo = STATUS_INFO;

  public trackPoints: any[] = [];

  constructor(
    public roleService: RoleModelService,
    private coordinatesService: CoordinatesDialogService,
    private changeDetectorRef: ChangeDetectorRef,
    private taskModalService: TaskModalService,
  ) {
  }

  public ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  public drop(event: CdkDragDrop<any>): void {
    moveItemInArray(this.trackPoints, event.previousIndex, event.currentIndex);
    this.setFormControlValue();
  }

  public createIndex(point: any): number {
    return this.trackPoints.findIndex(item => item === point) + 1;
  }

  public addPoint(): void {
    this.coordinatesService.openOSPOCoordinatesWithHeight().pipe(
      takeWhile(res => Boolean(res)),
    ).subscribe(res => {
      res.coordinates_uuid = res.uuid;
      delete res.uuid;
      this.trackPoints.push(res);
      this.setFormControlValue();
    });
  }

  public editPoint(point: any): void {
    this.coordinatesService.openOSPOCoordinatesWithHeight().subscribe(res => {
      this.setFormControlValue();
    });
  }

  public getTemplate(): TemplateRef<HTMLElement> {
    const templates = {
      create: this.defaultTemplate,
      new: this.defaultTemplate,
      planned: this.flightWasStartTemplate,
      completed: this.flightWasCompletedTemplate,
      not_completed: this.flightWasCompletedTemplate,
    };

    return templates[this.data.mode?.mode];
  }

  public changeStatus(point: any, status: string): void {
    if (!this.data.mode?.subordinate) {
      point.status = status;
      this.setFormControlValue();
    }
  }

  public checkTaskMode(modes: TaskMode[]): boolean {
    return modes.includes(this.data.mode?.mode);
  }

  private getFormControlValue(): { coordinates_uuid: string, index: number }[] {
    return this.trackPoints.map((item, index) => ({
      coordinates_uuid: item.coordinates_uuid,
      status_name: item.status,
      uuid: item.uuid,
      index,
    }));
  }

  protected setFormControlValue(): void {
    const trackPointControl = this.form.get('coordinates_track_points');
    trackPointControl.setValue(this.getFormControlValue());
  }

  public confirm(point: any): void {
    this.taskModalService.openConfirmDialog({
      header: 'Подтвердите удаление',
      data: {
        message: 'Вы уверены, что хотите удалить точку трассы?',
      }
    }).pipe(
      takeWhile(res => res),
      mergeMap(_ => of(this.deletePoint(point)))
    ).subscribe();
  }

  private deletePoint(point: any): void {
    this.trackPoints = this.trackPoints.filter(item => item.uuid !== point.uuid);
    this.setFormControlValue();
  }
}

@Component({
  selector: 'app-plan-modal-track-points-edit',
  templateUrl: './plan-modal-track-points.component.html',
  styleUrls: ['../plan-modal-intelligence/plan-modal-intelligence.component.scss', './plan-modal-track-points.component.scss'],
})
export class PlanModalTrackPointsEditComponent extends PlanModalTrackPointsComponent implements OnInit, AfterViewInit {
  constructor(
    roleService: RoleModelService,
    coordinatesService: CoordinatesDialogService,
    changeDetectorRef: ChangeDetectorRef,
    taskModalService: TaskModalService,
  ) {
    super(
      roleService,
      coordinatesService,
      changeDetectorRef,
      taskModalService
    );
  }

  public ngOnInit(): void {
    this.trackPoints = this.data.task.coordinates_track_points;
    this.trackPoints.sort(((a, b) => a.index - b.index));
    this.trackPoints.forEach(item => {
      item.object_geom = { coordinates: [item.x, item.y] };
    });
    this.setFormControlValue();
  }

  public ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }
}

@Component({
  selector: 'app-plan-modal-track-points-disable',
  templateUrl: './plan-modal-track-points.component.html',
  styleUrls: ['../plan-modal-intelligence/plan-modal-intelligence.component.scss', './plan-modal-track-points.component.scss'],
})
export class PlanModalTrackPointsDisableComponent extends PlanModalTrackPointsEditComponent implements OnInit, AfterViewInit {
  constructor(
    roleService: RoleModelService,
    coordinatesService: CoordinatesDialogService,
    changeDetectorRef: ChangeDetectorRef,
    taskModalService: TaskModalService,

  ) {
    super(
      roleService,
      coordinatesService,
      changeDetectorRef,
      taskModalService
    );
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.form.disable({onlySelf: true});
  }

  public ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }
}
