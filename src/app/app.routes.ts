import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'dialog',
    loadComponent: () => import('./dialog/dialog.page').then( m => m.DialogPage)
  },
];
