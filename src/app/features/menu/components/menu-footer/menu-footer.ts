import { Component, computed, input } from '@angular/core';
import { Promotion } from '../../../../core/models/menu.model';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { formatLongDate } from '../../../../shared/utils/date';

@Component({
  selector: 'app-menu-footer',
  imports: [RevealDirective],
  templateUrl: './menu-footer.html',
  styleUrl: './menu-footer.css',
})
export class MenuFooter {
  readonly name = input.required<string>();
  readonly promotions = input<Promotion[]>([]);
  readonly notes = input<string[]>([]);
  readonly allergyNotice = input('');
  readonly updatedAt = input('');

  protected readonly updatedLabel = computed(() => formatLongDate(this.updatedAt()));
  protected readonly currentYear = new Date().getFullYear();
}
