import {OSPOHistoryChanges} from '../../../../../shared/components/ospo/ospo-change-history/interfaces/camera-history.interface';

export const CHANGE_HISTORY: OSPOHistoryChanges[] = [
  {changeCameraDate: Date.now(), user: 'ФИО', action: 'Добавил камеру', status: 'new'},
  {changeCameraDate: Date.now(), user: 'ФИО', action: 'Стабильная работа камеры', status: 'normal'},
  {changeCameraDate: Date.now(), user: 'ФИО', action: 'Перебой в работе', status: 'damage'},
  {changeCameraDate: Date.now(), user: 'ФИО', action: 'Камера снята с объекта', status: 'removed'},
  {changeCameraDate: Date.now(), user: 'ФИО', action: 'Добавил камеру', status: 'new'},
  {changeCameraDate: Date.now(), user: 'ФИО', action: 'Стабильная работа камеры', status: 'normal'},
  {changeCameraDate: Date.now(), user: 'ФИО', action: 'Перебой в работе', status: 'damage'},
  {changeCameraDate: Date.now(), user: 'ФИО', action: 'Камера снята с объекта', status: 'removed'},
];

export const STATUSES = {
  new: {
    title: 'Новый',
    icon: ''
  },
  normal: {
    title: 'Норма',
    icon: 'pi pi-check'
  },
  damage: {
    title: 'Авария',
    icon: 'pi pi-exclamation-triangle'
  },
  removed: {
    title: 'Снята с объекта',
    icon: ''
  }
};


