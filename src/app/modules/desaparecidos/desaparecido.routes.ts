import { Routes } from '@angular/router';
import { DetalhesComponent } from './container/detalhes/detalhes.component';
import { ListDesaparecidosComponent } from './container/list-desaparecido/list-desaparecido.component';

export default [
  { path: '', component: ListDesaparecidosComponent },
  // { path: 'novo', component: formDesaparecidosComponent },
  { path: ':id', component: DetalhesComponent },
] as Routes;
