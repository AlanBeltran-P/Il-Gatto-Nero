import { TestBed } from '@angular/core/testing';
import { MenuItem as MenuItemData } from '../../../../core/models/menu.model';
import { MenuItem } from './menu-item';

describe('MenuItem', () => {
  function render(item: MenuItemData) {
    const fixture = TestBed.createComponent(MenuItem);
    fixture.componentRef.setInput('item', item);
    fixture.detectChanges();
    return fixture;
  }

  const carpaccio: MenuItemData = {
    id: 'carpaccio',
    name: 'Carpaccio de estación',
    description: 'Stracciatella, jamón crudo.',
    prices: [{ amount: 32000 }],
  };

  it('muestra nombre, descripción, precio y miniatura', () => {
    const element = render(carpaccio).nativeElement as HTMLElement;

    expect(element.querySelector('.item__name')?.textContent).toBe('Carpaccio de estación');
    expect(element.textContent).toContain('Stracciatella, jamón crudo.');
    expect(element.querySelector('app-item-price')?.textContent?.replace(/\s/g, ' ')).toContain(
      '$ 32.000',
    );
    expect(element.querySelector('app-product-image')).not.toBeNull();
  });

  it('muestra el badge de premio', () => {
    const element = render({ ...carpaccio, badge: '1º Premio' }).nativeElement as HTMLElement;
    expect(element.querySelector('.item__badge')?.textContent).toBe('1º Premio');
  });

  it('muestra las etiquetas de dieta', () => {
    const element = render({ ...carpaccio, tags: ['sin-tacc'] }).nativeElement as HTMLElement;
    expect(element.querySelector('app-diet-badges')?.textContent).toContain('Sin TACC');
  });

  it('une las variantes con un separador', () => {
    const element = render({ ...carpaccio, variants: ['Heineken', 'Blue Moon'] })
      .nativeElement as HTMLElement;
    expect(element.querySelector('.item__variants')?.textContent).toBe('Heineken · Blue Moon');
  });

  it('marca los items no disponibles', () => {
    const element = render({ ...carpaccio, prices: [], available: false })
      .nativeElement as HTMLElement;
    expect(element.querySelector('.item--unavailable')).not.toBeNull();
  });

  it('emite el item al hacer click', () => {
    const fixture = render(carpaccio);
    let selected: MenuItemData | undefined;
    fixture.componentInstance.selected.subscribe((item) => (selected = item));

    (fixture.nativeElement as HTMLElement).querySelector('button')?.click();

    expect(selected).toEqual(carpaccio);
  });
});
