import { NgClass } from '@angular/common';
import {
  Component,
  ElementRef,
  input,
  viewChild,
  ViewChild,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'pkm-navbar',
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  isAwayFromTop = input<boolean>(false);

  //TODO...
  toggleTeamDropdown() {}
}
