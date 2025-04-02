import { Component, effect, input, output } from '@angular/core';

@Component({
  selector: 'app-pokemon-search',
  imports: [],
  templateUrl: './pokemon-search.component.html',
})
export class PokemonSearchComponent {
  searchText = output<string>();
}
