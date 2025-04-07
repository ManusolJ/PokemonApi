import { Component, effect, inject, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { PokemonService } from '@services/pokemon.service';
import { PokemonListComponent } from '@components/pokemon-list/pokemon-list.component';
import { PokemonSearchComponent } from '@components/pokemon-search/pokemon-search.component';
import { PaginationComponent } from '@sharedComp/pagination/pagination.component';
import { PaginationService } from '@sharedComp/pagination/pagination.service';
import { Pokemon } from '@interfaces/pokemon.interface';

const LIMIT_PER_PAGE = 18;
const UNLIMITED_POKEMON = 2000;

@Component({
  selector: 'app-pokedex-page',
  imports: [PokemonListComponent, PokemonSearchComponent, PaginationComponent],
  templateUrl: './pokedex-page.component.html',
})
export class PokedexPageComponent {
  pokemonService = inject(PokemonService);
  paginationService = inject(PaginationService);

  query = signal<string>('');

  paginationReset = signal<boolean>(false);

  pokemonResource = rxResource({
    request: () => ({
      page: this.paginationService.currentPage() - 1,
      query: this.query(),
    }),
    loader: ({ request }) => {
      return request.query.length !== 0
        ? this.pokemonService.getPokemonByName(
            UNLIMITED_POKEMON,
            request.page * LIMIT_PER_PAGE,
            request.query
          )
        : this.pokemonService.getAllPokemon(
            LIMIT_PER_PAGE,
            request.page * LIMIT_PER_PAGE
          );
    },
  });

  totalPages = linkedSignal(() =>
    Math.ceil(this.pokemonService.pokemonCount() / LIMIT_PER_PAGE)
  );

  onSearch(query: String) {
    this.query.set(query.toLowerCase());
    this.paginationReset.set(true);
  }

  setReset = effect(() => {
    const page = this.paginationService.currentPage();
    this.paginationReset.set(false);
  });

  addPokemonToTeam(pokemon: Pokemon) {
    this.pokemonService.addPokemonToTeam(pokemon);
  }
}
