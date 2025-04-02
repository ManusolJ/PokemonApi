import { Component, effect, inject, input, model, signal } from '@angular/core';

import { Pokemon } from '@interfaces/pokemon.interface';
import { PokemonService } from '@services/pokemon.service';

@Component({
  selector: 'app-pokemon-team',
  standalone: true,
  templateUrl: './pokemon-team.component.html',
})
export class PokemonTeamComponent {
  pokemonService = inject(PokemonService);

  pokemonTeam = signal<(Pokemon | undefined)[]>(
    this.pokemonService.getTeamFromLocalStorage() || [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ]
  );

  teamActive = input();
  pokemonToAdd = model<Pokemon>();

  constructor() {
    effect(() => {
      const newPokemon = this.pokemonToAdd();
      if (newPokemon) {
        const currentTeam = this.pokemonTeam().slice();
        const firstEmptyIndex = currentTeam.findIndex(
          (slot) => slot === undefined
        );

        if (firstEmptyIndex !== -1) {
          currentTeam[firstEmptyIndex] = newPokemon;
          this.pokemonTeam.set(currentTeam);
          this.pokemonToAdd.update(() => undefined);
          this.pokemonService.saveTeamToLocalStorage(currentTeam);
        }
      }
    });
  }
}
