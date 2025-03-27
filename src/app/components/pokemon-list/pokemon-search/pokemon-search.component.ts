import { Component, output } from '@angular/core';

@Component({
  selector: 'pkm-pokemon-search',
  imports: [],
  templateUrl: './pokemon-search.component.html',
})
export class PokemonSearchComponent {
  pokemonQuery = output<string>();

  searchPokemonByName(pokemonName: string) {
    if (pokemonName) {
      this.pokemonQuery.emit(pokemonName);
    }
  }
}
