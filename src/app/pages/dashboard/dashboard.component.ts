import { Component, signal } from '@angular/core';
import { NavbarComponent } from '@sharedComp/navbar/navbar.component';
import { PokemonTeamComponent } from '@components/pokemon-team/pokemon-team.component';
import { PokedexPageComponent } from '@pages/pokedex-page/pokedex-page.component';

@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent, PokemonTeamComponent, PokedexPageComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  activeDropdown = signal(false);
  pokemonTeamCount = signal<number>(0);

  setPokemonTeam(pokemonNumberCount: number) {
    this.pokemonTeamCount.set(pokemonNumberCount);
  }
}
