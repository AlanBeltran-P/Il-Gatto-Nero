import { Component, ElementRef, effect, input, output, viewChild } from '@angular/core';
import { Category } from '../../../../core/models/menu.model';

@Component({
  selector: 'app-category-nav',
  templateUrl: './category-nav.html',
  styleUrl: './category-nav.css',
})
export class CategoryNav {
  readonly categories = input.required<Category[]>();
  readonly activeId = input('');
  readonly categorySelected = output<string>();

  private readonly track = viewChild<ElementRef<HTMLElement>>('track');

  constructor() {
    effect(() => this.centerActiveLink(this.activeId()));
  }

  /** Desplaza la barra horizontal para que la categoría activa quede centrada. */
  private centerActiveLink(activeId: string): void {
    const track = this.track()?.nativeElement;
    const link = track?.querySelector<HTMLElement>(`[data-id="${activeId}"]`);
    if (!track || !link) {
      return;
    }

    const left = link.offsetLeft - (track.clientWidth - link.offsetWidth) / 2;
    track.scrollTo?.({ left, behavior: 'smooth' });
  }
}
