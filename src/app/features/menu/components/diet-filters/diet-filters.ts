import { Component, input, model } from '@angular/core';
import { DIET_TAG_LABELS } from '../../../../core/config/diet-tags';
import { DietTag } from '../../../../core/models/menu.model';

@Component({
  selector: 'app-diet-filters',
  templateUrl: './diet-filters.html',
  styleUrl: './diet-filters.css',
})
export class DietFilters {
  /** Etiquetas que existen en el menú (las únicas que tiene sentido ofrecer). */
  readonly tags = input.required<DietTag[]>();
  readonly selected = model<DietTag[]>([]);

  protected readonly labels = DIET_TAG_LABELS;

  protected isSelected(tag: DietTag): boolean {
    return this.selected().includes(tag);
  }

  protected toggle(tag: DietTag): void {
    const current = this.selected();
    this.selected.set(
      this.isSelected(tag) ? current.filter((selectedTag) => selectedTag !== tag) : [...current, tag],
    );
  }
}
