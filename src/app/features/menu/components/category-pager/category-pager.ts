import { Component, input, output } from '@angular/core';
import { Category } from '../../../../core/models/menu.model';

/** Botones "anterior / siguiente" al final de cada categoría. */
@Component({
  selector: 'app-category-pager',
  templateUrl: './category-pager.html',
  styleUrl: './category-pager.css',
})
export class CategoryPager {
  readonly previous = input<Category | undefined>();
  readonly next = input<Category | undefined>();
  readonly previousSelected = output<void>();
  readonly nextSelected = output<void>();
}
