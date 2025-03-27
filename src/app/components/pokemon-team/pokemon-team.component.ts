import { Component, signal } from '@angular/core';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { TeamDropdownComponent } from './team-dropdown/team-dropdown.component';
import { PokemonCardComponent } from '@components/pokemon-list/pokemon-card/pokemon-card.component';

@Component({
  selector: 'pkm-pokemon-team',
  imports: [TeamDropdownComponent, PokemonCardComponent],
  templateUrl: './pokemon-team.component.html',
})
export class PokemonTeamComponent {
  pokemonTeam = signal<Pokemon[]>([]);

  addPokemonToTeam() {}

  showTeam(show: boolean) {}
}
