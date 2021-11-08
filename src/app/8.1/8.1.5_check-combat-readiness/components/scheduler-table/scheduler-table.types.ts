import { CheckboxConfig } from '../../../../shared/components/multiple-checkboxes/multiple-checkboxes.component';

export interface EventsCount {
  status: EventStatus;
  count: number;
}

export interface SchedulerEvent {
  name: string;
  id?: string;
  from_dt: string;
  to_dt: string;
  startColumn?: number;
  duration?: number;
  status: EventStatus;
}

export type EventStatus = 'new' | 'completed' | 'during' | 'scheduled' | 'expired';

export const EVENT_STATUS_NAMES = {
  new: 'Новый',
  completed: 'Завершено',
  during: 'На исполнении',
  scheduled: 'Запланировано',
  expired: 'Просрочено'
};

export interface ViewOption {
  name: string;
  value: ViewOptionValue;
}

export type ViewOptionValue = 'week' | 'year' | 'month';

export const WEEK_DAYS_NAMES = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

export const MONTH_NAMES = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

export const VIEW_OPTIONS: ViewOption[] = [
  { name: 'Неделя', value: 'week' },
  { name: 'Месяц', value: 'month' },
  { name: 'Год', value: 'year' },
];

export const FILTER_OPTIONS: CheckboxConfig[] = [
  {
    viewName: 'Запланировано',
    name: 'scheduled',
    count: 0,
    color: '#339AF0',
    checked: true,
  },
  {
    viewName: 'На исполнении',
    name: 'during',
    count: 0,
    color: '#fab005',
    checked: true,
  },
  {
    viewName: 'Завершено',
    name: 'completed',
    count: 0,
    color: '#22b8cf',
    checked: true,
  },
  {
    viewName: 'БГ',
    name: 'expired',
    count: 0,
    color: '#82c91e',
    checked: true,
  },
  {
    viewName: 'НЕ БГ',
    name: 'expired',
    count: 0,
    color: '#fa5252',
    checked: true,
  },
  {
    viewName: 'Не определен',
    name: 'expired',
    count: 0,
    color: '#959ea9',
    checked: true,
  },
  {
    viewName: 'Отменена',
    name: 'expired',
    count: 0,
    color: '#c92a2a',
    checked: true,
  },


];
