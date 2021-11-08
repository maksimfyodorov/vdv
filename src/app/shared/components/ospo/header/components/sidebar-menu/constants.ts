import { Link } from './interfaces';

export const OSPOS: Link[] = [
  {
    title: 'Укомплектованность личным составом',
    routerLink: 'staffing',
    icon: 'pi-users',
  },
  {
    title: 'Обеспеченность ВВСТ',
    routerLink: 'security',
    icon: 'pi-bell',
  },
  {
    title: 'Документы',
    modal: 'openDocuments',
    icon: 'pi-folder',
  },
  {
    title: 'Уведомления',
    routerLink: 'notifications',
    icon: 'pi-bell',
  },
  {
    title: 'Журнал действий',
    routerLink: '',
    icon: 'pi-list',
  },
  {
    title: 'Настройка',
    routerLink: 'settings',
    icon: 'pi-cog',
  },
];

export const PAGES: Link[] = [
  {
    title: 'Главная',
    routerLink: '',
  }
]
