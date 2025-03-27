import { Component } from '@angular/core';
import { PokemonListComponent } from '../../components/pokemon-list/pokemon-list.component';

@Component({
  selector: 'pkm-pokedex-page',
  imports: [PokemonListComponent],
  templateUrl: './pokedex-page.component.html',
})
export default class PokedexPageComponent {}
