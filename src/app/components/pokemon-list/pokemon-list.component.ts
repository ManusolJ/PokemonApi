import { Component, inject, Signal, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { PokemonService } from 'src/app/services/Pokemon.service';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';

const LIMIT_OF_POKEMON_BY_PAGE = 20;

@Component({
  selector: 'pkm-pokemon-list',
  imports: [PokemonCardComponent],
  templateUrl: './pokemon-list.component.html',
})
export class PokemonListComponent {
  pokemonService = inject(PokemonService);
  private subscrption = new Subscription();

  currentPage = signal(1);

  pokemonList = signal<Pokemon[]>([]);

  ngOnInit() {
    const offset = this.getOffsetFromPage(this.currentPage());

    this.pokemonService
      .getAllPokemon(offset, LIMIT_OF_POKEMON_BY_PAGE)
      .subscribe((pokemonList) => {
        const sortedList = pokemonList.sort((a, b) => a.id - b.id);
        this.pokemonList.set(sortedList);
      });
  }

  ngOnDestroy() {
    this.subscrption.unsubscribe();
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
