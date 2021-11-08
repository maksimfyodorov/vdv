import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { P5JSInvoker } from './abstract/p5jsInvoker';
import * as p5 from 'p5';
import { p5InstanceExtensions, Vector } from 'p5';
import { InstanceService } from './services/instance.service';
import { Camera } from './objects/camera';
import { DisplayNode } from './objects/displayNode';
import { UserInputService } from './services/user-input.service';
import { CanvasBackup, Node, NodesSchemeHierarchyItem, UserInputMode } from './nodes.scheme.types';
import { CreateEditViewNodeDialogComponent } from '../dialogs/node/create-edit-view-node-dialog/create-edit-view-node-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { NodesSchemeService } from './services/nodes-scheme.service';
import { DisplayDirection } from './objects/displayDirection';
import { CreateEditDirectionDialogComponent } from '../dialogs/direction/create-edit-direction-dialog/create-edit-direction-dialog.component';
import { NodesHierarchyService } from './services/nodes-hierarchy.service';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-nodes-scheme',
  templateUrl: './nodes-scheme.component.html',
  styleUrls: ['./nodes-scheme.component.scss'],
})
export class NodesSchemeComponent extends P5JSInvoker implements AfterViewInit, OnDestroy {
  @ViewChild('container') private container: ElementRef;
  public camera: Camera;
  public displayNodes: DisplayNode[] = [];
  private displayDirections: DisplayDirection[] = [];
  private p5: p5InstanceExtensions;
  private edgeIsDrawing: boolean;
  private drawnEdgeNodeStart: DisplayNode;
  private drawnEdgeNodeEnd: DisplayNode;

  constructor(
    public userInputService: UserInputService,
    public nodesService: NodesSchemeService,
    private dialogService: DialogService,
    private hierarchy: NodesHierarchyService,
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.startP5JS(this.container.nativeElement);
    this.nodesService.getScheme();
    this.hierarchy.updateHierarchy();
  }

  ngOnDestroy(): void {
    InstanceService.subscriptions.forEach(sub => sub.unsubscribe());
    InstanceService.subscriptions = [];
  }

  preload(p: p5): void {
    this.p5 = InstanceService.p5Instance = p;
    InstanceService.defaultFont = this.p5.loadFont('assets/fonts/NotoSans-Regular.ttf');
    InstanceService.nodesSchemeService = this.nodesService;
    InstanceService.userInputService = this.userInputService;
    this.userInputService.assignEventListeners(this.container);
  }

  setup(p: p5): void {
    this.p5.createCanvas(this.container.nativeElement.offsetWidth, this.container.nativeElement.offsetHeight);
    this.createCamera();
    this.subscribeToEdgesUpdate();
    this.subscribeToNodesUpdate();
    this.subscribeToHierarchySelection();
    this.subscribeToUserInput();
  }

  draw(p: p5): void {
    this.updateCamera();
    this.updateCanvas();
    this.updateEdges();
    this.updateNodes();
    this.updateTemporaryEdge();
  }

  public changeUserInput(mode: UserInputMode): void {
    this.userInputService.userInputMode = mode;
  }

  public createEdge(start: DisplayNode, end: DisplayNode): void {
    if (!this.nodesService.isDirectionOverlapping(start, end)) {
      this.dialogService.open(CreateEditDirectionDialogComponent,
        {
          header: `Создание направления связи ${this.getNodeNameById(start.baseObject.uuid)}-${this.getNodeNameById(end.baseObject.uuid)}`,
          width: '450px',
          data: {
            start,
            end,
          },
        });
    }
  }

  public print(): void {
    const backupState = this.createBackup();
    let parentNode: DisplayNode;
    this.displayNodes.forEach(node => {
      node.printMode = true;
      if (node.selected) {
        parentNode = this.displayNodes.find(
          item => item.baseObject.uuid === this.findParentOf(node.baseObject, this.hierarchy.nodesHierarchy$.getValue())?.uuid
        );
        if (parentNode) {
          parentNode.isParent = true;
        }
      }
    });
    this.camera.setDefaultScale();
    const [minPos, maxPos] = this.getMinMaxPositions();
    this.camera.translation.set(minPos.copy().mult(-1).add(50, 50));
    this.p5.resizeCanvas((maxPos.x - minPos.x) + 100, (maxPos.y - minPos.y) + 100);
    this.p5.saveCanvas('azimuthal-scheme', 'png');
    this.restoreBackup(backupState);
    this.displayNodes.forEach(node => {
      node.printMode = false;
      node.isParent = false;
    });
  }

  public createNode(): void {
    this.dialogService.open(CreateEditViewNodeDialogComponent, { header: 'Добавить УС' });
  }

  public save(): void {
    this.nodesService.saveScheme().subscribe(res => {
      this.nodesService.setSaveIsNeeded(false);
      this.nodesService.getScheme();
      this.hierarchy.updateHierarchy();
    });
  }

  public fit(): void {
    this.camera.setDefaultScale();
    const [min, max] = this.getMinMaxPositions();
    this.camera.translation.set(min.copy().mult(-1));

    const currentSize = this.p5.createVector(this.p5.width, this.p5.height);
    const desiredSize = max.copy().sub(min);

    this.camera.scale = Math.min(currentSize.x / desiredSize.x, currentSize.y / desiredSize.y);
  }

  private subscribeToNodesUpdate(): void {
    InstanceService.subscriptions.push(this.nodesService.nodes$.subscribe(res => {
      this.displayNodes = res.map(item => new DisplayNode(item, this.camera));
      this.nodesService.directions$.next(this.nodesService.directions$.value);
    }));
  }

  private subscribeToEdgesUpdate(): void {
    InstanceService.subscriptions.push(this.nodesService.directions$.subscribe(res => {
      this.displayDirections = res.map(item => new DisplayDirection(item, this.displayNodes, this.camera));
    }));
  }

  private subscribeToHierarchySelection(): void {
    InstanceService.subscriptions.push(this.hierarchy.selectedItem$
      .pipe(filter(res => res.emitter !== 'work-area'))
      .subscribe(res => {
        const selectedNode = this.nodesService.nodes$.value.find(node => res.uuid === node.uuid);

        if (selectedNode) {
          const [connectedNodes, connectedDirections] = [
            this.nodesService.getConnectedNodes(selectedNode),
            this.nodesService.getConnectedDirections(selectedNode)
          ];


          this.displayNodes = this.nodesService.nodes$.value
            .filter(node => connectedNodes.includes(node))
            .map(node => new DisplayNode(node, this.camera));
          this.displayDirections = this.nodesService.directions$.value
            .filter(edge => connectedDirections.includes(edge))
            .map(edge => new DisplayDirection(edge, this.displayNodes, this.camera));
          this.displayNodes.forEach(node => {
            node.selected = node.baseObject.uuid === res.uuid;
          });
        } else {
          this.nodesService.nodes$.next(this.nodesService.nodes$.getValue());
          this.nodesService.directions$.next(this.nodesService.directions$.getValue());
        }
    }));
  }

  private updateCanvas(): void {
    this.p5.background('#F2F2F2');
    this.p5.fill(0);
  }

  private createCamera(): void {
    this.camera = new Camera();
  }

  private updateNodes(): void {
    this.displayNodes.forEach(node => node.update());
  }

  private updateEdges(): void {
    this.displayDirections.forEach(edge => edge.update());
  }

  private updateCamera(): void {
    this.camera.update();
  }

  private subscribeToUserInput(): void {
    InstanceService.subscriptions.push(this.userInputService.getEvent('doubleClick').subscribe(e => {
      return this.applyCallbackToOverlappingNode(this.openNodeDialog)
        || this.applyCallbackToOverlappingEdge(this.openEdgeDialog);
    }));

    InstanceService.subscriptions.push(this.userInputService.getEvent('mouseIsPressed').subscribe((isPressed: boolean) => {
      if (isPressed) {
        this.applyCallbackToOverlappingNode(this.selectNode, this.deselectNode);
      }
      if (this.userInputService.userInputMode === 'connection') {
        this.drawNewEdge(isPressed);
      }
    }));
  }

  private applyCallbackToOverlappingNode(firstNodeCallback: (node) => void, restNodesCallback?: (node) => void): boolean {
    let isOverlapping = false;
    this.displayNodes.slice().reverse().forEach(node => {
      if ((node.checkForCursorOverlap() || node.checkForCursorOverlapOnCircle()) && !isOverlapping) {
        firstNodeCallback.call(this, node);
        isOverlapping = true;
      } else {
        return restNodesCallback && restNodesCallback(node);
      }
    });
    return isOverlapping;
  }


  private applyCallbackToOverlappingEdge(firstEdgeCallback: (edge) => void, restEdgesCallback?: (edge) => void): boolean {
    let isOverlapping = false;
    this.displayDirections.slice().reverse().forEach(edge => {
      if (edge.checkForCursorOverlap() && !isOverlapping) {
        firstEdgeCallback.call(this, edge);
        isOverlapping = true;
      } else {
        return restEdgesCallback && restEdgesCallback(edge);
      }
    });
    return isOverlapping;
  }

  private selectNode(node: DisplayNode): void {
    node.selected = true;
    this.hierarchy.selectedItem$.next({ uuid: node.baseObject.uuid, emitter: 'work-area' });
  }

  private deselectNode(node: DisplayNode): void {
    node.selected = false;
  }

  private openNodeDialog(node: DisplayNode): void {
    this.dialogService.open(CreateEditViewNodeDialogComponent,
      { header: `Просмотр УС "${node.baseObject.call_sign}"`, data: node.baseObject });
  }


  private openEdgeDialog(edge: DisplayDirection): void {
    this.dialogService.open(CreateEditDirectionDialogComponent,
      {
        header:
          `Просмотр направления связи ${this.getNodeNameById(edge.baseObject.node_out_uuid)}-${this.getNodeNameById(edge.baseObject.node_in_uuid)}`,
        width: '450px',
        data: { direction: edge.baseObject },
      });
  }

  private getNodeNameById(id: string): string {
    const node = this.nodesService.nodes$.value.find(item => item.uuid === id);
    return node.call_sign;
  }

  private drawNewEdge(isPressed: boolean): void {
    if (isPressed) {
      this.drawnEdgeNodeStart = this.displayNodes.slice().reverse().find(node => node.checkForCursorOverlapOnCircle());
    }
    if (this.drawnEdgeNodeStart && isPressed) {
      this.edgeIsDrawing = true;
    } else {
      this.drawnEdgeNodeEnd = this.displayNodes.slice().reverse().find(node => node.checkForCursorOverlap());
      if (this.drawnEdgeNodeEnd && this.drawnEdgeNodeStart && this.edgeIsDrawing) {
        this.createEdge(this.drawnEdgeNodeStart, this.drawnEdgeNodeEnd);
      }
      this.drawnEdgeNodeStart = null;
      this.drawnEdgeNodeEnd = null;
      this.edgeIsDrawing = false;
    }
  }

  private updateTemporaryEdge(): void {
    if (this.edgeIsDrawing) {
      this.showTemporaryLine();
    }
  }

  private showTemporaryLine(): void {
    this.p5.strokeWeight(2);
    this.p5.stroke('#228BE6');
    const globalMouseX = this.p5.mouseX / this.camera.scale - this.camera.translation.x;
    const globalMouseY = this.p5.mouseY / this.camera.scale - this.camera.translation.y;
    const angle = this.p5.createVector(globalMouseX, globalMouseY)
      .sub(this.drawnEdgeNodeStart.position.copy()
        .add(this.drawnEdgeNodeStart.size.x, this.drawnEdgeNodeStart.size.y / 2),
      ).heading();

    this.p5.line(
      this.drawnEdgeNodeStart.position.x + this.drawnEdgeNodeStart.size.x,
      this.drawnEdgeNodeStart.position.y + this.drawnEdgeNodeStart.size.y / 2,
      globalMouseX,
      globalMouseY,
    );
    this.p5.push();
    this.p5.translate(globalMouseX, globalMouseY);
    this.p5.rotate(angle);
    this.p5.line(0, 0, -8, -5);
    this.p5.line(0, 0, -8, 5);
    this.p5.pop();
  }

  private getMinMaxPositions(): Vector[] {
    return [
      this.p5.createVector(
      Math.min(...this.displayNodes.map(node => node.position.x)),
      Math.min(...this.displayNodes.map(node => node.position.y))),
     this.p5.createVector(
      Math.max(...this.displayNodes.map(node => node.position.x + node.size.x)),
      Math.max(...this.displayNodes.map(node => node.position.y + node.size.y)))
    ];
  }

  private createBackup(): CanvasBackup {
    return {
      scale: this.camera.scale,
      translation: this.camera.translation.copy(),
      canvasSize: this.p5.createVector(this.container.nativeElement.offsetWidth, this.container.nativeElement.offsetHeight),
    };
  }

  private restoreBackup(backup: CanvasBackup): void {
    this.camera.scale = backup.scale;
    this.camera.translation.set(backup.translation);
    this.p5.resizeCanvas(backup.canvasSize.x, backup.canvasSize.y);
  }

  private findParentOf(item: Node, hierarchy: NodesSchemeHierarchyItem[], lastParent = null): NodesSchemeHierarchyItem {
    let result;
    for (const child of hierarchy) {
      if (item.uuid === child.uuid) {
        result = lastParent;
        break;
      }
      if (child.children.length && !result) {
       result = this.findParentOf(item, child.children, child);
      }
    }
    return result;
  }
}
