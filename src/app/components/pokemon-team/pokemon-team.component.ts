import { Component, input } from '@angular/core';
import { Pokemon } from '@interfaces/pokemon.interface';

@Component({
  selector: 'app-pokemon-team',
  imports: [],
  templateUrl: './pokemon-team.component.html',
})
export class PokemonTeamComponent {
  pokemonTeam = [{}, {}, {}, {}, {}, {}];

  teamActive = input();
}
