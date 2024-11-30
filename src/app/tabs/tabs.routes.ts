import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'random/:line',
        loadComponent: () =>
          import('../random/random.page').then((m) => m.RandomPage),
      },
      {
        path: '',
        redirectTo: '/tabs/random/Gold',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/random/Gold',
    pathMatch: 'full',
  },
];
