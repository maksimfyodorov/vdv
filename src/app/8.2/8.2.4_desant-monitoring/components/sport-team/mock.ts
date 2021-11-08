import {MilitarySportInfo, SportsCategory} from './types/sport-team.types';
import {Militaries} from '../../types/desant-monitoring.types';

export const SPORT_TABLE: Militaries[] = [
  // {
  //   uuid: 'ecc4f24c-f379-11eb-9a03-0242ac130003',
  //   military_post: 'Командир роты',
  //   rank: 'Капитан',
  //   fullName: 'Федоров В.А',
  //   subdivision: 'вдо рдо',
  //   category: 'Офицер',
  //   sports_category: 'МС'
  // }, {
  //   uuid: 'ecc4f508-f379-11eb-9a03-0242ac130003',
  //   military_post: 'Командир роты',
  //   rank: 'Капитан',
  //   fullName: 'Иванов В.А',
  //   subdivision: 'вдо рдо',
  //   category: 'Офицер',
  //   sports_category: '1-й'
  // }, {
  //   uuid: 'ecc4f5f8-f379-11eb-9a03-0242ac130003',
  //   military_post: 'Командир роты',
  //   rank: 'Капитан',
  //   fullName: 'Фофанов В.А',
  //   subdivision: 'вдо рдо',
  //   category: 'Офицер',
  //   sports_category: 'КМС'
  // }, {
  //   uuid: 'ecc4f76a-f379-11eb-9a03-0242ac130003',
  //   military_post: 'Командир роты',
  //   rank: 'Капитан',
  //   fullName: 'Феофанов В.А',
  //   subdivision: 'вдо рдо',
  //   category: 'Офицер',
  //   sports_category: 'МСМК'
  // },
];
export const SPORTS_CATEGORY: SportsCategory[] = [
  {title: 'МС', uuid: '1c312ade-f111-11eb-9a03-0242ac130003'},
  {title: 'МСМК', uuid: '1c312db8-f111-11eb-9a03-0242ac130003'},
  {title: 'ЗМС', uuid: '1c312ec6-f111-11eb-9a03-0242ac130003'},
  {title: '1-й', uuid: '1c312f8e-f111-11eb-9a03-0242ac130003'},
];

// export const MILITARIES: Militaries[] = [{
//   uuid: '6ddebfa2-f384-11eb-9a03-0242ac130003',
//   military_post: 'Командир взвода',
//   rank: 'лейт',
//   fullName: 'Петров Федор Иванович',
//   subdivision: '24рмо',
//   category: 'Офицер',
//   sports_category: 'МСМК'
// },
//   {
//     uuid: '6ddec330-f384-11eb-9a03-0242ac130003',
//     military_post: 'Командир роты',
//     rank: 'капитан',
//     fullName: 'Петров Илья Ильич',
//     subdivision: '47бр',
//     category: 'Офицер',
//     sports_category: 'КМС'
//   }, {
//     uuid: '6ddec448-f384-11eb-9a03-0242ac130003',
//     military_post: 'Командир взвода',
//     rank: 'лейт',
//     fullName: 'Федоров Илья Иванович',
//     subdivision: '25рс',
//     category: 'Офицер',
//     sports_category: 'МС'
//   }, {
//     uuid: '6ddec5c4-f384-11eb-9a03-0242ac130003',
//     military_post: 'Командир батальона',
//     rank: 'майор',
//     fullName: 'Голдин Федор Иванович',
//     subdivision: '24рмо',
//     category: 'Офицер',
//     sports_category: 'МС'
//   }, {
//     uuid: '6ddec682-f384-11eb-9a03-0242ac130003',
//     military_post: 'инструктор-водитель',
//     rank: 'сержант',
//     fullName: 'Петров Федор Иванович',
//     subdivision: '24рмо',
//     category: 'Сержанты',
//     sports_category: '1-й'
//   },
//   {
//     uuid: 'ecc4f24c-f379-11eb-9a03-0242ac130003',
//     military_post: 'Командир роты',
//     rank: 'Капитан',
//     fullName: 'Федоров В.А',
//     subdivision: 'вдо рдо',
//     category: 'Офицер',
//     sports_category: 'МС'
//   }, {
//     uuid: 'ecc4f508-f379-11eb-9a03-0242ac130003',
//     military_post: 'Командир роты',
//     rank: 'Капитан',
//     fullName: 'Иванов В.А',
//     subdivision: 'вдо рдо',
//     category: 'Офицер',
//     sports_category: '1-й'
//   }, {
//     uuid: 'ecc4f5f8-f379-11eb-9a03-0242ac130003',
//     military_post: 'Командир роты',
//     rank: 'Капитан',
//     fullName: 'Фофанов В.А',
//     subdivision: 'вдо рдо',
//     category: 'Офицер',
//     sports_category: 'КМС'
//   }, {
//     uuid: 'ecc4f76a-f379-11eb-9a03-0242ac130003',
//     military_post: 'Командир роты',
//     rank: 'Капитан',
//     fullName: 'Феофанов В.А',
//     subdivision: 'вдо рдо',
//     category: 'Офицер',
//     sports_category: 'МСМК'
//   },
// ];


export const SPORT_INFO: MilitarySportInfo = {
  uuid: 'ecc4f24c-f379-11eb-9a03-0242ac130003',
  parachute_systems: [
    {name: 'Всего прыжков', planned: 250, done: 250, incident: 0},
    {name: 'Д-10', planned: 150, done: 150, incident: 0},
    {name: 'Мальва-24', planned: 25, done: 25, incident: 1},
    {name: 'Арбалет', planned: 50, done: 50, incident: 0},
  ],
  aircraft: [
    {name: 'Ил-76', planned: 50, done: 50, incident: 1},
    {name: 'Ан-2', planned: 50, done: 50, incident: 0},
    {name: 'Ми-8', planned: 50, done: 50, incident: 0},
  ],
  military_units: [
    {name: '21оро', incident: 3},
    {name: '47бр', incident: 0},
    {name: '25рс', incident: 0},
  ],
  jumping_on_tasks: [
    {
      title: 'Задача 4',
      planned: 300,
      done: 300,
      incident: 0,
      parachuteSystems: [
        {name: 'Д-10', planned: 250, done: 250, incident: 0},
        {name: 'Арбалет', planned: 50, done: 50, incident: 0},
      ]
    },
    {title: 'Задача 7', planned: 100, done: 100, incident: 0, parachuteSystems: []},
    {
      title: 'На спортивных мероприятиях: для выполнения разрядных норм по парашютному спорту',
      planned: 200,
      done: 200,
      incident: 0,
      parachuteSystems: [],
    },
  ],
  jumping_after_military_equipment: [
    {title: 'Десантирование вслед за БМД-4', parachuteSystems: 'Д-10', planned: 6, done: 6, incident: 0},
    {title: 'Десантирование вслед за БТР-Д', parachuteSystems: 'Д-10', planned: 6, done: 6, incident: 0},
  ],
  jumping_in_military_equipment: [
    {title: 'Десантирование в БМД-4', parachuteSystems: null, planned: 6, done: 6, incident: 0},
    {title: 'Десантирование в БТР-Д', parachuteSystems: null, planned: 6, done: 6, incident: 0},
  ],
  tech_jumping: [
    {title: 'Десантирование', parachuteSystems: null, planned: 6, done: 6, incident: 0},
    {title: 'ЛС десантируемый вслед за техникой', parachuteSystems: 'Д-10', planned: 6, done: 6, incident: 0},
    {title: 'Десантирование внутри боевой машины', parachuteSystems: null, planned: 6, done: 6, incident: 0},
  ],
  sport_events: [[
    {title: 'Соревнование1', prize_place: 1},
    {title: 'Соревнование2', prize_place: 2},
  ]],
  history: [
    {date: Date.now(), event: 'Чемпионат Европы по парашютному спорту', uuid: 'ecc4f508-f379-11eb-9a03-0242ac130003'},
    {date: Date.now(), event: 'Чемпионат Европы по парашютному спорту', uuid: 'ecc4f508-f379-11eb-9a03-0242ac130003'},
    {date: Date.now(), event: 'Чемпионат Европы по парашютному спорту', uuid: 'ecc4f508-f379-11eb-9a03-0242ac130003'},
    {date: Date.now(), event: 'Чемпионат Европы по парашютному спорту', uuid: 'ecc4f508-f379-11eb-9a03-0242ac130003'},
  ]
};
