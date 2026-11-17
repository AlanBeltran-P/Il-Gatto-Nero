import { DestroyRef, Directive, ElementRef, afterNextRender, inject, signal } from '@angular/core';

/**
 * Agrega la clase "is-visible" cuando el elemento entra en pantalla.
 * La animación en sí está definida en src/styles/animations.css (.reveal).
 */
@Directive({
  selector: '[appReveal]',
  host: {
    class: 'reveal',
    '[class.is-visible]': 'isVisible()',
  },
})
export class RevealDirective {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;

  protected readonly isVisible = signal(false);

  constructor() {
    afterNextRender(() => this.observe());
    inject(DestroyRef).onDestroy(() => this.observer?.disconnect());
  }

  private observe(): void {
    if (typeof IntersectionObserver === 'undefined') {
      this.isVisible.set(true);
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.isVisible.set(true);
          this.observer?.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    this.observer.observe(this.element.nativeElement);
  }
}
