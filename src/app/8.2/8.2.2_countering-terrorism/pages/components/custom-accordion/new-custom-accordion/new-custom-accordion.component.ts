import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-new-custom-accordion',
  templateUrl: './new-custom-accordion.component.html',
  styleUrls: ['./new-custom-accordion.component.scss'],
  animations: [
    trigger('accordionItemContentAnimation', [
      state('isOpen', style({ height: '*', transform: 'scale(1, 1)' })),
      state('isClose', style({ height: 0, transform: 'scale(1, 0)' })),
      transition('isOpen => isClose', [
        animate('.5s', style({ height: 0, transform: 'scale(1, 0)' }))
      ]),
      transition('isClose => isOpen', [
        animate('.5s', style({ height: '*', transform: 'scale(1, 1)' }))
      ]),
    ])
  ]
})
export class NewCustomAccordionComponent implements OnInit {

  @Input() selected: boolean = false;
  @Input() header: string;
  @Input() footer: string;
  @Input() reportResults: any;

  public completeCreationFlag: boolean = false;
  public state: string = 'isClose';
  public isOpen: boolean = false;
  public summaryUuid: string;
  private querySubscription: Subscription;

  constructor(
    public stateService: StateService,
    private route: ActivatedRoute,
  ) {
    this.querySubscription = route.queryParams.subscribe(
      (queryParam: any) => {
        this.summaryUuid = queryParam['uuid'];
      }
    );
  }

  public ngOnInit(): void {
    this.stateService.returnCompleteCreationFlag().subscribe(res => {
      this.completeCreationFlag = res;
    })
  }

  public open(): void {
    this.state = this.state === 'isClose' ? 'isOpen' : 'isClose';
  }

}
