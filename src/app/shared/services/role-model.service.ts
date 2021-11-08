import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AccessLevel, Access } from './auth.types';

@Injectable({
  providedIn: 'root'
})
export class RoleModelService {
  public userPermissions$: BehaviorSubject<Access> = new BehaviorSubject<Access>(null);
  public userAccessLevel$: BehaviorSubject<AccessLevel> = new BehaviorSubject<AccessLevel>(null);
}
