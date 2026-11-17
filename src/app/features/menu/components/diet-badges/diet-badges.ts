import { Component, computed, input } from '@angular/core';
import { DIET_TAG_LABELS, DIET_TAG_ORDER } from '../../../../core/config/diet-tags';
import { DietTag } from '../../../../core/models/menu.model';

@Component({
  selector: 'app-diet-badges',
  templateUrl: './diet-badges.html',
  styleUrl: './diet-badges.css',
})
export class DietBadges {
  readonly tags = input<DietTag[]>([]);

  /** Siempre en el mismo orden, sin importar cómo vengan en el JSON. */
  protected readonly labels = computed(() =>
    DIET_TAG_ORDER.filter((tag) => this.tags().includes(tag)).map((tag) => DIET_TAG_LABELS[tag]),
  );
}
