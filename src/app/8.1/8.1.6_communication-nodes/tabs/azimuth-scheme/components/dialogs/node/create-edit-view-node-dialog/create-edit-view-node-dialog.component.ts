import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NodesSchemeService } from '../../../nodes-scheme/services/nodes-scheme.service';
import { SubscriptionLike } from 'rxjs';
import { AccessLevel, ConnectionType, Mode, Node, NodeKind, NodeType } from '../../../nodes-scheme/nodes.scheme.types';
import { LoaderService } from '../../../../../../../../shared/components/loader/loader.service';
import { ConfirmationDialogComponent } from '../../../../../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { takeWhile } from 'rxjs/operators';
import { NodesHierarchyService } from '../../../nodes-scheme/services/nodes-hierarchy.service';
import { OspoCoordinatesComponent } from '../../../../../../../../shared/components/ospo/ospo-coordinates/components/ospo-coordinates/ospo-coordinates.component';
import { COLS_WITHOUT_HEIGHT } from '../../../../../../../../shared/components/ospo/ospo-coordinates/infrastucture/table-cols';
import { ACCESS_LEVELS } from '../../../../../../../../shared/components/ospo/military-units/military-units-dropdown/interfaces';


@Component({
  selector: 'app-create-edit-view-node-dialog',
  templateUrl: './create-edit-view-node-dialog.component.html',
  styleUrls: ['./create-edit-view-node-dialog.component.scss'],
  providers: [LoaderService],
})
export class CreateEditViewNodeDialogComponent implements OnInit, OnDestroy {

  public nodeForm: FormGroup;
  public isMobile: boolean;
  public mode: Mode = 'create';
  public connectionTypes: ConnectionType[];
  public nodeTypes: NodeType[];
  public nodeKinds: NodeKind[];
  public coordinate: any;
  public node: Node;
  public showDivisionsOf: number;
  public acceptedDivisions = ACCESS_LEVELS.battalion;
  private nodeKindSubscription: SubscriptionLike;
  private militaryUnitSubscription: SubscriptionLike;

  constructor(
    public loader: LoaderService,
    public nodeService: NodesSchemeService,
    private dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private hierarchy: NodesHierarchyService,
    private dialogService: DialogService,
  ) {
  }

  public ngOnInit(): void {
    this.createNodeForm();
    this.setNode();
    this.getData();
    this.subscribeToNodeKind();
    this.subscribeToMilitaryUnit();
  }

  public ngOnDestroy(): void {
    this.nodeKindSubscription.unsubscribe();
    this.militaryUnitSubscription.unsubscribe();
  }


  public cancelDialog(): void {
    if (this.mode === 'edit') {
      this.mode = 'view';
      this.config.header = `Просмотр УС “${this.node.call_sign}”`;
      this.nodeForm.disable();
    } else {
      this.dialogRef.close();
    }
  }

  public saveNode(): void {
    const node = this.nodeForm.getRawValue();
    node.military_unit = {
      id: node.military_unit.id,
      label: node.military_unit.label,
    };
    if (node.division) {
      node.division = {
        id: node.division.id,
        label: node.division.label,
      };
    }

    if (this.mode === 'create') {
      this.nodeService.createNode(node);
    } else {
      node.uuid = this.node.uuid;
      this.nodeService.patchNode(node);
    }

    this.dialogRef.close();
  }

  public deleteNode(): void {
    this.dialogService.open(ConfirmationDialogComponent, {
      header: 'Удаление узла связи',
      data: {
        message: `Вы действительно хотите удалить узел?`,
      },
    }).onClose.pipe(takeWhile(res => res)).subscribe(_ => {
      this.nodeService.deleteNode(this.node);
      this.dialogRef.close();
    });
  }

  public editNode(): void {
    this.mode = 'edit';
    this.config.header = `Редактирование УС “${this.node.call_sign}”`;
    this.nodeForm.enable();
  }

  public setCoordinate(): void {
    this.dialogService.open(OspoCoordinatesComponent, {
      header: 'Координаты', width: '90%',
      data: {
        height: false, cols: COLS_WITHOUT_HEIGHT,
      },
    }).onClose.subscribe(res => {
      this.coordinate = {
        mark: res.name,
        uuid: res.uuid,
        x: res.object_geom.coordinates[0],
        y: res.object_geom.coordinates[1],
      };
      this.nodeForm.get('coordinate').setValue(this.coordinate);
    });
  }

  private createNodeForm(): void {
    this.nodeForm = new FormGroup({
      military_unit: new FormControl('', Validators.required),
      division: new FormControl({ value: '', disabled: true }),
      call_sign: new FormControl('', Validators.required),
      connection_type: new FormControl('', Validators.required),
      node_type: new FormControl('', Validators.required),
      coordinate: new FormControl('', Validators.required),
      node_kind: new FormControl('', Validators.required),
      deploy_time: new FormControl(null),
    });
  }


  private setNode(): void {
    if (this.config.data) {
      this.node = this.config.data;
      this.mode = 'view';
    }
  }

  private fillForm(node: Node): void {
    if (this.nodeForm && node) {
      this.nodeForm.patchValue({
        military_unit: node.military_unit,
        division: node.division,
        call_sign: node.call_sign,
        connection_type: node.connection_type,
        node_type: this.nodeTypes.find(item => item.uuid === node.node_type.uuid),
        coordinate: node.coordinate,
        node_kind: this.nodeKinds.find(item => item.uuid === node.node_kind.uuid),
        deploy_time: node.deploy_time,
      });
      this.nodeForm.get('division').enable();
      this.coordinate = node.coordinate;
      if (this.mode === 'view') {
        this.nodeForm.disable();
      }
    }
  }

  private subscribeToNodeKind(): void {
    this.nodeKindSubscription = this.nodeForm.get('node_kind').valueChanges.subscribe(res => {
      const deployTimeField = this.nodeForm.get('deploy_time');
      if (res.name === 'Мобильный') {
        this.isMobile = true;
        deployTimeField.setValidators(Validators.required);
        deployTimeField.updateValueAndValidity();
      } else {
        this.isMobile = false;
        deployTimeField.clearValidators();
        deployTimeField.updateValueAndValidity({ emitEvent: false });
      }
    });
  }

  private subscribeToMilitaryUnit(): void {
    this.militaryUnitSubscription = this.nodeForm.get('military_unit').valueChanges.subscribe(res => {
      const divisionControl = this.nodeForm.get('division');
      if (res) {
        this.showDivisionsOf = res.id;
        divisionControl.enable();
      } else {
        divisionControl.setValue(null);
        divisionControl.disable();
      }
    });
  }

  private getData(): void {
    this.connectionTypes = this.nodeService.selectors.connection_types;
    this.nodeTypes = this.nodeService.selectors.node_types;
    this.nodeKinds = this.nodeService.selectors.node_kinds;
    this.fillForm(this.node);
  }
}
