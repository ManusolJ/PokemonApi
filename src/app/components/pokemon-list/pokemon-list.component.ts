import { Component, input, output } from '@angular/core';
import { PokemonCardComponent } from '@components/pokemon-card/pokemon-card.component';
import { Pokemon } from '@interfaces/pokemon.interface';
import { LoadingAnimationComponent } from '@sharedComp/loading-animation/loading-animation.component';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonCardComponent, LoadingAnimationComponent],
  templateUrl: './pokemon-list.component.html',
})
export class PokemonListComponent {
  pokemon = input.required<Pokemon[]>();
  errorMessage = input<string | unknown | null>();
  isLoading = input<boolean>();
  isEmpty = input<boolean>(false);

  sendPokemonToTeam = output<Pokemon>();
}
