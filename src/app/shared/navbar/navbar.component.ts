import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  activateTeamDropdown = output<boolean>();
  isTeamDroppedDown = signal(false);

  sendDropdownSignal() {
    if (this.isTeamDroppedDown()) {
      this.activateTeamDropdown.emit(false);
      this.isTeamDroppedDown.set(false);
    } else {
      this.activateTeamDropdown.emit(true);
      this.isTeamDroppedDown.set(true);
    }
  }
}
