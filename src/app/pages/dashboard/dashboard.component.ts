import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'pkm-dashboard',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './dashboard.component.html',
})
export default class DashboardComponent {}
