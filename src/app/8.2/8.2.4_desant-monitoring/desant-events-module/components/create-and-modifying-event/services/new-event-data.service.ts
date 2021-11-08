import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {
  EventBasicInfo,
} from '../../../types/desant-events.type';
import {MilitaryUnitHierarchyItem} from '../../../../../../shared/components/ospo/military-units/military-units-sidebar/interfaces/interfaces';
import {ActivatedRoute} from '@angular/router';

@Injectable()
export class NewEventDataService {

  public set eventUUID(uuid: string) {
    this._eventUUID.next(uuid);
  }

  public get eventUUID(): string {
    return this._eventUUID.value;
  }

  public get eventUUID$(): Observable<string> {
    return this._eventUUID.asObservable();
  }

  public title: string;
  public activeTab = 0;
  public eventInfo: EventBasicInfo;
  public newEventComponentState = '';
  public selectedMilitaryUnit: MilitaryUnitHierarchyItem;

  private _eventUUID = new BehaviorSubject<string>('');

  constructor(
    private readonly activeRoute: ActivatedRoute
  ) {
    this.init();
  }

  private init(): void {
    this.activeRoute.queryParams.subscribe((queryParam: unknown) => {
        this._eventUUID.next(queryParam['uuid']);
        if (this.eventUUID) {
          this.title = 'Изменить мероприятие';
          this.newEventComponentState = 'edit';
        }
      }
    );
  }
}
