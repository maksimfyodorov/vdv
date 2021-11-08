import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RoleModelService } from './role-model.service';
import { User, UserData } from './auth.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser$: BehaviorSubject<UserData> = new BehaviorSubject<UserData>(null);

  constructor(private roleModelService: RoleModelService) { }

  public setCurrentUser(user: User): void {
    this.currentUser$.next(user.user_data);
    this.roleModelService.userPermissions$.next(user.permissions || null);
    this.roleModelService.userAccessLevel$.next(user.access_level);
  }
}
