import { Tabs } from '../types/task.type';

export const combatCommandTabs: Tabs[] = [{
  header: 'Задачи боевого управления',
  index: 0,
  tasks: [
    {
      title: 'Состояние плана проверок',
      description: 'Мониторинг выполнения плана проверок боевой готовности соединений и воинских частей воздушно-десантных войск',
      routerLink: 'plan',
    },

    {
      title: 'Представление разведывательной информации от БпЛА',
      description: 'Представление разведывательной информации, собираемой подразделениями ВДВ, оснащенными комплексами с БпЛА',
      routerLink: 'bpla',
    },
    {
      title: 'Формирование информации о текущем состоянии АСУ, средств связи ПУ их готовность к обеспечению управления войсками (силами)',
      description: 'Формирование информации от внутренних и внешних источников о текущем состоянии АСУ, систем связи ПУ их готовность к обеспечению непрерывного управления войсками и вывод информации',
      routerLink: 'communication-nodes',
    },
    {
      title: 'Мониторинг выполнения мероприятий при переводе ВДВ в всБГ',
      description: 'Мониторинг выполнения мероприятий при переводе Воздушно-десантных войск в высшие степени боевой готовности',
      routerLink: 'monitoring-of-transfer-to-ws-bg',
    },
    {
      title: 'Мониторинг состояния ЦУ (ПУ)',
      description: 'Мониторинг состояния центра (пункта) управления (анализ укомплектованности ЛС центра (пункта) управления и допуска к оперативному дежурству',
      routerLink: 'status-monitoring-of-control-points',
    },


    {
      title: 'Моделирование обстановки',
      description: 'Информационное обеспечение и выработки предложений руководству',
      routerLink: '',
    },
    {
      title: 'ЦОРУИБ',
      description: 'Информационно-аналитическое обеспечение деятельности должностных лиц ЦОРУИБ',
      routerLink: '',
    },
    {
      title: 'Моб. подготовка',
      description: 'Информационно-аналитическое обеспечение деятельности должностных лиц направления мобилизационной подготовки',
      routerLink: '',
    },
    {
      title: 'Кадровое обеспечение',
      description: 'Контроль комплектования ВС РФ, кадрового обеспечения и военного образования',
      routerLink: '',
    },
  ],
},
];
