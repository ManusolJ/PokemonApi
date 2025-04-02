import { Routes } from '@angular/router';
import { PokedexPageComponent } from '@pages/pokedex-page/pokedex-page.component';

export const routes: Routes = [
  {
    path: 'pokedex',
    component: PokedexPageComponent,
  },
  {
    path: '**',
    redirectTo: 'pokedex',
  },
];
