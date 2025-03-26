import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('@pages/dashboard/dashboard.component'),
    children: [
      {
        path: 'pokedex',
        loadComponent: () =>
          import('@pages/pokedex-page/pokedex-page.component'),
      },
      {
        path: 'team',
        loadComponent: () => import('@pages/team-page/team-page.component'),
      },
      {
        path: '**',
        redirectTo: 'pokedex',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
