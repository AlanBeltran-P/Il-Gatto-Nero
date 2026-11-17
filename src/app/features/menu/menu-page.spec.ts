import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MenuData } from '../../core/models/menu.model';
import { MenuPage } from './menu-page';

const fakeMenu: MenuData = {
  local: { name: 'Il Gatto Nero', logo: '', city: '', instagram: '' },
  updatedAt: '2026-11-17',
  notes: ['Valor cubierto $3.500'],
  promotions: [{ id: 'efectivo', title: '15% off en efectivo', description: 'Abonando en efectivo.' }],
  allergyNotice: 'Aviso de alérgenos.',
  categories: [
    {
      id: 'antipasti',
      name: 'Antipasti',
      items: [
        { id: 'carpaccio', name: 'Carpaccio', prices: [{ amount: 32000 }] },
        { id: 'ensalada', name: 'Ensalada verde', prices: [{ amount: 24000 }], tags: ['vegetariano'] },
      ],
    },
    {
      id: 'pizze',
      name: 'Le Nostre Pizze',
      items: [
        {
          id: 'margherita',
          name: 'Margherita',
          prices: [{ amount: 40000 }],
          tags: ['vegetariano'],
          pairings: ['nebbiolo'],
        },
      ],
    },
    {
      id: 'tintos',
      name: 'Tintos',
      items: [{ id: 'nebbiolo', name: 'Nebbiolo', prices: [{ amount: 50000 }] }],
    },
  ],
};

function touchEvent(type: string, x: number, y: number): Event {
  const event = new Event(type);
  const touch = { clientX: x, clientY: y };
  Object.assign(event, { touches: [touch], changedTouches: [touch] });
  return event;
}

describe('MenuPage', () => {
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    httpTesting = TestBed.inject(HttpTestingController);
  });

  function createLoadedPage() {
    const fixture = TestBed.createComponent(MenuPage);
    fixture.detectChanges();
    httpTesting.expectOne('data/menu.json').flush(fakeMenu);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const refresh = () => fixture.detectChanges();
    return { fixture, element, refresh };
  }

  function visibleCategoryTitle(element: HTMLElement): string | undefined {
    return element.querySelector('app-category-section h2')?.textContent ?? undefined;
  }

  function search(element: HTMLElement, text: string): void {
    const input = element.querySelector<HTMLInputElement>('app-search-box input')!;
    input.value = text;
    input.dispatchEvent(new Event('input'));
  }

  it('muestra el header de inmediato, sin esperar al JSON', () => {
    const fixture = TestBed.createComponent(MenuPage);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('app-menu-header img')?.getAttribute('alt')).toBe('Il Gatto Nero');
    expect(element.querySelector('.menu-page__loading')).not.toBeNull();
    expect(element.querySelector('app-category-nav')).toBeNull();
  });

  it('muestra header, footer con la promo y solo la primera categoría al cargar', () => {
    const { element } = createLoadedPage();

    expect(element.querySelector('app-menu-header')).not.toBeNull();
    expect(element.querySelector('app-menu-footer')?.textContent).toContain('15% off en efectivo');
    expect(element.querySelectorAll('app-category-section').length).toBe(1);
    expect(visibleCategoryTitle(element)).toBe('Antipasti');
  });

  it('cambia de categoría al tocar una pestaña', () => {
    const { element, refresh } = createLoadedPage();

    element.querySelectorAll<HTMLButtonElement>('[role="tab"]')[1].click();
    refresh();

    expect(visibleCategoryTitle(element)).toBe('Le Nostre Pizze');
    expect(element.querySelector('.category__position')?.textContent).toBe('02');
  });

  it('pasa a la categoría siguiente al deslizar a la izquierda', () => {
    const { element, refresh } = createLoadedPage();
    const swipeArea = element.querySelector('.menu-page__swipe-area')!;

    swipeArea.dispatchEvent(touchEvent('touchstart', 300, 200));
    swipeArea.dispatchEvent(touchEvent('touchend', 100, 210));
    refresh();

    expect(visibleCategoryTitle(element)).toBe('Le Nostre Pizze');
    expect(element.querySelector('.menu-page__category--from-next')).not.toBeNull();
  });

  it('cambia de categoría con el botón "siguiente"', () => {
    const { element, refresh } = createLoadedPage();

    element.querySelector<HTMLButtonElement>('.pager__link--next')!.click();
    refresh();

    expect(visibleCategoryTitle(element)).toBe('Le Nostre Pizze');
  });

  it('busca en todo el menú y muestra los resultados', () => {
    const { element, refresh } = createLoadedPage();

    search(element, 'nebbiolo');
    refresh();

    expect(element.querySelector('app-category-section')).toBeNull();
    expect(element.querySelector('app-search-results')?.textContent).toContain('Tintos');
    expect(element.querySelectorAll('app-search-results app-menu-item').length).toBe(1);
  });

  it('cierra la búsqueda al tocar una pestaña', () => {
    const { element, refresh } = createLoadedPage();
    search(element, 'nebbiolo');
    refresh();

    element.querySelectorAll<HTMLButtonElement>('[role="tab"]')[0].click();
    refresh();

    expect(element.querySelector('app-search-results')).toBeNull();
    expect(visibleCategoryTitle(element)).toBe('Antipasti');
  });

  it('muestra los filtros de dieta y filtra los productos', () => {
    const { element, refresh } = createLoadedPage();
    const chips = element.querySelectorAll<HTMLButtonElement>('.filters__chip');
    expect([...chips].map((c) => c.textContent?.trim())).toEqual(['Vegetariano']);

    chips[0].click();
    refresh();

    const names = [...element.querySelectorAll('.item__name')].map((n) => n.textContent);
    expect(names).toEqual(['Ensalada verde']);
  });

  it('abre el modal al tocar un plato', () => {
    const { element, refresh } = createLoadedPage();
    expect(element.querySelector('app-product-modal')).toBeNull();

    element.querySelector<HTMLButtonElement>('.item')?.click();
    refresh();

    expect(element.querySelector('app-product-modal h2')?.textContent).toBe('Carpaccio');
    expect(element.querySelector('.modal__eyebrow')?.textContent).toBe('Antipasti');
  });

  it('muestra el maridaje y lo abre al tocarlo', () => {
    const { element, refresh } = createLoadedPage();
    element.querySelectorAll<HTMLButtonElement>('[role="tab"]')[1].click();
    refresh();
    element.querySelector<HTMLButtonElement>('.item')!.click();
    refresh();

    element.querySelector<HTMLButtonElement>('.pairings__item')!.click();
    refresh();

    expect(element.querySelector('app-product-modal h2')?.textContent).toBe('Nebbiolo');
    expect(element.querySelector('.modal__eyebrow')?.textContent).toBe('Tintos');
  });

  it('muestra un mensaje si falla la carga', () => {
    const fixture = TestBed.createComponent(MenuPage);
    fixture.detectChanges();
    httpTesting.expectOne('data/menu.json').flush('error', { status: 404, statusText: 'Not Found' });
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).querySelector('[role="alert"]')?.textContent).toContain(
      'No pudimos cargar el menú.',
    );
  });
});
