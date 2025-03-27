import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'pkm-dashboard',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './dashboard.component.html',
})
export default class DashboardComponent {
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');
  IsScrolledFromTop = signal<boolean>(false);

  onScroll() {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) {
      return;
    }
    const scrollTop = scrollDiv.scrollTop;
    console.log(scrollTop);

    scrollTop > 0
      ? this.IsScrolledFromTop.set(true)
      : this.IsScrolledFromTop.set(false);

    console.log(this.IsScrolledFromTop());
  }
}
