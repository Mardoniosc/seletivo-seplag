import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'desaparecido',
    loadChildren: () => import('./modules/desaparecidos/desaparecido.routes'),
  },
  { path: '', redirectTo: '/desaparecido', pathMatch: 'full' },
];
