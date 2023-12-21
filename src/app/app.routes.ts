import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'home/:code',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },

  {
    path: 'view-01',
    loadComponent: () =>
      import('./pages/view-01/view-01.component').then(
        (m) => m.View01Component
      ),
  },
  {
    path: 'view-02',
    loadComponent: () =>
      import('./pages/view-02/view-02.component').then(
        (m) => m.View02Component
      ),
  },
  {
    path: 'view-03',
    loadComponent: () =>
      import('./pages/view-03/view-03.component').then(
        (m) => m.View03Component
      ),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
