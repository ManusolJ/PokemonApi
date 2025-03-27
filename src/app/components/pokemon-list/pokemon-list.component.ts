import { Component, inject, Signal, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { PokemonService } from 'src/app/services/Pokemon.service';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { PokemonSearchComponent } from './pokemon-search/pokemon-search.component';
import { LoadingAnimationComponent } from '@components/loading-animation/loading-animation.component';

const LIMIT_OF_POKEMON_BY_PAGE = 20;

@Component({
  selector: 'pkm-pokemon-list',
  imports: [
    PokemonCardComponent,
    PokemonSearchComponent,
    LoadingAnimationComponent,
  ],
  templateUrl: './pokemon-list.component.html',
})
export class PokemonListComponent {
  public pokemonService = inject(PokemonService);
  private subscriptions = new Subscription();

  currentPage = signal(1);

  pokemonList = signal<Pokemon[]>([]);

  loadingPokemonList = signal<boolean>(true);

  offset = this.getOffsetFromPage(this.currentPage());

  ngOnInit() {
    this.subscriptions.add(
      this.pokemonService
        .getAllPokemon(this.offset, LIMIT_OF_POKEMON_BY_PAGE)
        .subscribe((pokemonList) => {
          const sortedList = pokemonList.sort((a, b) => a.id - b.id);
          this.pokemonList.set(sortedList);
          this.loadingPokemonList.set(false);
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getPokemonByName(pokemonName: string) {
    this.loadingPokemonList.set(true);
    this.subscriptions.add(
      this.pokemonService
        .getPokemonByName(pokemonName, this.offset, LIMIT_OF_POKEMON_BY_PAGE)
        .subscribe((pokemon) => {
          this.pokemonList.set(pokemon);
          this.loadingPokemonList.set(false);
        })
    );
  }

  // ? Revisar si esto correcto cuando paginacion este finalizado.

  updatePageSignal(currentPage: Signal<number>): void {
    this.currentPage.update(currentPage);
  }

  getOffsetFromPage(pageIndex: number): number {
    return (pageIndex - 1) * LIMIT_OF_POKEMON_BY_PAGE;
  }

  //TODO: Paginacion
}
