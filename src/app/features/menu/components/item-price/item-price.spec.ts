import { TestBed } from '@angular/core/testing';
import { MenuItem } from '../../../../core/models/menu.model';
import { ItemPrice } from './item-price';

describe('ItemPrice', () => {
  function renderText(item: MenuItem): string {
    const fixture = TestBed.createComponent(ItemPrice);
    fixture.componentRef.setInput('item', item);
    fixture.detectChanges();
    return ((fixture.nativeElement as HTMLElement).textContent ?? '').replace(/\s+/g, ' ').trim();
  }

  it('muestra el precio formateado', () => {
    expect(renderText({ id: 'x', name: 'Pizza', prices: [{ amount: 49000 }] })).toBe('$ 49.000');
  });

  it('muestra "Sin stock" si no está disponible', () => {
    expect(renderText({ id: 'x', name: 'Vino', prices: [], available: false })).toBe('Sin stock');
  });

  it('muestra "Consultar" si está disponible pero no tiene precio', () => {
    expect(renderText({ id: 'x', name: 'Vino', prices: [] })).toBe('Consultar');
  });
});
