import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder } from '@angular/forms';
import { RoleModelService } from '../../services/role-model.service';
import { NotificationService } from '../ospo/notification/services/notification.service';
import { CheckCombatReadinessDataService } from '../../../8.1/8.1.5_check-combat-readiness/services/check-combat-readiness-data.service';
import { CheckCombatReadinessService } from '../../../8.1/8.1.5_check-combat-readiness/services/check-combat-readiness.service';
import { LoaderService } from '../loader/loader.service';
import { AuthService } from '../../services/auth.service';

export interface UserPermissionData {
  userLogin: string;
  group: string;
  role: string;
  userShareLogin: string;
  permissions: [];
}

@Component({
  selector: 'app-user-permission-dialog',
  templateUrl: './user-permission-dialog.component.html',
  styleUrls: ['./user-permission-dialog.component.scss'],
})
export class UserPermissionDialogComponent implements OnInit {

  userData: UserPermissionData;

  ngOnInit(): void {
    this.prepareData();
  }

  constructor(
    private dialogService: DialogService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    public roleModelService: RoleModelService,
    private notificationService: NotificationService,
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private httpService: CheckCombatReadinessService,
    public loaderService: LoaderService,
    private authService: AuthService) {
  }

  prepareData(): void {
    this.httpService.getUserPermissions().subscribe(res => {
      const { login, group, role, service_login } = this.authService.currentUser$.value;
      this.userData = {
        userLogin: login,
        group,
        role,
        userShareLogin: service_login,
        permissions: res,
      };
    });
  }

}
