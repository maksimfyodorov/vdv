import { Breadcrumbs, UavInformationTab } from '@app/8.1/8.1.4_uav-information/types/common-types';
import { createDate } from '@app/8.1/8.1.4_uav-information/shared-functions';

export const FLIGHT_PLANS_BREADCRUMBS: Breadcrumbs[] = [
  { label: 'Корень', url: '/' },
  { label: 'План полетов' },
];

export const UAV_STATE_BREADCRUMBS: Breadcrumbs[] = [
  { label: 'Корень', url: '/' },
  { label: 'Состояние БЛА' },
];

export const FLIGHT_PLAN_TAB: UavInformationTab = {
  link: 'bpla/flight_plans/military_unit',
  breadcrumbs: FLIGHT_PLANS_BREADCRUMBS
};

export const UAV_STATE_TAB: UavInformationTab = {
  link: 'bpla/state_bla/military_unit',
  extras: {queryParams: { date: createDate(new Date()) }},
  breadcrumbs: UAV_STATE_BREADCRUMBS,
};

export const TASK_STATUS_TEXT = {
  planned: 'Планируется', new: 'Новое', completed: 'Завершено', not_completed: 'Не выполнено',
};

export const UAV_TABS = [FLIGHT_PLAN_TAB, UAV_STATE_TAB];
