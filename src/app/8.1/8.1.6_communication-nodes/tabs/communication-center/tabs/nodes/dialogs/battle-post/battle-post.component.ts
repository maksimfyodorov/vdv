import { ChangeDetectorRef, Component } from '@angular/core';
import { CoordinatesDialogService } from '../../../../../../../../shared/components/ospo/ospo-coordinates/services/coordinates-dialog.service';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { USCenterComponent } from '../us-center/us-center.component';
import { CommunicationNodesService } from '../../../../services/communication-nodes.service';
import { BattlePost, BattlePostSelectors, CommunicationCenter, CommunicationNode } from '../../../../types/nodes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { mobileModeValidator } from './mobile-mode.validator';
import { mergeMap } from 'rxjs/operators';
import { LoaderService } from '../../../../../../../../shared/components/loader/loader.service';
import { ACCESS_LEVELS } from '../../../../../../../../shared/components/ospo/military-units/military-units-dropdown/interfaces';

@Component({
  selector: 'app-add-battle-post',
  templateUrl: './battle-post.component.html',
  styleUrls: ['./battle-post.component.scss'],
  providers: [LoaderService],
})
export class BattlePostComponent {
  public mappedCenters: CommunicationCenter[];
  public form: FormGroup;
  public node: BattlePost & CommunicationNode;
  public selectors: BattlePostSelectors;
  public isMobile = false;
  public availableAccessLevel = ACCESS_LEVELS.department;
  public divisionsToShow;

  private set centers(value: CommunicationCenter[]) {
   this.mappedCenters = value.map(center => {
     return {
       ...center,
       name: center.number + ' ' + center.center_type.name,
     };
   });
  }


  constructor(
    public config: DynamicDialogConfig,
    public loader: LoaderService,
    private dialogRef: DynamicDialogRef,
    private dialogService: DialogService,
    private coordinatesDialog: CoordinatesDialogService,
    private nodesService: CommunicationNodesService,
    private detection: ChangeDetectorRef,
  ) {
    this.node = this.config.data.node;
    this.divisionsToShow = this.config.data.military_unit.id;
    this.createForm();
    this.getData();
  }

  public save(): void {
    this.dialogRef.close(this.createObjForBackEnd());
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public openAddCoordinate(): void {
    this.coordinatesDialog.openOSPOCoordinatesWithoutHeight()
      .subscribe(res => {
        const coordinate = {
          mark: res.name,
          uuid: res.uuid,
          x: res.object_geom.coordinates[0],
          y: res.object_geom.coordinates[1],
        };
        this.form.get('coordinate').setValue(coordinate);
      });
  }

  public addUsCenter(): void {
    this.dialogService.open(USCenterComponent, {
      header: 'Добавление центров УС',
      data: {
        centers: this.centers,
        node_uuid: this.config.data.communication_node_uuid,
        types: this.selectors.center_types,
        military_unit_id: this.config.data.military_unit.id,
      }
    }).onClose
      .pipe(mergeMap(
          res => this.loader.startLoading(
            this.nodesService.getCommunicationCenters(this.config.data.communication_node_uuid)
          ))).subscribe(res => this.centers = res);
  }

  public getCoordinatesValue(): string {
    const coordinates = this.form.get('coordinate').value;
    if (coordinates?.mark) {
      return coordinates.mark;
    }
    if (coordinates?.x && coordinates?.y) {
      return coordinates.x + ', ' + coordinates.y;
    }
    return 'Выберите метку';
  }

  private createForm(): void {
    this.form = new FormGroup({
      center: new FormControl(null),
      division: new FormControl(null),
      number: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      kind: new FormControl(null, Validators.required),
      coordinate: new FormControl(null),
      deployment_time: new FormControl(null, Validators.required),
    }, {validators: mobileModeValidator});
    this.subscribeToKindChange();
    this.subscribeToCenterChange();
  }


  private subscribeToCenterChange(): void {
    this.form.get('center').valueChanges.subscribe((res: CommunicationCenter) => {
      if (res.division) {
       this.divisionsToShow = res.division.id;
      }
    });
  }

  private subscribeToKindChange(): void {
    this.form.get('kind').valueChanges.subscribe(res => {
      if (res.name === 'Мобильный') {
        this.isMobile = true;
      }
      if (res.name === 'Стационарный') {
        this.isMobile = false;
      }
      this.detection.detectChanges();
    });
  }

  private getData(): void {
    this.selectors = this.nodesService.selectors;
    this.loader.startLoading(forkJoin({
      centers: this.nodesService.getCommunicationCenters(this.config.data.communication_node_uuid),
    })).subscribe(res => {
      this.centers = res.centers;
      this.determineFormState();
    });
  }

  private determineFormState(): void {
    if (this.node.point === 'bp') {
      this.fillForm();
    }
  }


  private fillForm(): void {
    this.form.patchValue({
      center: this.mappedCenters.find(cent => cent.uuid === this.node.center?.uuid),
      division: this.node.division,
      number: this.node.number,
      type: this.selectors.battle_post_types.find(type => type.uuid === this.node.type.uuid),
      kind: this.selectors.battle_post_kinds.find(kind => kind.uuid === this.node.kind.uuid),
      coordinate: this.node.coordinate,
      deployment_time: this.node.deployment_time,
    });
  }

  private createObjForBackEnd(): any {
    const formValue = this.form.value;
    return {
      number: formValue.number,
      deployment_time: formValue.deployment_time,
      type: formValue.type,
      kind: formValue.kind,
      coordinate: formValue.coordinate,
      division: formValue.division ? {id: formValue.division?.id, label: formValue.division?.label} : null,
      center: formValue.center ? {uuid: formValue.center?.uuid} : null,
    };
  }
}


