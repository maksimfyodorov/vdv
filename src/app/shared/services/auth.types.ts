export interface User {
  permissions: Access;
  access_level: AccessLevel;
  user_data: UserData;
}

export interface UserData {
  full_name: string;
  mu_name?: string;
  group: string;
  role: string;
  login: string;
  service_login;
}

export type AccessLevel = 'regiment' | 'conjunction' | 'command';

export interface Access {
  "access.delete_schedule"?: boolean;
  "access.transfer_planned_inspection"?: boolean;
  "access.change_status_CR"?: boolean;
  "access.add_schedule"?: boolean;
  "access.start_sudden_inspection"?: boolean;
  "access.add_planned_inspection"?: boolean;
  "access.change_status_not_CR"?: boolean;
  "access.cancel_planned_inspection"?: boolean;
  "access.delete_planned_inspection"?: boolean;
  "access.save_schedule"?: boolean;
  "access.edit_inspection_status"?: boolean;
  "access.edit_planned_inspection"?: boolean;
}

