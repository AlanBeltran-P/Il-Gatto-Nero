import { Component, computed, input, output } from '@angular/core';
import { Category, MenuItem as MenuItemData } from '../../../../core/models/menu.model';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { ArPricePipe } from '../../../../shared/pipes/ar-price.pipe';
import { MenuItem } from '../menu-item/menu-item';

const REVEAL_STEP_MS = 70;
const MAX_REVEAL_STEPS = 5;

@Component({
  selector: 'app-category-section',
  imports: [MenuItem, RevealDirective, ArPricePipe],
  templateUrl: './category-section.html',
  styleUrl: './category-section.css',
})
export class CategorySection {
  readonly category = input.required<Category>();
  readonly position = input.required<number>();
  readonly itemSelected = output<MenuItemData>();

  protected readonly positionLabel = computed(() => String(this.position()).padStart(2, '0'));
  protected readonly titleId = computed(() => `${this.category().id}-title`);

  /** Retardo escalonado para que los items aparezcan uno detrás de otro. */
  protected revealDelay(index: number): string {
    return `${Math.min(index, MAX_REVEAL_STEPS) * REVEAL_STEP_MS}ms`;
  }
}
