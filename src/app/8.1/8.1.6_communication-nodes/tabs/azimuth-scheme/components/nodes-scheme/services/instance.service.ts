import { Injectable } from '@angular/core';
import { p5InstanceExtensions } from 'p5';
import { Subscription } from 'rxjs';
import { UserInputService } from './user-input.service';
import { NodesSchemeService } from './nodes-scheme.service';

@Injectable({
  providedIn: 'root'
})
export class InstanceService {
  public static p5Instance: p5InstanceExtensions;
  public static userInputService: UserInputService;
  public static nodesSchemeService: NodesSchemeService;
  public static defaultFont;
  public static subscriptions: Subscription[] = [];
}
