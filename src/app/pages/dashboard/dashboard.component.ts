import { Component, signal } from '@angular/core';
import { NavbarComponent } from '@sharedComp/navbar/navbar.component';
import { PokemonTeamComponent } from '@components/pokemon-team/pokemon-team.component';
import { PokedexPageComponent } from '@pages/pokedex-page/pokedex-page.component';
import { Pokemon } from '@interfaces/pokemon.interface';

@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent, PokemonTeamComponent, PokedexPageComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  activeDropdown = signal(false);
  pokemon = signal<Pokemon | undefined>(undefined);

  addPokemonToTeam(pokemon: Pokemon) {
    this.pokemon.set(pokemon);
  }
}
