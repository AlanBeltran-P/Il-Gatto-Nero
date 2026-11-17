import { TestBed } from '@angular/core/testing';
import { MenuItem } from '../../../../core/models/menu.model';
import { CLOSE_ANIMATION_MS, ProductModal } from './product-modal';

const cerveza: MenuItem = {
  id: 'cerveza-italiana',
  name: 'Cerveza italiana 330 ml',
  description: 'Bien fría.',
  badge: 'Importada',
  variants: ['Peroni Nastro Azzurro', 'Menabrea Bionda Lager'],
  prices: [{ amount: 12000 }],
};

describe('ProductModal', () => {
  function render(item: MenuItem = cerveza) {
    const fixture = TestBed.createComponent(ProductModal);
    fixture.componentRef.setInput('item', item);
    fixture.componentRef.setInput('categoryName', 'Cervezas');
    fixture.detectChanges();
    return fixture;
  }

  afterEach(() => vi.useRealTimers());

  it('muestra todas las especificaciones del plato', () => {
    const element = render().nativeElement as HTMLElement;

    expect(element.querySelector('.modal__eyebrow')?.textContent).toBe('Cervezas');
    expect(element.querySelector('h2')?.textContent).toBe('Cerveza italiana 330 ml');
    expect(element.querySelector('.modal__badge')?.textContent).toBe('Importada');
    expect(element.querySelector('.modal__description')?.textContent).toBe('Bien fría.');
    expect(element.querySelectorAll('.modal__variants li').length).toBe(2);
    expect(element.querySelector('app-item-price')?.textContent?.replace(/\s/g, ' ')).toContain(
      '$ 12.000',
    );
  });

  it('activa la entrada recién después de dos frames', async () => {
    const fixture = render();
    await fixture.whenStable();
    const dialog = (fixture.nativeElement as HTMLElement).querySelector('dialog');
    expect(dialog?.classList).not.toContain('is-entered');

    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    await new Promise((resolve) => requestAnimationFrame(resolve));
    fixture.detectChanges();

    expect(dialog?.classList).toContain('is-entered');
  });

  it('muestra los maridajes y emite el elegido', () => {
    const fixture = TestBed.createComponent(ProductModal);
    fixture.componentRef.setInput('item', cerveza);
    fixture.componentRef.setInput('pairings', [
      { item: { id: 'margherita', name: 'Margherita', prices: [] }, categoryName: 'Le Nostre Pizze' },
    ]);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    let selectedId = '';
    fixture.componentInstance.pairingSelected.subscribe((entry) => (selectedId = entry.item.id));

    expect(element.querySelector('app-pairing-list')?.textContent).toContain('Margherita');
    element.querySelector<HTMLButtonElement>('.pairings__item')!.click();

    expect(selectedId).toBe('margherita');
  });

  it('no muestra la sección de maridajes si no hay', () => {
    const element = render().nativeElement as HTMLElement;
    expect(element.querySelector('app-pairing-list')).toBeNull();
  });

  it('muestra las etiquetas de dieta', () => {
    const element = render({ ...cerveza, tags: ['vegano'] }).nativeElement as HTMLElement;
    expect(element.querySelector('app-diet-badges')?.textContent).toContain('Vegano');
  });

  it('muestra la imagen grande del plato', () => {
    const element = render().nativeElement as HTMLElement;
    expect(element.querySelector('app-product-image.product-image--large')).not.toBeNull();
  });

  it('emite closed después de la animación al tocar cerrar', () => {
    vi.useFakeTimers();
    const fixture = render();
    let closed = false;
    fixture.componentInstance.closed.subscribe(() => (closed = true));

    (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('.modal__close')?.click();
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).querySelector('.is-closing')).not.toBeNull();
    expect(closed).toBe(false);

    vi.advanceTimersByTime(CLOSE_ANIMATION_MS);
    expect(closed).toBe(true);
  });

  it('se cierra al hacer click en el fondo', () => {
    vi.useFakeTimers();
    const fixture = render();
    let closed = false;
    fixture.componentInstance.closed.subscribe(() => (closed = true));

    (fixture.nativeElement as HTMLElement).querySelector('dialog')?.click();
    vi.advanceTimersByTime(CLOSE_ANIMATION_MS);

    expect(closed).toBe(true);
  });

  it('no se cierra al hacer click dentro del panel', () => {
    vi.useFakeTimers();
    const fixture = render();
    let closed = false;
    fixture.componentInstance.closed.subscribe(() => (closed = true));

    (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('.modal__title')?.click();
    vi.advanceTimersByTime(CLOSE_ANIMATION_MS);

    expect(closed).toBe(false);
  });
});
