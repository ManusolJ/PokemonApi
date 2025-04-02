import {
  Component,
  computed,
  effect,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  imports: [RouterLink],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  pages = input(0);
  onSearch = input(false);
  currentPage = input<number>(1);
  activePage = linkedSignal(() => this.currentPage());

  getPagesList = computed(() => {
    const total = this.pages();
    const current = this.activePage();
    const delta = 2;
    const range: number[] = [];

    range.push(1);
    const start = Math.max(2, current - delta);
    const end = Math.min(total - 1, current + delta);

    if (start > 2) range.push(-1);
    for (let i = start; i <= end; i++) range.push(i);
    if (end < total - 1) range.push(-2);
    if (total > 1) range.push(total);

    return range;
  });

  cringe2 = effect(() => {
    if (this.onSearch()) {
      this.activePage.set(1);
      this.router.navigate([], { queryParams: { page: 1 } });
    }
  });
}
