import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'pkm-navbar',
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  // ? Revisar si esto esta correcto.

  scrollY = 0;

  ngOnInit() {
    window.addEventListener('scroll', this.handleScroll, true);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.handleScroll, true);
  }

  handleScroll = () => {
    this.scrollY = window.scrollY;
  };
}
