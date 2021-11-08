import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Irz, Setting, User } from './interfaces/interfaces';
import { SettingsService } from './services/settings.service';
import { debounce, filter, map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { SubscriptionLike, timer } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-notification-settings',
  templateUrl: './notification-settings.component.html',
  styleUrls: ['./notification-settings.component.scss'],
  providers: [SettingsService],
})
export class NotificationSettingsComponent implements OnInit, OnDestroy {

  @Input() set militaryUnitId(id: string) {
    this._militaryUnitId = id;
    if (id) {
      this.getUsers();
    }
  }

  private _militaryUnitId: string;
  public users: User[];
  public irzs: Irz[];
  public selectedUserUuid: string;
  public searchName: FormControl;
  private subSearchName: SubscriptionLike;

  constructor(private settingsService: SettingsService) {
  }

  ngOnInit(): void {
    this.searchName = new FormControl();
    this.subscribeToSearchWord();
  }

  ngOnDestroy(): void {
    this.subSearchName.unsubscribe();
  }

  public getUsers(searchWord?: string): void {
    let params = new HttpParams().set('military_unit_id', this._militaryUnitId);
    if (searchWord) {
      params = params.set('search_name', searchWord);
    }
    this.settingsService.getUsers(params).pipe(map(res => res.result))
      .subscribe(res => {
        this.users = res;
      });
  }

  public selectUser(userUuid: string): void {
    this.selectedUserUuid = userUuid;
    this.getSettings();
  }

  private getSettings(): void {
    this.settingsService.getSettings(this.selectedUserUuid).pipe(map(res => res.result))
      .subscribe(res => {
        this.irzs = res;
      });
  }

  private subscribeToSearchWord(): void {
    this.subSearchName = this.searchName.valueChanges
      .pipe(
        filter(() => !!this._militaryUnitId),
        filter(value => value.length > 2 || value.length === 0),
        debounce(() => timer(500)),
      ).subscribe(searchWord => this.getUsers(searchWord));
  }

  public changeSetting(setting: Setting): void {
    this.settingsService.patchSettings([{
      ...setting,
      user_id: this.selectedUserUuid,
    }], this.selectedUserUuid).subscribe();
  }
}
