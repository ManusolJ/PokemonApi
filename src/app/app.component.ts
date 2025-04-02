import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { PokemonTeamComponent } from './components/pokemon-team/pokemon-team.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, PokemonTeamComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  activeDropdown = signal(false);
}
