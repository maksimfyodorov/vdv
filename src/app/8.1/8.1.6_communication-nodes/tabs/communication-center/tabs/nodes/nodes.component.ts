import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommunicationNodesService } from '../../services/communication-nodes.service';
import { DialogService } from 'primeng/dynamicdialog';
import { BattlePost, CommunicationNode } from '../../types/nodes';
import { BattlePostComponent } from './dialogs/battle-post/battle-post.component';
import { mergeMap, takeWhile } from 'rxjs/operators';
import { ConfirmationDialogComponent } from '../../../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { LoaderService } from '../../../../../../shared/components/loader/loader.service';

@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.scss'],
  providers: [LoaderService],
})
export class NodesComponent implements OnInit {
  @ViewChild('node') private nodeTemplate: TemplateRef<HTMLElement>;
  @ViewChild('communication_type') private communicationTypeTemplate: TemplateRef<HTMLElement>;
  @ViewChild('coordinates') private coordinatesTemplate: TemplateRef<HTMLElement>;
  @ViewChild('deploy_time') private deployTimeTemplate: TemplateRef<HTMLElement>;
  @ViewChild('actions') private actionsTemplate: TemplateRef<HTMLElement>;

  public nodes: CommunicationNode[];
  public cols = [
    { field: 'node', header: ''},
    { field: 'communication_type', header: 'Тип связи' },
    { field: 'coordinates', header: 'Отметка' },
    { field: 'deploy_time', header: 'Время развертывания' },
    { field: 'actions', header: '' },
  ];

  constructor(
    public readonly nodesService: CommunicationNodesService,
    public readonly loader: LoaderService,
    private readonly dialog: DialogService,
  ) { }

  ngOnInit(): void {
    this.getCommunicationNodes();
  }

  public getTemplate(field: string): TemplateRef<HTMLElement> {
    switch (field) {
      case 'node': return this.nodeTemplate;
      case 'communication_type': return this.communicationTypeTemplate;
      case 'coordinates': return this.coordinatesTemplate;
      case 'deploy_time': return this.deployTimeTemplate;
      case 'actions': return this.actionsTemplate;
    }
  }

  public createBattlePost(node: CommunicationNode): void {
    this.dialog.open(BattlePostComponent, {
      header: `Добавить БП к ${node.call_sign}`,
      data: {
        node,
        military_unit: node.division || node.military_unit,
        communication_node_uuid: node.uuid,
      },
    }).onClose
      .pipe(
        takeWhile(res => res),
        mergeMap(res => this.loader.startLoading(this.nodesService.createBattlePost(res, node.uuid))))
      .subscribe(res => {
        this.getCommunicationNodes();
      });
  }

  public editBattlePost(node: BattlePost): void {
    this.dialog.open(BattlePostComponent, {
      header: 'Редактирование БП',
      data: {
        node,
        military_unit: node.cn_military_unit,
        communication_node_uuid: node.parent_cn?.uuid || node.communication_node?.uuid,
      },
    }).onClose
      .pipe(
        takeWhile(res => res),
        mergeMap(res => this.loader.startLoading(this.nodesService.patchBattlePost(res, node.uuid))))
      .subscribe(res => {
        this.getCommunicationNodes();
      });
  }

  public deleteBattlePost(node: BattlePost): void {
    this.dialog.open(ConfirmationDialogComponent, {
      header: 'Удаление БП',
      data: {
        message: `Вы действительно хотите удалить боевой пост?`
      }
    }).onClose
      .pipe(
        takeWhile(res => res),
        mergeMap(res => this.loader.startLoading(this.nodesService.deleteBattlePost(node.uuid))))
      .subscribe(res => {
        this.getCommunicationNodes();
      });
  }

  private getCommunicationNodes(): void {
    this.loader.startLoading(this.nodesService.getCommunicationNodes())
      .subscribe(res => {
        this.nodes = res;
      });
  }
}

