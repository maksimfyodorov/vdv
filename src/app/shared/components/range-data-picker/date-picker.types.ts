export interface RangeDate {
  from: string | Date;
  to: string | Date;
}

export const DATE_PICKER_LOCALE = {
  monthNames: [
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
  ],
  monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
  dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
  dayNamesShort: ['Воск', 'Пон', 'Вт', 'Ср', 'Четв', 'Пят', 'Суб'],
  dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  today: 'Сегодня',
  weekHeader: 'Неделя',
  startsWith: 'Начинается с',
  contains: 'Содержится',
  notContains: 'Не содержится',
  endsWith: 'Заканчивается на',
  equals: 'Равно',
  notEquals: 'Не равно',
  noFilter: 'Без фильтра',
  lt: 'Меньше',
  lte: 'Меньше или равно',
  gt: 'Больше',
  gte: 'Больше или равно',
  is: 'Совпадает',
  isNot: 'Не совпадает',
  before: 'До',
  after: 'После',
  clear: 'Очистить',
  apply: 'Применить',
  matchAll: 'Соответствовать всем',
  matchAny: 'Сооветствовать любому',
  addRule: 'Добавить правило',
  removeRule: 'Удалить правило',
  accept: 'Да',
  reject: 'Нет',
  choose: 'Выбрать',
  upload: 'Загрузить',
  cancel: 'Отменить',
};
