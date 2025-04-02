import { Component, input } from '@angular/core';
import { PokemonCardComponent } from '@components/pokemon-card/pokemon-card.component';
import { Pokemon } from '@interfaces/pokemon.interface';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonCardComponent],
  templateUrl: './pokemon-list.component.html',
})
export class PokemonListComponent {
  pokemon = input.required<Pokemon[]>();
  errorMessage = input<string | unknown | null>();
  isLoading = input<boolean>();
  isEmpty = input<boolean>(false);
}
