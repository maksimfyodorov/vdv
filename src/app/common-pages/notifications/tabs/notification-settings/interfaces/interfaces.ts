export interface User {
  uuid: string;
  title: string;
  name: string;
}

export interface Irz {
  uuid: string;
  name: string;
  settings: Setting[];
}

export interface Setting {
  setting_uuid: string;
  event_uuid: string;
  name: string;
  is_send: boolean;
}
