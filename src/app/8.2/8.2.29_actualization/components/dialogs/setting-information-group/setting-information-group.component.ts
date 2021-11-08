import { Component, OnInit, OnDestroy } from '@angular/core';
import { switchMap } from "rxjs/operators";
import { InformationGroup } from "./interfaces";
import { HttpService } from "./http.service";
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-setting-information-group',
  templateUrl: './setting-information-group.component.html',
  styleUrls: ['./setting-information-group.component.scss']
})
export class SettingInformationGroupComponent implements OnInit, OnDestroy {

  groups: InformationGroup[];
  groupsForAssist: InformationGroup[];
  displayDetails = true;
  selectedGroup: InformationGroup;
  modeChangeDetailContainer;
  streamGroups$: Observable<InformationGroup[]>;
  editFlag: boolean = false;
  groupName: string = '';
  searchedItems: InformationGroup[] = [];
  subscriptions = new Subscription();

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.initPage();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  initPage() {
    this.streamGroups$ = this.httpService.getInformationGroups();
    this.subscriptions.add(

      this.httpService.refreshStream$.pipe(
        switchMap(rews => this.streamGroups$)
      ).subscribe(
        (res: InformationGroup[]) => {
          this.groups = res;
          this.groupsForAssist = res;
          this.selectGroup();
        }
      )
    )
  }

  selectGroup(item = this.groups[0]): void {
    this.selectedGroup = null;
    this.selectedGroup = item;
  }

  openAddContainer(): void {
    this.modeChangeDetailContainer = 'Создание группы';
    this.displayDetails = false;
    this.editFlag = false;
    this.selectedGroup = {
      uuid: '',
      number: '',
      name: '',
      section: {
        uuid: '',
        name: '',
      },
      character: {
        uuid: '',
        name: '',
      },
      forms: [],
      tracks: [],
    }
  }

  closeChangesDetail(value: boolean) {
    this.displayDetails = value;
    this.selectGroup()
  }

  deleteGroup(group: InformationGroup) {
    const result = confirm('Вы точно хотите удалить группу?');
    if (result) {
      this.subscriptions.add(
        this.httpService.deleteInformationGroup(group).subscribe(
          item => {
            this.initPage()
          },
          error => {
          }
        )
      )
    }
  }

  closeDetailContainer(value: boolean) {
    this.modeChangeDetailContainer = 'Редактирование группы';
    this.displayDetails = value;
    this.editFlag = true;
  }

  onKey(event: Event) {
    if (this.groups) {
      this.searchedItems = [];
      this.groupsForAssist.forEach(item => {
        if (item.name.toLowerCase().includes(this.groupName.toLowerCase())) {
          this.searchedItems.push(item);
        }
      })
      this.groups = this.searchedItems;
    }
  }

}
