import { Status } from '../../../types/check-combat-readiness.types';

export interface PlanHistoryChange {
  date: string;
  user: string;
  action: string;
  status: Status;
}

export interface HistoryChange {
  date: Date;
  user: string;
  action: string;
  status: HistoryChangeStatus;
}

export type HistoryChangeStatus = 'new' | 'removed' | 'planned' | 'on_confirmation' | 'confirmed' | 'approved';

export const HISTORY_CHANGES_STATUS_ICONS = {
  new: '',
  removed: '',
  planned: '',
  on_confirmation: '',
  confirmed: '',
  approved: 'pi-check'
};

export const HISTORY_CHANGES_STATUS_NAMES = {
  new: 'Новый',
  removed: 'Не БГ',
  planned: 'Запланировано',
  on_confirmation: 'На исполнении',
  confirmed: 'Завершена',
  approved: 'Утверждён'
};
