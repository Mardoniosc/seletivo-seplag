import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./modules/desaparecidos/desaparecido.routes'),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
