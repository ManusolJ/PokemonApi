import { NgClass } from '@angular/common';
import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'pkm-team-dropdown',
  imports: [NgClass],
  templateUrl: './team-dropdown.component.html',
})
export class TeamDropdownComponent {
  displayDropdown = output<boolean>();
  isDisplayed = signal<boolean>(false);

  displayPokemonTeam() {
    if (this.isDisplayed()) {
      this.displayDropdown.emit(false);
      this.isDisplayed.set(false);
    } else {
      this.displayDropdown.emit(true);
      this.isDisplayed.set(true);
      console.log(this.isDisplayed());
    }
  }
}
