import {
  Component,
  effect,
  inject,
  linkedSignal,
  model,
  output,
} from '@angular/core';
import { PokemonService } from '@services/pokemon.service';
import { PokemonTeamSlotComponent } from './pokemon-team-slot/pokemon-team-slot.component';

@Component({
  selector: 'app-pokemon-team',
  imports: [PokemonTeamSlotComponent],
  templateUrl: './pokemon-team.component.html',
})
export class PokemonTeamComponent {
  pokemonService = inject(PokemonService);

  pokemonTeam = linkedSignal(() => this.pokemonService.pokemonTeam());

  teamActive = model(false);

  teamCount = output<number>();

  emmitCount = effect(() => {
    this.teamCount.emit(
      this.pokemonTeam().filter((slot) => slot !== undefined).length
    );
  });

  removePokemon(index: number) {
    this.pokemonService.removePokemonFromTeam(index);
    this.teamCount.emit(
      this.pokemonTeam().filter((slot) => slot !== undefined).length
    );
  }
}
