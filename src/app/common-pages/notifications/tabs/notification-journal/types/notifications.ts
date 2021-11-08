
export interface Notification {
  uuid: string;
  title: string;
  text: string;
  date: Date;
  sender: {
    fio: string;
    military_unit?: string;
    rank: string;
  };
  type: NotificationType;
  status: string;
}

export type NotificationType = 'error' | 'system' | 'success' | 'warning';

export enum NotificationsTypes {
  'error' = 'Ошибка',
  'system' = 'Системное',
  'success' = 'Норма',
  'warning' = 'Предупреждение'
}

export type FilterType = 'all' | 'favorites' | 'deleted';

export enum FilterTypes {
  'all' = 'Все',
  'favorites' = 'Избранное',
  'deleted' = 'Удаленные'
}

export enum LinkTypes {
  schedule = 'Ссылка на график проверок',
}
