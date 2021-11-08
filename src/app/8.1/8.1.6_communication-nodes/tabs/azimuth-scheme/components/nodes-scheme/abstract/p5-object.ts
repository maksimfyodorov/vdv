import { InstanceService } from '../services/instance.service';
import { p5InstanceExtensions } from 'p5';
import { UserInputService } from '../services/user-input.service';
import { NodesSchemeService } from '../services/nodes-scheme.service';

export abstract class P5Object {
  protected p5: p5InstanceExtensions = InstanceService.p5Instance;
  protected drawingContext = document.querySelector('canvas').getContext('2d');
  protected userInput: UserInputService = InstanceService.userInputService;
  protected nodesSchemeService: NodesSchemeService = InstanceService.nodesSchemeService;

  abstract update(): void;
}
