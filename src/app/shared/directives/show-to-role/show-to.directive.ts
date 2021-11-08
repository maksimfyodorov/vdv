import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { RoleModelService } from '../../services/role-model.service';
import { Subscription } from 'rxjs';
import { AccessLevel, Access } from '../../services/auth.types';
import { objectKeys } from 'codelyzer/util/objectKeys';

export interface ShowToConfig {
  access: Access[] | any;
  accessLevel?: AccessLevel[];
  additionalCheck?: boolean;
}

@Directive({
  selector: '[appShowTo]',
})
export class ShowToDirective implements OnDestroy {
  private currentAccess: Access;
  private additionalCheck = true;
  private acceptedAccess: string;
  private acceptedAccessLevels: AccessLevel[] = [];
  private currentAccessLevel: AccessLevel;
  private subscriptions: Subscription[] = [];

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private roleModelService: RoleModelService) {
    this.subscribeToRoleChange();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  @Input() set appShowTo(config: ShowToConfig) {
    this.acceptedAccess = config.access;
    this.additionalCheck = config.additionalCheck !== false;
    this.acceptedAccessLevels = config.accessLevel;
    this.setElementView();
  }

  private subscribeToRoleChange(): void {
    this.subscriptions.push(this.roleModelService.userPermissions$.subscribe(res => {
        this.currentAccess = res;
        this.setElementView();
      }),
      this.roleModelService.userAccessLevel$.subscribe(res => {
        this.currentAccessLevel = res;
        this.setElementView();
      }),
    );
  }

  private setElementView(): void {
    this.viewContainer.clear();
    if (this.checkRoleInclude() && this.checkAccessLevelInclude() && this.additionalCheck) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  private checkRoleInclude(): boolean {

    const currentAccessKeys = objectKeys(this.currentAccess);

    for (let access of currentAccessKeys) {
      if (this.acceptedAccess === access) {
        return true;
      }
    }
    return false;

  }

  private checkAccessLevelInclude(): boolean {
    return this.acceptedAccessLevels ? this.acceptedAccessLevels.some(item => item === this.currentAccessLevel) : true;
  }
}
