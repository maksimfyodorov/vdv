import { environment } from '../environments/environment';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreloadAllModules } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/task',
    pathMatch: 'full',
  },
  {
    path: 'plan',
    loadChildren: () =>
      import('./8.1/8.1.5_check-combat-readiness/check-combat-readiness.module')
        .then((m) => m.CheckCombatReadinessModule),
    data: {
      title: 'План проверки боевой готовности',
    },
  },
  {
    path: 'communication-nodes',
    loadChildren: () =>
      import('./8.1/8.1.6_communication-nodes/communication-nodes.module').then((m) => m.CommunicationNodesModule),
    data: {
      title: 'Узлы связи',
    },
  },
  {
    path: 'bpla',
    loadChildren: () =>
      import('./8.1/8.1.4_uav-information/uav-information.module').then((m) => m.UavInformationModule),
    data: {
      title: 'Информация БПЛА',
    },
  },
  {
    path: 'io',
    loadChildren: () => import('./click-makets/io/io.module').then((m) => m.IoModule),
    data: {
      title: ' ',
    },
  },
  {
    path: 'monitoring',
    loadChildren: () =>
      import('./8.2/8.2.2_video-monitoring/video-monitoring.module').then((m) => m.VideoMonitoringModule),
    data: {
      title: ' ',
    },
  },
  {
    path: 'desant-monitoring',
    loadChildren: () =>
      import('./8.2/8.2.4_desant-monitoring/desant-monitoring.module').then((m) => m.DesantMonitoringModule),
    data: {
      title: 'Мониторинг плана десантирования',
    },
  },
  {
    path: 'ia-monitoring',
    loadChildren: () => import('./8.2/8.2.29_actualization/actualization.module').then((m) => m.ActualizationModule),
    data: {
      title: ' ',
    },
  },
  {
    path: 'information-formation',
    loadChildren: () =>
      import('./click-makets/information-formation/information-formation.module').then(
        (m) => m.InformationFormationModule
      ),
    data: {
      title: ' ',
    },
  },
  {
    path: 'commander-order',
    loadChildren: () =>
      import('./8.2/8.2.30_commander-orders/commander-orders.module').then((m) => m.CommanderOrdersModule),
    data: {
      title: 'Поручения командующего',
    },
  },
  {
    path: 'status-monitoring-of-control-points',
    loadChildren: () => import('./8.1/8.1.9_status-monitoring-of-control-points/status-monitoring-of-control-points.module')
      .then((m) => m.StatusMonitoringOfControlPointsModule),
    data: {
      title: ' ',
    },
  },
  {
    path: 'monitoring-of-transfer-to-ws-bg',
    loadChildren: () =>
      import('./8.1/8.1.3_transfer-monitoring/transfer-monitoring.module').then(
        (m) => m.TransferMonitoringModule
      ),
    data: {
      title: ' ',
    },
  },
  {
    path: 'countering-terrorism',
    loadChildren: () =>
      import(
        './8.2/8.2.2_countering-terrorism/countering-terrorism.module'
      ).then((m) => m.CounteringTerrorismModule),
    data: {
      title: ' ',
    },
  },
  {
    path: 'task',
    loadChildren: () => import('./common-pages/task/task.module').then((m) => m.TaskModule),
    data: {
      title: 'Задачи',
    },
  },
  {
    path: 'examples',
    loadChildren: () => import('./common-pages/examples/examples.module').then((m) => m.ExamplesModule),
    data: {
      title: ' ',
    },
  },
  {
    path: 'settings',
    loadChildren: () => import('./common-pages/settings/settings.module').then((m) => m.SettingsModule),
    data: {
      title: 'Настройки',
    },
  },
  {
    path: 'notifications',
    loadChildren: () => import('./common-pages/notifications/notifications.module').then((m) => m.NotificationsModule),
    data: {
      title: 'Журнал уведомлений'
    }
  },
  {
    path: '**',
    loadChildren: () => import('./common-pages/not-found/not-found.module').then((m) => m.NotFoundModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, environment.production ? { preloadingStrategy: PreloadAllModules } : undefined),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
